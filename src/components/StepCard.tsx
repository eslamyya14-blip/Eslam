import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  HelpCircle,
  Sparkles,
  Check,
  X,
  FileEdit,
  Save,
  Trash2,
  Clock,
  CheckCheck,
} from 'lucide-react';
import { ManagerStep, StepNote } from '../types';
import { SoundWaveVisualizer } from './SoundWaveVisualizer';
import {
  getStepNote,
  getStepNoteDetails,
  saveStepNote,
  clearStepNote,
  subscribeToNotes,
} from '../utils/notesStorage';

interface StepCardProps {
  step: ManagerStep;
  isPlayingThisStep: boolean;
  isLoadingAudio: boolean;
  onPlayStepAudio: (step: ManagerStep) => void;
  isActive: boolean;
  onPlayAudio?: (text: string, title?: string, voice?: string) => void;
  onStopAudio?: () => void;
  currentAudioTitle?: string;
  isPlaying?: boolean;
}

const STEP_NOTE_HINTS: Record<string, string> = {
  data: 'اكتب هنا موقف حقيقي في فرعك حولت فيه الشكوى إلى أرقام وداتا...',
  priority: 'اكتب هنا موقف رتبت فيه أولوياتك بناء على الخطر والريسك الطبي...',
  ownership: 'اكتب هنا موقف أخدت فيه أكشن فوري وتحملت المسؤولية واحتويت الأزمة...',
  rca: 'اكتب هنا تجربة استخدمت فيها الـ 5 Whys واكتشفت فيها مكان الخنقة الحقيقي...',
  capa: 'اكتب هنا إجراء وقائي أو SLA وضعته لمنع تكرار خطأ متكرر...',
  stakeholders: 'اكتب هنا تجربة نسقت فيها مع إدارة مساندة وأقنعتهم بالداتا...',
  followup: 'اكتب هنا مؤشر أداء قست بيه نتيجة شغلك وأغلقت بيه الملف نهائياً...',
};

