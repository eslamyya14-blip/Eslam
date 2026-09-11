import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Volume2,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  X,
  HelpCircle,
  FileText,
  AlertCircle,
  Layers,
  Edit3,
} from 'lucide-react';
import { ManagerStep } from '../types';
import { MANAGER_STEPS } from '../data/lessonData';

interface CustomAxesEditorProps {
  steps: ManagerStep[];
  onSaveSteps: (updatedSteps: ManagerStep[]) => void;
  onResetSteps: () => void;
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const CustomAxesEditor: React.FC<CustomAxesEditorProps> = ({
  steps,
  onSaveSteps,
  onResetSteps,
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [editingStepId, setEditingStepId] = useState<string | null>(steps[0]?.id || 'data');
  const [formData, setFormData] = useState<ManagerStep>(steps[0] || MANAGER_STEPS[0]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  const handleSelectStep = (step: ManagerStep) => {
    setEditingStepId(step.id);
    setFormData({ ...step });
    setIsAddingNew(false);
    setSaveMessage(null);
  };

  const handleStartAddNew = () => {
    const newNum = steps.length + 1;
    const newId = `custom_step_${Date.now()}`;
    const newStepTemplate: ManagerStep = {
      id: newId,
      stepNumber: newNum,
      keywordEn: 'CUSTOM',
      keywordAr: 'محور تشغيلي مخصص',
      titleEn: 'Custom Operational Pillar',
      titleAr: `المحور ${newNum}: عنوان مخصص بالعامية المصرية`,
      keyQuestionEn: 'What is the strategic objective?',
      keyQuestionAr: 'إيه الهدف التشغيلي من المحور ده؟',
      mantraEn: 'Clear ownership brings definitive success.',
      mantraAr: 'الوضوح والتركيز سر النجاح المستدام.',
      coachRuleEn: 'Always measure what matters and follow through.',
      coachRuleAr: 'قيس اللي يفرق، وخليك قد الكلمة في التنفيذ.',
      audioPromptText: `اسمعني يا بطل... المحور ده محطوط عشانك بالعامية المصرية... ... ركز في كل تفصيلة... وافتكر إن النجاح في الميدان بيبدأ من وضوح الهدف ومتابعة الأرقام...`,
      caseStudy: {
        context: 'سياق مشكلة واقعية في الفرع...',
        action: 'الإجراء الإداري اللي هتاخده لحل المشكلة...',
        metric: 'الرقم أو النتيجة المحققة...',
      },
      deepDivePoints: [
        {
          heading: 'نقطة تركيز قيادية',
          explanation: 'توضيح مختصر بالعامية للمفهوم.',
          term: 'المصطلح الإداري',
        },
      ],
      interactiveCheck: {
        question: 'موقف تطبيقي لاختبار عقلية المدير في هذا المحور؟',
        options: [
          {
            text: 'التصرف التقليدي أو الانفعالي.',
            isManagerMindset: false,
            feedback: 'غير متوافق مع عقلية القيادة.',
          },
          {
            text: 'التصرف الإداري الاحترافي المبني على الداتا والمسؤولية.',
            isManagerMindset: true,
            feedback: 'ممتاز! هذا هو التصرف الصحيح.',
          },
        ],
      },
    };
    setEditingStepId(newId);
    setFormData(newStepTemplate);
    setIsAddingNew(true);
    setSaveMessage(null);
  };

  const handleSaveCurrent = () => {
    let updated: ManagerStep[];
    if (isAddingNew) {
      updated = [...steps, formData];
    } else {
      updated = steps.map((s) => (s.id === formData.id ? { ...formData } : s));
    }
    onSaveSteps(updated);
    setIsAddingNew(false);
    setSaveMessage('تم حفظ تعديلات المحور بنجاح! تم تطبيقها في كامل التطبيق.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleDeleteStep = (stepId: string) => {
    if (steps.length <= 1) {
      alert('يجب الإبقاء على محور واحد على الأقل في التطبيق.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذا المحور من التدريب؟')) {
      const updated = steps
        .filter((s) => s.id !== stepId)
        .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
      onSaveSteps(updated);
      if (updated.length > 0) {
        handleSelectStep(updated[0]);
      }
    }
  };

  const handleTestAudio = () => {
    const audioTitle = `تجربة صوت: ${formData.titleAr}`;
    if (isPlaying && currentAudioTitle === audioTitle) {
      onStopAudio();
    } else {
      onPlayAudio(formData.audioPromptText, audioTitle, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
            <Sliders className="h-3.5 w-3.5" />
            <span>محرر وتخصيص المحاور بالعامية المصرية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            تعديل المحاور والسيناريوهات الصوتية
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            تقدر هنا تعدل أي محور من المحاور السبعة، تعيد صياغة الكلام بالعامية المصرية الخاصة بشركتك أو تخصصك،
            تغير الوقفات التدريبية، وتجرب الاستماع فوراً بصوت الكوتش الذكي.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleStartAddNew}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة محور جديد</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('هل تريد استعادة المحاور الأصلية السبعة المعتمدة بالعامية المصرية؟')) {
                onResetSteps();
                setFormData(MANAGER_STEPS[0]);
                setEditingStepId(MANAGER_STEPS[0].id);
                setSaveMessage('تمت استعادة المحاور السبعة الأصلية بنجاح.');
                setTimeout(() => setSaveMessage(null), 3000);
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            title="استعادة المحاور الافتراضية الأصلية"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>استعادة الأصل</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs font-bold text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pillars Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>المحاور المتاحة ({steps.length})</span>
            <span className="text-[11px] text-amber-400">انقر للاختيار والتعديل</span>
          </div>

          <div className="space-y-2">
            {steps.map((step) => {
              const isSelected = editingStepId === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => handleSelectStep(step)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-md ring-1 ring-amber-500/40'
                      : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-amber-400 font-mono text-xs font-black">
                      0{step.stepNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {step.keywordEn}: {step.titleAr}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {step.mantraAr}
                      </div>
                    </div>
                  </div>

                  {steps.length > 1 && (
                    <button
                      type="button"
                      title="حذف المحور"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStep(step.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Pillar Form (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  {isAddingNew ? 'إضافة محور جديد' : `تعديل المحور 0${formData.stepNumber}`}
                </span>
                <h3 className="text-lg font-black text-white">
                  {formData.titleAr}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestAudio}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>
                    {isPlaying && currentAudioTitle === `تجربة صوت: ${formData.titleAr}`
                      ? 'إيقاف الصوت'
                      : 'تجربة نطق الكوتش'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveCurrent}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Save className="h-4 w-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    الكلمة الإنجليزية المفتاحية (Keyword EN)
                  </label>
                  <input
                    type="text"
                    value={formData.keywordEn}
                    onChange={(e) =>
                      setFormData({ ...formData, keywordEn: e.target.value })
                    }
                    placeholder="مثال: DATA أو PRIORITY"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    عنوان المحور بالعامية المصرية
                  </label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) =>
                      setFormData({ ...formData, titleAr: e.target.value })
                    }
                    placeholder="مثال: المشكلة والداتا (Data-driven)"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    سؤال المحور الرئيسي (Key Question بالعامية)
                  </label>
                  <input
                    type="text"
                    value={formData.keyQuestionAr}
                    onChange={(e) =>
                      setFormData({ ...formData, keyQuestionAr: e.target.value })
                    }
                    placeholder="مثال: إيه هي المشكلة بالضبط؟ والأرقام بتقول إيه؟"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    المانترا أو القاعدة الذهبية (Coach Mantra)
                  </label>
                  <input
                    type="text"
                    value={formData.mantraAr}
                    onChange={(e) =>
                      setFormData({ ...formData, mantraAr: e.target.value })
                    }
                    placeholder="مثال: مفيش داتا... مفيش قرار قوي."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Coach Audio Script with Deliberate Pauses */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>النص الصوتي للكوتش بالعامية المصرية (استخدم الوقفات ... للتأني)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    ضع (...) لإنشاء وقفة تأملية حاسمة
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={formData.audioPromptText}
                  onChange={(e) =>
                    setFormData({ ...formData, audioPromptText: e.target.value })
                  }
                  placeholder="اكتب توجيه الكوتش بالعامية المصرية الهادئة والواثقة..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Case Study Context & Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    موقف أو كيس ستادي واقعية
                  </label>
                  <input
                    type="text"
                    value={formData.caseStudy.context}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caseStudy: { ...formData.caseStudy, context: e.target.value },
                      })
                    }
                    placeholder="مثال: شكوى من تكدس المراجعين صباحاً..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    تصرف المدير الميداني المحترف
                  </label>
                  <input
                    type="text"
                    value={formData.caseStudy.action}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caseStudy: { ...formData.caseStudy, action: e.target.value },
                      })
                    }
                    placeholder="مثال: مراجعة شاشات الانتظار وعزل أسباب التأخير..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Reminder */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                أي تعديل هنا سينعكس فوراً في شريط المعادلة وقسم الدروس ومحاكي المقابلات.
              </span>
              <button
                type="button"
                onClick={handleSaveCurrent}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <Save className="h-4 w-4" />
                <span>حفظ التعديلات الآن</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
