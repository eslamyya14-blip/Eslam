import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Printer,
  Sparkles,
  Check,
  CheckCircle2,
  Bookmark,
  Share2,
  Volume2,
} from 'lucide-react';
import { ManagerStep } from '../types';
import { getAllNotes, subscribeToNotes } from '../utils/notesStorage';

interface CheatSheetViewProps {
  steps: ManagerStep[];
  onPlaySummary: () => void;
  isPlayingSummary: boolean;
  onPlayAudio?: (text: string, title?: string, voice?: string) => void;
  onStopAudio?: () => void;
  currentAudioTitle?: string;
  isPlaying?: boolean;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({
  steps,
  onPlaySummary,
  isPlayingSummary,
  onPlayAudio,
  onStopAudio,
  currentAudioTitle = '',
  isPlaying = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = () => {
      const all = getAllNotes();
      const mapped: Record<string, string> = {};
      Object.entries(all).forEach(([k, v]) => {
        if (v && typeof v === 'object' && 'text' in v) {
          mapped[k] = (v as { text: string }).text;
        }
      });
      setUserNotes(mapped);
    };
    load();
    return subscribeToNotes(load);
  }, []);

  const handleCopyAll = () => {
    const text = steps
      .map(
        (s, i) =>
          `${i + 1}. [${s.keywordEn}] ${s.titleAr}\n   - السؤال: ${s.keyQuestionAr} (${s.keyQuestionEn})\n   - المانترا: ${s.mantraAr}\n   - قاعدة الكوتش: ${s.coachRuleAr}\n   ${userNotes[s.id] ? `   - ملاحظتي: ${userNotes[s.id]}` : ''}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(
      `ملخص عقلية المدير (Manager Mode Cheat Sheet):\n\n${text}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right w-full sm:w-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3 w-3" />
            <span>موجز المراجعة السريعة • Cheat Sheet</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            بطاقة الذاكرة الإدارية (The 7 Pillars)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            مراجعة مكثفة للمصطلحات والأسئلة والمانترا مع ملاحظاتك الميدانية
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onPlaySummary}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all cursor-pointer shadow-md"
          >
            <Volume2 className="h-4 w-4" />
            <span>{isPlayingSummary ? 'إيقاف الملخص' : 'استمع للموجز الصوتي'}</span>
          </button>
          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            title="نسخ الكل"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            title="طباعة"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">طباعة</span>
          </button>
        </div>
      </div>

      {/* Pillars Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, idx) => {
          const hasNote = Boolean(userNotes[step.id]?.trim());
          return (
            <div
              key={step.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3.5 hover:border-slate-700 transition-all shadow-md relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-black">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {step.titleAr}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {step.keywordEn}
                  </span>
                  {onPlayAudio && (
                    <button
                      type="button"
                      onClick={() => {
                        const title = `موجز ${step.stepNumber}`;
                        if (isPlaying && currentAudioTitle === title && onStopAudio) {
                          onStopAudio();
                        } else {
                          onPlayAudio(
                            `المحور ${step.stepNumber}: ${step.titleAr}. سؤاله المحوري: ${step.keyQuestionAr}. مانترا: ${step.mantraAr}. وتوجيه الكوتش: ${step.coachRuleAr}`,
                            title,
                            'Fenrir'
                          );
                        }
                      }}
                      className="text-slate-400 hover:text-amber-300 p-1 rounded cursor-pointer"
                      title="استمع للملخص"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-semibold shrink-0">السؤال:</span>
                  <span className="text-slate-200 font-medium">{step.keyQuestionAr}</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-semibold shrink-0">المانترا:</span>
                  <span className="text-emerald-300 font-bold">{step.mantraAr}</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-semibold shrink-0">قاعدة الكوتش:</span>
                  <span className="text-slate-300">{step.coachRuleAr}</span>
                </div>
              </div>

              {/* Personal Note in this step */}
              {hasNote && (
                <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-2.5 text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
                    <Bookmark className="h-3 w-3" />
                    <span>ملاحظتي من واقع الفرع:</span>
                  </div>
                  <p className="line-clamp-3 text-slate-300">{userNotes[step.id]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Golden Summary */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
        <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>القاعدة الذهبية لدخول أي مقابلة ترقية:</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          اللجنة لا تبحث عن شخص يشكو من صعوبة العمل، ولا شخص يقفز للحلول العشوائية. اللجنة تبحث عن شخص
          يدخل وهو هادئ، واثق، يتكلم بلغة الأرقام (Data)، ويفرز الأولويات بالخطر (Priority)، ويتحمل المسؤولية (Ownership)،
          ويعالج المشكلة من جذورها (RCA)، ويضع نظاماً يمنع تكرارها (CAPA)، وينسق بسلاسة مع الإدارات الأخرى (Stakeholders)،
          ويغلق الملف بقياس أثر واضح (Follow-up).
        </p>
      </div>
    </div>
  );
};
