import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Play,
  Pause,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Brain,
  Target,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Clock,
  Compass,
} from 'lucide-react';
import {
  MASTER_LESSON_INTRO,
  MASTER_CHAPTERS,
  ONE_BREATH_STORY,
  THE_MANAGER_FORMULA,
  MEMORY_CHAIN,
  FINAL_MINDSET_TEST,
  MasterChapter,
} from '../data/foundationalMasterLesson';

interface ManagerModeMasterStudioProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const ManagerModeMasterStudio: React.FC<ManagerModeMasterStudioProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(MASTER_CHAPTERS[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeChapter =
    MASTER_CHAPTERS.find((c) => c.id === activeChapterId) || MASTER_CHAPTERS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const playOrStop = (text: string, title: string, voice = 'Fenrir') => {
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(text, title, voice);
    }
  };

  const handlePlayFullLesson = () => {
    const fullScript = [
      MASTER_LESSON_INTRO.introScript,
      '... والآن المحاور السبعة بالتفصيل: ...',
      MASTER_CHAPTERS.map(
        (c) =>
          `المحور رقم 0${c.stepNumber}... ${c.titleEn}... وقاعدته: ${c.goldenRuleAr}... ومثاله: ${c.audioSpeechText}`
      ).join(' ... '),
      '... والآن القصة كلها في نفس واحد: ...',
      ONE_BREATH_STORY.audioSpeechText,
      '... معادلة المدير السبعة: ...',
      THE_MANAGER_FORMULA.audioSpeechText,
      '... والاختبار النهائي: ...',
      FINAL_MINDSET_TEST.audioSpeechText,
    ].join(' ');

    playOrStop(fullScript, 'المحاضرة التأسيسية الشاملة: MANAGER MODE');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>🎙️ MANAGER MODE — غيّر طريقة تفكيرك</span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 bg-slate-800/80 text-slate-300">
              نبرة كوتش هادئ وواثق • بالعامية المصرية
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              اسمع الدرس ده بهدوء... <span className="text-amber-400">ومتستعجلش.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-3xl leading-relaxed">
              الهدف مش إنك تحفظ إنجليزي... الهدف إنك تغيّر طريقة تفكيرك.
              من النهارده لما تشوف مشكلة، مخك ما يقولش: <span className="text-rose-400 font-bold">"مين السبب؟"</span> مخك يقول: <span className="text-emerald-400 font-bold">What is the problem? What does the data say?</span>
            </p>
          </div>

          {/* Quick Audio Triggers Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePlayFullLesson}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-amber-500 px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying && currentAudioTitle === 'المحاضرة التأسيسية الشاملة: MANAGER MODE' ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
              <span>
                {isPlaying && currentAudioTitle === 'المحاضرة التأسيسية الشاملة: MANAGER MODE'
                  ? 'إيقاف المحاضرة الصوتية'
                  : 'استمع للدرس التأسيسي كاملاً بصوت الكوتش (Egyptian Arabic)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                playOrStop(
                  ONE_BREATH_STORY.audioSpeechText,
                  'القصة كلها في نفس واحد (One Breath Story)'
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="h-4 w-4 text-amber-400" />
              <span>
                {isPlaying &&
                currentAudioTitle === 'القصة كلها في نفس واحد (One Breath Story)'
                  ? 'إيقاف'
                  : 'القصة في نفس واحد'}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                playOrStop(
                  THE_MANAGER_FORMULA.audioSpeechText,
                  'معادلة المدير السبعة (The Manager Formula)'
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <Flame className="h-4 w-4 text-amber-400" />
              <span>
                {isPlaying &&
                currentAudioTitle === 'معادلة المدير السبعة (The Manager Formula)'
                  ? 'إيقاف'
                  : 'معادلة المدير الذهبية'}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                playOrStop(
                  FINAL_MINDSET_TEST.audioSpeechText,
                  'الاختبار النهائي: عقلية المدير أمام الأزمات'
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <Target className="h-4 w-4 text-emerald-400" />
              <span>
                {isPlaying &&
                currentAudioTitle === 'الاختبار النهائي: عقلية المدير أمام الأزمات'
                  ? 'إيقاف'
                  : 'آخر اختبار: لما تشوف مشكلة'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* The 7 Core Questions Sequence */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-amber-400" />
              <span>الأسئلة السبعة المحفورة في عقل المدير (The 7 Core Questions)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              دي مش سبع أسئلة عشوائية... دي طريقة تفكير القائد التنفيذي.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              playOrStop(
                MASTER_LESSON_INTRO.introScript,
                'مقدمة الأسئلة السبعة بصوت الكوتش'
              )
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            <Volume2 className="h-3.5 w-3.5 text-amber-400" />
            <span>استمع للمقدمة والأسئلة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MASTER_LESSON_INTRO.coreQuestions.map((q, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-all hover:border-amber-500/40 hover:bg-slate-900 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-400">
                  السؤال 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    playOrStop(
                      `السؤال رقم 0${idx + 1}... بالإنجليزية: ${q.en}... وبالعامية المصرية: ${q.ar}`,
                      `سؤال ${idx + 1}: ${q.en}`
                    )
                  }
                  className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                  title="استمع لنطق السؤال"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white tracking-wide">{q.en}</div>
                <div className="text-xs text-amber-300/90 font-medium mt-0.5">{q.ar}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 7 In-Depth Chapters with Insurance Story */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span>المحاور السبعة بالتفصيل: قصة شيت التأمين والـ 30 حالة</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              اضغط على أي محور للاطلاع على القصة والشرح الصوتي بالعامية المصرية والوقفات الاستراتيجية
            </p>
          </div>
        </div>

        {/* Chapter Selection Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MASTER_CHAPTERS.map((ch) => {
            const isSelected = activeChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChapterId(ch.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                    : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className="font-mono">0{ch.stepNumber}</span>
                <span>{ch.keywordEn}</span>
                <span className="text-[11px] opacity-80">({ch.keywordAr})</span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 font-mono text-xs font-black text-amber-300 border border-amber-500/30">
                  محور 0{activeChapter.stepNumber}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {activeChapter.keywordEn}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {activeChapter.titleAr}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  playOrStop(
                    activeChapter.audioSpeechText,
                    `المحور 0${activeChapter.stepNumber}: ${activeChapter.titleEn}`
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                {isPlaying &&
                currentAudioTitle ===
                  `المحور 0${activeChapter.stepNumber}: ${activeChapter.titleEn}` ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                <span>
                  {isPlaying &&
                  currentAudioTitle ===
                    `المحور 0${activeChapter.stepNumber}: ${activeChapter.titleEn}`
                    ? 'إيقاف الصوت'
                    : 'استمع للمحور بصوت الكوتش'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(activeChapter.narrativeText, activeChapter.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                title="نسخ نص المحور"
              >
                {copiedKey === activeChapter.id ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copiedKey === activeChapter.id ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
          </div>

          {/* Narrative Story (Egyptian Arabic) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>القصة والمثال الميداني بالعامية المصرية:</span>
            </div>
            <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {activeChapter.narrativeText}
            </p>
          </div>

          {/* Key Rule & Pause Mantra Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1">
              <div className="text-[11px] font-bold text-amber-400 uppercase">القاعدة الذهبية</div>
              <div className="text-sm font-bold text-white font-mono">{activeChapter.goldenRuleEn}</div>
              <div className="text-xs text-amber-200/90">{activeChapter.goldenRuleAr}</div>
            </div>

            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 space-y-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-cyan-400 uppercase">
                  الوقفة الذهبية (الربط التلقائي في عقلك)
                </div>
                <div className="text-base font-black text-cyan-200 font-mono mt-1">
                  {activeChapter.pauseMantra}
                </div>
              </div>
              <div className="text-[11px] text-cyan-300/80">
                مع التكرار والوقفات هتبدأ تسمع المعادلة دي تلقائياً عند أي أزمة
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The One-Breath Story Section */}
      <section className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div className="space-y-1">
            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-0.5 text-xs font-bold text-amber-300">
              The One-Breath Story
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {ONE_BREATH_STORY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              طريقة سرد الأزمة التنفيذية أمام لجنة إسبانيا بلازا في نفس واحد بدون تلعثم
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              playOrStop(
                ONE_BREATH_STORY.audioSpeechText,
                'القصة كلها في نفس واحد (One Breath Story)'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            {isPlaying &&
            currentAudioTitle === 'القصة كلها في نفس واحد (One Breath Story)' ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span>
              {isPlaying &&
              currentAudioTitle === 'القصة كلها في نفس واحد (One Breath Story)'
                ? 'إيقاف الصوت'
                : 'استمع للقصة في نفس واحد'}
            </span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
          <p className="whitespace-pre-line text-sm sm:text-base text-amber-100 font-mono leading-loose">
            {ONE_BREATH_STORY.text}
          </p>
        </div>
      </section>

      {/* The Manager Formula (7 Mantras) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-400" />
              <span>{THE_MANAGER_FORMULA.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              سبع جمل محفورة في العقل تثبت عقلية المدير: أنا لا أخمن... أنا أقيس.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              playOrStop(
                THE_MANAGER_FORMULA.audioSpeechText,
                'معادلة المدير السبعة (The Manager Formula)'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            {isPlaying &&
            currentAudioTitle === 'معادلة المدير السبعة (The Manager Formula)' ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span>
              {isPlaying &&
              currentAudioTitle === 'معادلة المدير السبعة (The Manager Formula)'
                ? 'إيقاف الصوت'
                : 'استمع لمعادلة المدير'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {THE_MANAGER_FORMULA.mantras.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-all hover:border-amber-500/40 hover:bg-slate-900 flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-black text-amber-400">
                    {m.en}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{m.textEn}</span>
                </div>
                <div className="text-sm font-bold text-white">{m.textAr}</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  playOrStop(
                    `${m.en}... بالإنجليزية: ${m.textEn}... وبالعامية المصرية: ${m.textAr}`,
                    `مبدأ ${m.en}`
                  )
                }
                className="text-slate-400 hover:text-amber-400 transition-colors p-1.5"
                title="استمع للمبدأ"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Memory Chain Bar */}
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Brain className="h-4 w-4" />
          <span>احفظ الجملة دي زي اسمك</span>
        </div>
        <div className="font-mono text-sm sm:text-base font-black text-amber-300 tracking-wider">
          {MEMORY_CHAIN.en}
        </div>
        <div className="text-xs sm:text-sm text-slate-300 font-medium">
          {MEMORY_CHAIN.ar}
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() =>
              playOrStop(
                MEMORY_CHAIN.audioSpeechText,
                'سلسلة الحفظ الذهبية للمحاور السبعة'
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            <Volume2 className="h-3.5 w-3.5 text-amber-400" />
            <span>استمع لترتيب السلسلة</span>
          </button>
        </div>
      </section>

      {/* Final Mindset Test: How a Real Manager Acts */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-0.5 text-xs font-bold text-emerald-400">
              The Final Mindset Test
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {FINAL_MINDSET_TEST.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              لما المدير يشوف مشكلة... ما يعملش Panic وما يدورش على كبش فداء
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              playOrStop(
                FINAL_MINDSET_TEST.audioSpeechText,
                'الاختبار النهائي: عقلية المدير أمام الأزمات'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            {isPlaying &&
            currentAudioTitle === 'الاختبار النهائي: عقلية المدير أمام الأزمات' ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span>
              {isPlaying &&
              currentAudioTitle === 'الاختبار النهائي: عقلية المدير أمام الأزمات'
                ? 'إيقاف الصوت'
                : 'استمع للاختبار الأخير'}
            </span>
          </button>
        </div>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Weak Manager */}
          <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{FINAL_MINDSET_TEST.contrastBad.title}</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-200/90 leading-relaxed">
              {FINAL_MINDSET_TEST.contrastBad.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Manager */}
          <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{FINAL_MINDSET_TEST.contrastGood.title}</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-200/90 leading-relaxed">
              {FINAL_MINDSET_TEST.contrastGood.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6 text-center space-y-3">
          <p className="whitespace-pre-line font-mono text-sm sm:text-base font-bold text-amber-200 leading-relaxed">
            {FINAL_MINDSET_TEST.conclusion}
          </p>
        </div>
      </section>
    </div>
  );
};
