import React, { useState } from 'react';
import {
  Trophy,
  Volume2,
  Play,
  Pause,
  Copy,
  Check,
  Sparkles,
  Clock,
  Target,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { ELEVATOR_PITCHES, ElevatorPitchItem } from '../data/interviewData';

interface ElevatorSimulatorProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const ElevatorSimulator: React.FC<ElevatorSimulatorProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<'30s' | '60s' | '90s'>('60s');
  const [copied, setCopied] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const currentPitch: ElevatorPitchItem = ELEVATOR_PITCHES[selectedDuration];

  const handleToggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
      const targetSec = selectedDuration === '30s' ? 30 : selectedDuration === '60s' ? 60 : 90;
      setTimerSeconds(targetSec);

      const interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPitch.speechText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayPitch = () => {
    const title = `عرض المصعد التنفيذي (${selectedDuration})`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(currentPitch.speechText, title, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Trophy className="h-3 w-3" />
          <span>أصنصير الترقية • The Executive Elevator Pitch</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          "عرفنا بنفسك يا إسلام، وليه شايف إنك الأنسب لمنصب Section Head؟"
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          أول دقيقتين في المقابلة بتحدد 70% من انطباع اللجنة. لا تسرد سيرتك الذاتية بتواريخ جافة؛ قدم
          نفسك كقائد أزمات تشغيلي حقق أرقاماً لا يمكن إنكارها في أصعب الفروع.
        </p>

        {/* Duration Tabs */}
        <div className="flex gap-2 pt-3">
          {(['30s', '60s', '90s'] as const).map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => {
                setSelectedDuration(dur);
                setIsTimerRunning(false);
              }}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedDuration === dur
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>
                {dur === '30s'
                  ? 'عرض الـ 30 ثانية (المكثف)'
                  : dur === '60s'
                  ? 'عرض الـ 60 ثانية (الذهبي)'
                  : 'عرض الـ 90 ثانية (الشامل)'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Pitch Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Speech Display (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                {currentPitch.label}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                النص المعتمد بنبرة Coach واثقة وهادئة
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayPitch}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>
                  {isPlaying && currentAudioTitle === `عرض المصعد التنفيذي (${selectedDuration})`
                    ? 'إيقاف الصوت'
                    : 'استمع للنطق المثالي'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                title="نسخ النص"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
              </button>
            </div>
          </div>

          {/* Speech Text Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm sm:text-base text-slate-100 leading-relaxed font-medium space-y-3">
            <p className="whitespace-pre-line leading-loose">
              "{currentPitch.speechText}"
            </p>
          </div>

          {/* Delivery Cue */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1 text-xs text-amber-300">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>توجيه الكوتش لنبرة الإلقاء:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentPitch.deliveryCue}
            </p>
          </div>
        </div>

        {/* Right: Key Figures & Practicing Timer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Key Figures Pill */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
            <h4 className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
              <Target className="h-4 w-4" />
              <span>الأرقام الذهبية الحتمية في كلامك:</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">الخبرة الميدانية:</span>
                <span className="text-amber-300 font-mono font-bold text-sm">14 سنة (11 خط أول)</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">وقت الانتظار (TAT):</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">من 42 لـ 14 دقيقة</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">رضا المراجعين (NPS):</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">92% في فيصل 10</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">الفروع المنشأة والمطورة:</span>
                <span className="text-purple-400 font-mono font-bold text-sm">40+ فرع جديد</span>
              </div>
            </div>
          </div>

          {/* Rehearsal Timer */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 text-center shadow-md">
            <h4 className="text-xs font-bold text-slate-300">
              عداد وقت التدريب الحي (Rehearsal Timer)
            </h4>
            <div className="py-2">
              <span className="text-4xl font-mono font-black text-amber-400">
                {timerSeconds > 0
                  ? `00:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`
                  : selectedDuration === '30s'
                  ? '00:30'
                  : selectedDuration === '60s'
                  ? '01:00'
                  : '01:30'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleTimer}
              className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                isTimerRunning
                  ? 'bg-rose-600 text-white hover:bg-rose-500'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {isTimerRunning ? 'إيقاف العداد' : 'ابدأ تدريب الإلقاء الآن'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
