// Audio Engine for Gemini TTS (gemini-3.1-flash-tts-preview) & Web Audio API

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTitle: string;
  progress: number;
  currentTime: number;
  duration: number;
}

class AudioCoachEngine {
  private ctx: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private cache = new Map<string, AudioBuffer>();
  private isPaused = false;
  private startTime = 0;
  private pauseOffset = 0;
  private currentBuffer: AudioBuffer | null = null;
  private currentSpeed = 1.0;
  private currentVoice = 'Fenrir';
  private currentTitle = '';
  private onEndedCallback: (() => void) | null = null;
  private onProgressCallback: ((progress: number, currentTime: number, duration: number) => void) | null = null;
  private progressInterval: number | null = null;
  private subscribers = new Set<(state: AudioPlayerState) => void>();

  public getState(): AudioPlayerState {
    const duration = this.currentBuffer ? this.currentBuffer.duration : 0;
    const elapsed = this.currentBuffer && this.ctx && !this.isPaused
      ? Math.min((this.ctx.currentTime - this.startTime) * this.currentSpeed, duration)
      : this.pauseOffset;

    return {
      isPlaying: Boolean(this.currentSource) && !this.isPaused,
      currentTitle: this.currentTitle,
      progress: duration > 0 ? Math.min(1, Math.max(0, elapsed / duration)) : 0,
      currentTime: elapsed,
      duration,
    };
  }

