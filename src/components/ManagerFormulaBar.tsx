import React from 'react';
import { Volume2, Pause } from 'lucide-react';
import { ManagerStep } from '../types';

interface ManagerFormulaBarProps {
  onPlayFormula: () => void;
  isPlayingFormula: boolean;
  onSelectStep: (stepId: string) => void;
  activeStepId: string;
  steps: ManagerStep[];
}

export const ManagerFormulaBar: React.FC<ManagerFormulaBarProps> = ({
  onPlayFormula,
  isPlayingFormula,
  onSelectStep,
  activeStepId,
  steps,
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-amber-400">⚡ معادلة التفكير الإداري (THE MANAGER FORMULA)</span>
            <span className="text-xs text-slate-400 font-medium">بالعامية المصرية الهادئة والواثقة</span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            الوقفات الاستراتيجية بين الكلمات ترسخ المعادلة في عقلك الباطن: Problem = Data ... Risk = Priority ... Action = Ownership
          </p>
        </div>
        <button
          type="button"
          onClick={onPlayFormula}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          {isPlayingFormula ? (
            <>
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>إيقاف المعادلة</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3.5 w-3.5" />
              <span>استمع للمعادلة بوقفات التدريب</span>
            </>
          )}
        </button>
      </div>

      {/* The Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {steps.map((item, index) => {
          const isSelected = activeStepId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectStep(item.id)}
              className={`flex flex-col justify-between rounded-xl border p-3 text-right transition-all group cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="font-mono text-slate-500">0{index + 1}</span>
                  <span className="text-slate-300 truncate">{item.keywordAr}</span>
                </div>
                <div className="text-xs sm:text-sm font-black tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  {item.keywordEn}
                </div>
              </div>
              <div className="mt-2.5 border-t border-slate-800/60 pt-2">
                <p className="text-[11px] text-slate-300 leading-snug font-medium line-clamp-2">
                  {item.mantraAr}
                </p>
                <span className="text-[10px] text-slate-500 font-mono block mt-1 truncate">
                  {item.keyQuestionEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Egyptian Arabic Cadence Prompt Footer */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-medium">
        <span className="text-slate-200">
          💡 <strong>الربط التلقائي في ودنك:</strong> المشكلة داتا ... الخطر أولوية ... الأكشن مسؤولية ... السبب خنقة ... الحل وقاية ... الشركاء تنسيق ... والمتابعة تقفيل!
        </span>
        <span className="text-amber-400 font-mono text-[11px] font-bold">
          DATA • PRIORITY • OWNERSHIP • RCA • CAPA • STAKEHOLDERS • FOLLOW-UP
        </span>
      </div>
    </div>
  );
};
