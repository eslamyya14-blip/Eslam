import React from 'react';
import { Play, Pause, AlertTriangle, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { SoundWaveVisualizer } from './SoundWaveVisualizer';

interface HeroCoachIntroProps {
  onPlayFullLesson: () => void;
  isPlayingFull: boolean;
  isLoadingAudio: boolean;
  activeVoiceName: string;
}

export const HeroCoachIntro: React.FC<HeroCoachIntroProps> = ({
  onPlayFullLesson,
  isPlayingFull,
  isLoadingAudio,
  activeVoiceName,
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>نبرة كوتش هادئ وواثق • بالعامية المصرية</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Volume2 className="h-3.5 w-3.5 text-slate-400" />
            <span>الصوت الحالي: <strong className="text-slate-200">{activeVoiceName}</strong></span>
          </div>
        </div>

        {/* Main Heading & Lesson Hook */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            عقلية المدير... <span className="text-amber-400">مش حفظ قائمة، دي ردود أفعال غريزية.</span>
          </h2>
          <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            مع التكرار والوقفات الاستراتيجية هتبدأ تسمع تلقائياً في ودنك:
            <br />
            <span className="text-amber-300 font-bold font-mono">
              Problem = Data ... Risk = Priority ... Action = Ownership ... RCA = Bottleneck ... CAPA = Fix & Prevent
            </span>
          </p>
        </div>

        {/* Mindset Contrast Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Old Mindset */}
          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 transition-all">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm mb-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>عقلية الخوف والتبرير (Panic & Blame)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-200/80 leading-relaxed">
              <li>• "يا فندم السيستم واقع ومش عارفين نشتغل وكلم الـ IT".</li>
              <li>• "حاسس إن الناس متضايقة من غير أرقام واضحة".</li>
              <li>• "دي مش مسؤوليتي دي غلطة فلان في الشيفت التاني".</li>
              <li>• تسكين العَرَض بمسكن مؤقت دون البحث عن عنق الزجاجة.</li>
            </ul>
          </div>

          {/* New Mindset */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 transition-all">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm mb-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>عقلية القائد التنفيذي (Manager Mode)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-200/90 leading-relaxed">
              <li>• المشكلة تساوي داتا: "الأرقام بتقول إيه؟ كام حالة اتأخرت؟".</li>
              <li>• الخطر يحدد الأولوية: "سلامة المريض أولاً قبل أي مجاملة".</li>
              <li>• التصرف مسؤولية: "أنا واخد المسؤولية وبتحرك حالاً أحتوي الموقف".</li>
              <li>• الحل وقاية: "صلّح النهاردة، واربط بـ SLA ملزمة لبكرة".</li>
            </ul>
          </div>
        </div>

        {/* Master Listen Bar */}
        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onPlayFullLesson}
              disabled={isLoadingAudio}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              title={isPlayingFull ? 'إيقاف مؤقت' : 'استمع للجلسة الكاملة'}
            >
              {isLoadingAudio ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              ) : isPlayingFull ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="h-6 w-6 fill-current mr-0.5" />
              )}
            </button>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>الجلسة الصوتية التأسيسية الشاملة (كوتش مصري هادئ)</span>
                {isPlayingFull && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                نبرة متأنية مع وقفات محسوبة لتثبيت معادلة التفكير الإداري
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="w-24 sm:w-32">
              <SoundWaveVisualizer isPlaying={isPlayingFull} barCount={18} heightClass="h-7" />
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-300 whitespace-nowrap">
              {isPlayingFull ? 'جاري الاستماع...' : 'جاهز للتشغيل'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