  public subscribeState(callback: (state: AudioPlayerState) => void): () => void {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifyState() {
    const st = this.getState();
    this.subscribers.forEach((cb) => cb(st));
  }

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass({ sampleRate: 24000 });
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public setSpeed(speed: number) {
    this.currentSpeed = Math.max(0.5, Math.min(2.0, speed));
    if (this.currentSource) {
      this.currentSource.playbackRate.value = this.currentSpeed;
    }
    this.notifyState();
  }

  public setVoice(voice: string) {
    this.currentVoice = voice;
  }

  public async fetchTTSAudio(text: string, voice = this.currentVoice): Promise<AudioBuffer | null> {
    const cleanText = text.replace(/[*_#~]/g, " ").trim();
    const cacheKey = `${voice}:::${cleanText}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice,
        }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.fallbackToClient || !data.audio) {
        return null;
      }

      const ctx = this.getAudioContext();
      const binary = atob(data.audio);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      let buffer: AudioBuffer;
      const isWav =
        bytes.length > 4 &&
        String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === 'RIFF';

      if (isWav) {
        try {
          buffer = await ctx.decodeAudioData(bytes.buffer.slice(0));
        } catch (e) {
          buffer = this.decodeRawPcm(bytes, ctx, data.sampleRate || 24000);
        }
      } else {
        buffer = this.decodeRawPcm(bytes, ctx, data.sampleRate || 24000);
      }

      this.cache.set(cacheKey, buffer);
      return buffer;
    } catch {
      return null;
    }
  }

  private decodeRawPcm(bytes: Uint8Array, ctx: AudioContext, sampleRate = 24000): AudioBuffer {
    const numSamples = Math.floor(bytes.byteLength / 2);
    const int16Array = new Int16Array(bytes.buffer, bytes.byteOffset, numSamples);
    const buffer = ctx.createBuffer(1, numSamples, sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < numSamples; i++) {
      channel[i] = int16Array[i] / 32768.0;
    }
    return buffer;
  }

  public async playTextWithGemini(
    text: string,
    title = 'توجيه الكوتش',
    voice = this.currentVoice,
    speed = this.currentSpeed
  ) {
    this.currentTitle = title;
    this.currentSpeed = speed;
    this.notifyState();

    await this.playText(text, voice);
  }

  public async playText(
    text: string,
    voice = this.currentVoice,
    onProgress?: (progress: number, currentTime: number, duration: number) => void,
    onEnded?: () => void
  ) {
    this.stop();
    this.onProgressCallback = onProgress || null;
    this.onEndedCallback = onEnded || null;

    try {
      const buffer = await this.fetchTTSAudio(text, voice);
      if (buffer) {
        this.playBuffer(buffer);
        return;
      }
      this.playClientSpeechFallback(text, onEnded);
    } catch {
      this.playClientSpeechFallback(text, onEnded);
    }
  }

  private playBuffer(buffer: AudioBuffer, offset = 0) {
    const ctx = this.getAudioContext();
    this.currentBuffer = buffer;
    this.pauseOffset = offset;
    this.startTime = ctx.currentTime - offset / this.currentSpeed;
    this.isPaused = false;

    this.currentSource = ctx.createBufferSource();
    this.currentSource.buffer = buffer;
    this.currentSource.playbackRate.value = this.currentSpeed;

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = 1.0;

    this.currentSource.connect(this.analyser);
    this.analyser.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);

    this.currentSource.start(0, offset);

    this.currentSource.onended = () => {
      if (!this.isPaused) {
        this.clearProgressTimer();
        if (this.onProgressCallback && buffer) {
          this.onProgressCallback(1, buffer.duration, buffer.duration);
        }
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
        this.notifyState();
      }
    };

    this.startProgressTimer();
    this.notifyState();
  }

  private startProgressTimer() {
    this.clearProgressTimer();
    this.progressInterval = window.setInterval(() => {
      if (!this.ctx || !this.currentBuffer || this.isPaused) return;
      const elapsed = (this.ctx.currentTime - this.startTime) * this.currentSpeed;
      const duration = this.currentBuffer.duration;
      const progress = Math.min(1, Math.max(0, elapsed / duration));
      if (this.onProgressCallback) {
        this.onProgressCallback(progress, Math.min(elapsed, duration), duration);
      }
      this.notifyState();
    }, 80);
  }

  private clearProgressTimer() {
    if (this.progressInterval !== null) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  public pause() {
    if (this.currentSource && this.ctx && !this.isPaused) {
      this.isPaused = true;
      this.pauseOffset = (this.ctx.currentTime - this.startTime) * this.currentSpeed;
      this.currentSource.stop();
      this.currentSource.disconnect();
      this.currentSource = null;
      this.clearProgressTimer();
      this.notifyState();
    }
  }

  public resume() {
    if (this.isPaused && this.currentBuffer) {
      this.playBuffer(this.currentBuffer, this.pauseOffset);
    }
  }

  public stop() {
    this.isPaused = false;
    this.pauseOffset = 0;
    this.clearProgressTimer();
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (e) {}
      this.currentSource = null;
    }
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    this.notifyState();
  }

  public seek(progress: number) {
    if (!this.currentBuffer) return;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetOffset = clampedProgress * this.currentBuffer.duration;
    const wasPaused = this.isPaused;
    this.stop();
    if (!wasPaused) {
      this.playBuffer(this.currentBuffer, targetOffset);
    } else {
      this.pauseOffset = targetOffset;
      this.isPaused = true;
      if (this.onProgressCallback) {
        this.onProgressCallback(
          clampedProgress,
          targetOffset,
          this.currentBuffer.duration
        );
      }
    }
    this.notifyState();
  }

  // Helper to convert text to natural Egyptian colloquial phonetics for voice synthesizers
  private formatForEgyptianColloquialSpeech(rawText: string): string {
    if (!rawText) return '';

    // 1. Remove meta instruction prompts that shouldn't be read out loud
    let t = rawText
      .replace(/بالإنجليزي(ة)?\s*:\s*[^\n.]+/gi, '')
      .replace(/ما تقوله للجنة بالعامية المصرية\s*:\s*/gi, '')
      .replace(/سلايد\s*\d+\s*:\s*/gi, '')
      .replace(/Slide\s*\d+\s*:\s*/gi, '')
      .replace(/[*_#~`]/g, ' ')
      .trim();

    // 2. Transliterate English managerial formulas to Egyptian Arabic so voice never stumbles
    t = t
      .replace(/Problem and Data/gi, 'المشكلة والداتا')
      .replace(/Problem equals Data/gi, 'المشكلة يعني داتا')
      .replace(/Risk and Priority/gi, 'الريسك والأولوية')
      .replace(/Risk determines Priority/gi, 'حجم الخطر بيحدد الأولوية')
      .replace(/Immediate Action and Ownership/gi, 'التحرك الفوري والمسؤولية')
      .replace(/Action equals Ownership/gi, 'الأكشن يعني مسؤولية كاملة')
      .replace(/RCA and Bottleneck/gi, 'تحليل السبب ومكان الخنقة')
      .replace(/CAPA and Standardization/gi, 'الخطة الوقائية وتوحيد الإجراء')
      .replace(/Stakeholders and Cross-functional/gi, 'التنسيق مع الإدارات والموردين')
      .replace(/Follow-up and Closure/gi, 'المتابعة وتقفيل الملف')
      .replace(/Data-driven/gi, 'مبني على الأرقام')
      .replace(/Prioritization/gi, 'ترتيب الأولويات')
      .replace(/5 Whys/gi, 'خمسة واي، اسأل ليه 5 مرات')
      .replace(/Root Cause Analysis/gi, 'تحليل السبب الجذري')
      .replace(/Closing Loop/gi, 'تقفيل الدائرة')
      .replace(/\bSLAs\b/gi, 'اتفاقيات الإس إل إيه')
      .replace(/\bSLA\b/gi, 'إس إل إيه')
      .replace(/\bKPIs\b/gi, 'مؤشرات الكي بي آي')
      .replace(/\bKPI\b/gi, 'كي بي آي')
      .replace(/\bRCA\b/gi, 'آر سي إيه، تحليل السبب الجذري')
      .replace(/\bCAPA\b/gi, 'كابا، الخطة الوقائية')
      .replace(/\bTAT\b/gi, 'تات، زمن تسليم العينات')
      .replace(/\bNPS\b/gi, 'إن بي إس، مؤشر رضا المريض')
      .replace(/\bBottlenecks?\b/gi, 'مكان الخنقة')
      .replace(/\bBatch(ing)?\b/gi, 'باتشات تجميع')
      .replace(/\bRACI\b/gi, 'مصفوفة راكي للمسؤوليات')
      .replace(/\bSOPs?\b/gi, 'إس أو بي، دليل الإجراء القياسي')
      .replace(/\bSection Head\b/gi, 'رئيس قسم العمليات')
      .replace(/\bOperations?\b/gi, 'العمليات')
      .replace(/\bSupport\b/gi, 'الدعم التشغيلي')
      .replace(/\bDashboard\b/gi, 'لوحة المتابعة')
      .replace(/\bSTAR\b/gi, 'ستار');

    // 3. Phonetic Egyptian Vocalization (تشكيل وضبط مخارج الألفاظ المصرية لعدم نطقها فصحى جافة)
    t = t
      .replace(/يا إسلام/g, 'يَا إِسْلَامْ')
      .replace(/يا فندم/g, 'يَا فَنْدِمْ')
      .replace(/مفيش/g, 'مَفِيشْ')
      .replace(/علشان/g, 'عَلَشَانْ')
      .replace(/عشان/g, 'عَشَانْ')
      .replace(/دلوقتي/g, 'دِلْوَقْتِي')
      .replace(/شيل الليلة/g, 'شِيلْ اللِّيلَة')
      .replace(/بدل ما/g, 'بَدَلْ مَا')
      .replace(/هنعمل/g, 'هَنِعْمِلْ')
      .replace(/هنتحرك/g, 'هَنِتْحَرَّكْ')
      .replace(/هننزل/g, 'هَنِنْزِلْ')
      .replace(/بص يا فندم/g, 'بُصْ يَا فَنْدِمْ')
      .replace(/نزلت الميدان/g, 'نِزِلْتْ المِيدَانْ')
      .replace(/نزلنا الميدان/g, 'نِزِلْنَا المِيدَانْ')
      .replace(/مش هنستنى/g, 'مِشْ هَنِسْتَنَّى')
      .replace(/مش هنسيب/g, 'مِشْ هَنِسِيبْ')
      .replace(/إحنا|احنا/g, 'إِحْنَا')
      .replace(/إللي|اللي/g, 'إِللِّي')
      .replace(/كده/g, 'كِدَه')
      .replace(/طوابير/g, 'طَوَابِيرْ')
      .replace(/عينات/g, 'عَيِّنَاتْ')
      .replace(/معامل/g, 'مَعَامِلْ')
      .replace(/أزمة/g, 'أَزْمَة')
      .replace(/أنا مسؤول/g, 'أَنَا مَسْؤُولْ')
      .replace(/زي ما بنقول/g, 'زَيّْ مَا بِنْقُولْ')
      .replace(/إزاي/g, 'إِزَّايْ')
      .replace(/كويس/g, 'كُوَيِّسْ')
      .replace(/حاجة/g, 'حَاجَة')
      .replace(/حاجات/g, 'حَاجَاتْ')
      .replace(/فين/g, 'فِينْ')
      .replace(/كام/g, 'كَامْ');

    return t;
  }

  // Fallback for offline or temporary network delay
  private playClientSpeechFallback(text: string, onEnded?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnded) onEnded();
      this.notifyState();
      return;
    }
    window.speechSynthesis.cancel();
    
