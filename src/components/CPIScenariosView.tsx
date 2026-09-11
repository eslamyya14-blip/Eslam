import React, { useState } from 'react';
import {
  HelpCircle,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { CPI_SCENARIOS, CPIScenarioItem } from '../data/interviewData';

interface CPIScenariosViewProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const CPIScenariosView: React.FC<CPIScenariosViewProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<CPIScenarioItem>(CPI_SCENARIOS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (item: CPIScenarioItem) => {
    const text = `سيناريو CPI: ${item.title}\n\n` +
      `الموقف: ${item.scenarioPrompt}\n\n` +
      `سؤال اللجنة: ${item.committeeQuestion}\n\n` +
      `رد الكوتش بالعامية المصرية:\n${item.egyptianCoachAnswer}\n\n` +
      `الربط بمعادلة الإدارة: ${item.formulaConnection}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayAudio = (item: CPIScenarioItem) => {
    const title = `سيناريو CPI: ${item.title}`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      const speech = `سؤال اللجنة في موقف ${item.title}: ${item.committeeQuestion}... رد الكوتش بالعامية المصرية: ${item.egyptianCoachAnswer}... الربط بمعادلة الإدارة: ${item.formulaConnection}`;
      onPlayAudio(speech, title, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
          <HelpCircle className="h-3 w-3" />
          <span>الأسئلة السلوكية والظرفية (Competency-Based Interview - CPI)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          أصعب 6 سيناريوهات مفاجئة تطرحها لجان التقييم
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          لجان الإدارة العليا لا تسأل أسئلة نظرية؛ يسألونك: "لو حصل كذا بكره الصبح في الفرع، هتعمل إيه بالضبط؟"
          هنا ردود عملية محكمة مبنية على الثبات الانفعالي ومعادلة المدير السبعة.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scenarios List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {CPI_SCENARIOS.map((item, idx) => {
            const isSelected = selectedScenario.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedScenario(item)}
                className={`rounded-xl border p-4 text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/15 ring-1 ring-indigo-500/40 shadow-md'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-indigo-400 font-mono text-[11px]">{item.category}</span>
                  <span className="text-slate-500 text-[10px]">سيناريو 0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{item.scenarioPrompt}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Scenario Content (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-5 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                  {selectedScenario.category} • سيناريو اختباري
                </span>
                <h3 className="text-lg font-black text-white">
                  {selectedScenario.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handlePlayAudio(selectedScenario)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>
                    {isPlaying && currentAudioTitle === `سيناريو CPI: ${selectedScenario.title}`
                      ? 'إيقاف الصوت'
                      : 'استمع للإجابة النموذجية'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedScenario)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="نسخ السيناريو"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* Committee Question */}
            <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4 space-y-1.5 text-xs sm:text-sm">
              <span className="font-bold text-indigo-300 block flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>سؤال اللجنة المباغت:</span>
              </span>
              <p className="text-slate-100 font-bold leading-relaxed">
                "{selectedScenario.committeeQuestion}"
              </p>
            </div>

            {/* Egyptian Coach Answer */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              <span className="font-bold text-amber-300 text-xs block flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>طريقة الرد التنفيذي بالعامية المصرية الهادئة والواثقة:</span>
              </span>
              <p className="whitespace-pre-line leading-loose text-slate-100">
                {selectedScenario.egyptianCoachAnswer}
              </p>
            </div>

            {/* Formula Connection */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1 text-xs text-amber-200">
              <span className="font-bold text-amber-300 block">
                كيف تخدم هذه الإجابة معادلة المدير السبعة؟
              </span>
              <p className="text-slate-300 leading-relaxed font-mono">
                {selectedScenario.formulaConnection}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