export const StepCard: React.FC<StepCardProps> = ({
  step,
  isPlayingThisStep,
  isLoadingAudio,
  onPlayStepAudio,
  isActive,
  onPlayAudio,
  onStopAudio,
  currentAudioTitle = '',
  isPlaying = false,
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Notes State
  const [noteText, setNoteText] = useState<string>('');
  const [noteDetails, setNoteDetails] = useState<StepNote | null>(null);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadNote = () => {
      const current = getStepNote(step.id);
      const details = getStepNoteDetails(step.id);
      setNoteText(current);
      setNoteDetails(details);
      if (current.trim().length > 0) {
        setIsNotesOpen(true);
      }
    };
    loadNote();
    return subscribeToNotes(loadNote);
  }, [step.id]);

  const handleOptionClick = (index: number) => {
    setSelectedQuizOption(index);
    setShowExplanation(true);
  };

  const handleSaveNote = () => {
    saveStepNote(step.id, noteText);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  const handleClearNote = () => {
    if (window.confirm('هل تريد مسح هذه الملاحظة؟')) {
      clearStepNote(step.id);
      setNoteText('');
      setNoteDetails(null);
    }
  };

  const formattedDate = noteDetails?.updatedAt
    ? new Date(noteDetails.updatedAt).toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div
      id={`step-${step.id}`}
      className={`rounded-2xl border transition-all duration-300 p-5 sm:p-7 space-y-6 ${
        isActive
          ? 'border-amber-500/80 bg-slate-900 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
          : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700'
      }`}
    >
      {/* Header & Step Audio Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-extrabold border border-amber-500/30">
              0{step.stepNumber}
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              {step.keywordEn} • {step.keywordAr}
            </span>
            {noteDetails?.text && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                <CheckCheck className="h-3 w-3 text-emerald-400" />
                <span>ملاحظات مسجلة</span>
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {step.titleAr}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1 text-xs text-amber-300 font-semibold border border-slate-700/60">
              <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
              <span>السؤال المحوري: <strong className="text-white font-mono">{step.keyQuestionEn}</strong> ({step.keyQuestionAr})</span>
            </div>
            {onPlayAudio && (
              <button
                type="button"
                onClick={() => {
                  const title = `سؤال المحور ${step.stepNumber}`;
                  if (isPlaying && currentAudioTitle === title && onStopAudio) {
                    onStopAudio();
                  } else {
                    onPlayAudio(
                      `سؤال المحور ${step.stepNumber}: ${step.keyQuestionAr}... ${step.keyQuestionEn}`,
                      title,
                      'Charon'
                    );
                  }
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-bold text-amber-300 cursor-pointer"
                title="استمع للسؤال"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>استمع للسؤال</span>
              </button>
            )}
          </div>
        </div>

        {/* Step Audio Button */}
        <div className="flex items-center gap-3 self-end sm:self-start">
          {isPlayingThisStep && (
            <div className="w-20">
              <SoundWaveVisualizer isPlaying={true} barCount={12} heightClass="h-6" />
            </div>
          )}
          <button
            type="button"
            onClick={() => onPlayStepAudio(step)}
            disabled={isLoadingAudio}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md ${
              isPlayingThisStep
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400'
                : 'border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            {isPlayingThisStep ? (
              <>
                <Pause className="h-4 w-4 fill-current" />
                <span>إيقاف مؤقت</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current mr-0.5" />
                <span>استمع للمحور {step.stepNumber}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Coach Mantra & Golden Rule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1.5 relative">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>توجيه الكوتش (Coach Rule بالعامية)</span>
            </div>
            {onPlayAudio && (
              <button
                type="button"
                onClick={() => {
                  const title = `توجيه الكوتش ${step.stepNumber}`;
                  if (isPlaying && currentAudioTitle === title && onStopAudio) {
                    onStopAudio();
                  } else {
                    onPlayAudio(
                      `توجيه الكوتش في المحور ${step.stepNumber}: ${step.coachRuleAr}. ${step.coachRuleEn}`,
                      title,
                      'Fenrir'
                    );
                  }
                }}
                className="text-amber-400 hover:text-amber-300 p-1 rounded cursor-pointer"
                title="استمع للقاعدة"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-100 leading-snug">
            {step.coachRuleAr}
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {step.coachRuleEn}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400">
              المانترا الذهبية (The Mantra)
            </div>
            {onPlayAudio && (
              <button
                type="button"
                onClick={() => {
                  const title = `مانترا المحور ${step.stepNumber}`;
                  if (isPlaying && currentAudioTitle === title && onStopAudio) {
                    onStopAudio();
                  } else {
                    onPlayAudio(
                      `المانترا الذهبية: ${step.mantraAr}... ${step.mantraEn}`,
                      title,
                      'Fenrir'
                    );
                  }
                }}
                className="text-emerald-400 hover:text-emerald-300 p-1 rounded cursor-pointer"
                title="استمع للمانترا"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm font-bold text-emerald-400 leading-snug">
            "{step.mantraAr}"
          </p>
          <p className="text-xs text-slate-500 font-mono">
            "{step.mantraEn}"
          </p>
        </div>
      </div>

      {/* Case Study in Action */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            حالة واقعية في الفرع: <strong className="text-white">{step.caseStudy.context}</strong>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] rounded bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 text-cyan-300 font-mono">
              {step.caseStudy.metric}
            </span>
            {onPlayAudio && (
              <button
                type="button"
                onClick={() => {
                  const title = `كيس ستادي ${step.stepNumber}`;
                  if (isPlaying && currentAudioTitle === title && onStopAudio) {
                    onStopAudio();
                  } else {
                    onPlayAudio(
                      `الموقف في الفرع: ${step.caseStudy.context}. الإجراء الميداني: ${step.caseStudy.action}`,
                      title,
                      'Fenrir'
                    );
                  }
                }}
                className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50 cursor-pointer"
              >
                <Volume2 className="h-3 w-3" />
                <span>استمع</span>
              </button>
            )}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {step.caseStudy.action}
        </p>
      </div>

      {/* Key Managerial Terms */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400">
          المصطلحات الإدارية الأساسية للمحور:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {step.deepDivePoints.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3 space-y-1 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-mono block">
                  {item.term}
                </span>
                {onPlayAudio && (
                  <button
                    type="button"
                    onClick={() => {
                      const title = `مصطلح: ${item.term}`;
                      if (isPlaying && currentAudioTitle === title && onStopAudio) {
                        onStopAudio();
                      } else {
                        onPlayAudio(
                          `المصطلح الإداري: ${item.term}. التوضيح: ${item.explanation}`,
                          title,
                          'Fenrir'
                        );
                      }
                    }}
                    className="text-slate-400 hover:text-amber-300 p-0.5 rounded cursor-pointer"
                    title="استمع للمصطلح"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Mindset Quiz */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-400">اختبار سريع لعقلية المدير في هذا المحور</span>
          {onPlayAudio && (
            <button
              type="button"
              onClick={() => {
                const title = `اختبار المحور ${step.stepNumber}`;
                if (isPlaying && currentAudioTitle === title && onStopAudio) {
                  onStopAudio();
                } else {
                  const opts = step.interactiveCheck.options
                    .map((o, i) => `الخيار ${i + 1}: ${o.text}`)
                    .join('. ');
                  onPlayAudio(
                    `سؤال الاختبار: ${step.interactiveCheck.question}. ${opts}`,
                    title,
                    'Charon'
                  );
                }
              }}
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>استمع للاختبار</span>
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-200">
          {step.interactiveCheck.question}
        </p>
        <div className="space-y-2 pt-1">
          {step.interactiveCheck.options.map((option, idx) => {
            const isSelected = selectedQuizOption === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleOptionClick(idx)}
                className={`w-full text-right rounded-lg border p-3 text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? option.isManagerMindset
                      ? 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 ring-1 ring-emerald-500/40'
                      : 'border-rose-500/80 bg-rose-950/30 text-rose-100 ring-1 ring-rose-500/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span>{option.text}</span>
                {isSelected && (
                  <span className="shrink-0 mt-0.5">
                    {option.isManagerMindset ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <X className="h-4 w-4 text-rose-400" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && selectedQuizOption !== null && (
          <div
            className={`rounded-lg border p-3 text-xs leading-relaxed transition-all ${
              step.interactiveCheck.options[selectedQuizOption].isManagerMindset
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200'
                : 'border-rose-500/40 bg-rose-950/40 text-rose-200'
            }`}
          >
            {step.interactiveCheck.options[selectedQuizOption].feedback}
          </div>
        )}
      </div>

      {/* Personal Notes & Workplace Reflection */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-950/50 p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <FileEdit className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>ملاحظات وتجارب من واقع فرعك</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                  حفظ دائم
                </span>
              </h4>
              <p className="text-[11px] text-slate-400">
                سجل موقفاً حقيقياً مررت به وطبق فيه هذا المحور لتستحضره في المقابلة
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {formattedDate && (
              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <Clock className="h-3 w-3" />
                <span>آخر تعديل: {formattedDate}</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              {isNotesOpen ? 'إخفاء المفكرة' : noteText ? 'عرض الملاحظة' : 'إضافة ملاحظة'}
            </button>
          </div>
        </div>

        {isNotesOpen && (
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <p className="text-[11px] text-amber-300/90 font-medium">
                💡 اقتراح الكوتش: {STEP_NOTE_HINTS[step.id] || 'سجل كيف طبقت هذا المفهوم في عملك اليومي...'}
              </p>
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onBlur={() => {
                  if (noteText.trim() !== (noteDetails?.text || '')) {
                    handleSaveNote();
                  }
                }}
                placeholder="اكتب هنا تجربتك أو الأرقام الخاصة بفرعك..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all leading-relaxed"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                {isSavedSuccess ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold animate-pulse">
                    <Check className="h-3.5 w-3.5" />
                    <span>تم الحفظ في المتصفح!</span>
                  </span>
                ) : (
                  <span>الملاحظات محفوظة محلياً وتظهر في ملخص الـ Cheat Sheet.</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {noteDetails?.text && (
                  <button
                    type="button"
                    onClick={handleClearNote}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 active:scale-95 transition-all cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>مسح</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>حفظ الملاحظة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