    // Process text into natural Egyptian colloquial rhythm
    const cleanEgyptianText = this.formatForEgyptianColloquialSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanEgyptianText);
    utterance.lang = 'ar-EG';
    utterance.rate = Math.max(0.75, Math.min(1.1, this.currentSpeed * 0.88));
    utterance.pitch = 0.95;

    // Smart Egyptian voice selector
    const selectBestVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      // 1. First priority: Exact Egyptian Arabic voice (ar-EG)
      const exactEgypt = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('ar-eg') ||
          v.name.toLowerCase().includes('egypt') ||
          v.name.toLowerCase().includes('مصر')
      );
      if (exactEgypt) return exactEgypt;

      // 2. Second priority: Natural Arabic voices (Tarek, Laila, Maged, Salma, Zeina)
      const naturalAr = voices.find(
        (v) =>
          v.lang.startsWith('ar') &&
          /tarek|laila|maged|salma|zeina|hoda|shakir/i.test(v.name)
      );
      if (naturalAr) return naturalAr;

      // 3. Third priority: Any Arabic voice
      const genericAr = voices.find((v) => v.lang.startsWith('ar'));
      return genericAr || null;
    };

    const chosenVoice = selectBestVoice();
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onend = () => {
      this.clearProgressTimer();
      if (onEnded) onEnded();
      this.notifyState();
    };

    utterance.onerror = () => {
      this.clearProgressTimer();
      if (onEnded) onEnded();
      this.notifyState();
    };

    window.speechSynthesis.speak(utterance);
    this.notifyState();
  }
}

export const audioCoach = new AudioCoachEngine();
