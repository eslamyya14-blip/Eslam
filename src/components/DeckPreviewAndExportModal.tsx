import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Presentation,
  FileText,
  Sliders,
  Sparkles,
  Volume2,
  Building2,
  Globe,
  Layers,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Calendar,
  Eye,
  LayoutGrid,
} from 'lucide-react';
import {
  SolvedCaseResultData,
  DeckTemplateId,
  DeckLanguageMode,
  CaseSlideItem,
} from '../types';

interface DeckPreviewAndExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: SolvedCaseResultData;
  onPlayAudio?: (text: string, title?: string, voice?: string) => void;
  isPlaying?: boolean;
  currentAudioTitle?: string;
}

export const DeckPreviewAndExportModal: React.FC<DeckPreviewAndExportModalProps> = ({
  isOpen,
  onClose,
  caseData,
  onPlayAudio,
  isPlaying = false,
  currentAudioTitle = '',
}) => {
  // Presentation configuration state
  const [selectedTemplate, setSelectedTemplate] = useState<DeckTemplateId>('alfa_boardroom');
  const [languageMode, setLanguageMode] = useState<DeckLanguageMode>('bilingual');
  const [viewMode, setViewMode] = useState<'carousel' | 'all_slides'>('carousel');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Custom Header & Candidate Meta
  const [candidateName, setCandidateName] = useState<string>('إسلام - مرشح رئيس قسم العمليات والدعم التشغيلي');
  const [organization, setOrganization] = useState<string>('مجموعة ألفا الطبية (معامل ألفا ومراكز ألفا سكان)');
  const [targetCommittee, setTargetCommittee] = useState<string>('لجنة التقييم والمقابلة الشخصية - إسبانيا بلازا');
  const [isEditingMeta, setIsEditingMeta] = useState<boolean>(false);

  // Copy feedback state
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const slides = caseData.presentationDeck || [];
  const currentSlide: CaseSlideItem | undefined = slides[activeSlideIndex] || slides[0];

  // Keyboard navigation for carousel mode
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, slides.length, onClose]);

  if (!isOpen) return null;

  // Print handler: invokes browser native print dialog with our print-deck-container rules
  const handlePrint = () => {
    window.print();
  };

  // Standalone HTML Presentation Download
  const handleDownloadStandaloneHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${caseData.titleAr} - عرض تقديمي تنفيذي</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; background-color: #0b0f19; color: #f1f5f9; }
    .slide-card { page-break-after: always; break-after: page; }
  </style>
</head>
<body class="p-6 md:p-12">
  <header class="max-w-5xl mx-auto mb-10 pb-6 border-b border-slate-800 text-center">
    <span class="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-xs rounded-full border border-amber-500/30 mb-3">${organization}</span>
    <h1 class="text-3xl font-black text-white mb-2">${caseData.titleAr}</h1>
    <h2 class="text-lg font-mono text-slate-400 mb-4">${caseData.titleEn}</h2>
    <div class="flex items-center justify-center gap-6 text-xs text-slate-400">
      <span>المرشح: <strong>${candidateName}</strong></span>
      <span>•</span>
      <span>اللجنة: <strong>${targetCommittee}</strong></span>
      <span>•</span>
      <span>الاعتماد: <strong>7 شرائح تنفيذية (RACI & SLAs)</strong></span>
    </div>
  </header>

  <main class="max-w-5xl mx-auto space-y-8">
    ${slides
      .map(
        (s) => `
    <article class="slide-card bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">${s.pillarRef || 'OPERATIONAL PILLAR'}</span>
          <h3 class="text-2xl font-black text-white mt-1">${s.slideTitleAr}</h3>
          <p class="text-xs font-mono text-slate-400">${s.slideTitleEn}</p>
        </div>
        <span class="text-2xl font-black text-amber-400/60 font-mono">0${s.slideNumber} / 07</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider">نقاط العرض المعروضة (بالعربي):</h4>
          <ul class="space-y-2 text-sm text-slate-200">
            ${s.bulletPointsAr.map((pt) => `<li class="flex items-start gap-2"><span class="text-amber-400 font-bold">•</span><span>${pt}</span></li>`).join('')}
          </ul>
        </div>
        <div class="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3" dir="ltr">
          <h4 class="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Executive Presentation Points (English):</h4>
          <ul class="space-y-2 text-sm text-slate-300">
            ${s.bulletPointsEn.map((pt) => `<li class="flex items-start gap-2"><span class="text-amber-400 font-bold">•</span><span>${pt}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 p-5 rounded-2xl border border-amber-500/30">
        <div class="text-xs font-bold text-amber-400 mb-1">ما تقوله بلسانك أمام اللجنة (بالعامية المصرية الواثقة):</div>
        <p class="text-sm text-amber-100 italic leading-relaxed">"${s.candidateScriptAr}"</p>
      </div>
    </article>
    `
      )
      .join('\n')}
  </main>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `عرض_الكيس_ستادي_المعتمد_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Markdown / Text Export Handler
  const handleCopyMarkdownDeck = () => {
    let text = `# ${caseData.titleAr}\n`;
    text += `## ${caseData.titleEn}\n\n`;
    text += `* **المرشح:** ${candidateName}\n`;
    text += `* **المؤسسة:** ${organization}\n`;
    text += `* **اللجنة المستهدفة:** ${targetCommittee}\n\n`;
    text += `### الملخص التنفيذي للأزمة:\n${caseData.caseSummaryAr}\n\n`;
    text += `Executive Summary:\n${caseData.caseSummaryEn}\n\n`;
    text += `---\n\n`;

    slides.forEach((s) => {
      text += `## [الشريحة ${s.slideNumber}] ${s.slideTitleAr}\n`;
      text += `### ${s.slideTitleEn} (${s.pillarRef || 'Pillar'})\n\n`;
      text += `**نقاط العرض (العربية):**\n`;
      s.bulletPointsAr.forEach((pt) => {
        text += `- ${pt}\n`;
      });
      text += `\n**Executive Points (English):**\n`;
      s.bulletPointsEn.forEach((pt) => {
        text += `- ${pt}\n`;
      });
      text += `\n**ما تقوله أمام اللجنة (بالعامية المصرية):**\n> "${s.candidateScriptAr}"\n\n`;
      text += `---\n\n`;
    });

    text += `### معادلة الإغلاق الذهبية:\n"${caseData.cluster15CasesStrategy.goldenFormula}"\n`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Play audio of active slide's candidate script
  const handlePlayCurrentSlideAudio = (slide: CaseSlideItem) => {
    if (!onPlayAudio) return;
    const title = `سلايد ${slide.slideNumber}: ${slide.slideTitleAr}`;
    const speech = `${slide.slideTitleAr}. ${slide.candidateScriptAr}`;
    onPlayAudio(speech, title);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md overflow-hidden ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'
      }`}
      dir="rtl"
    >
      {/* Outer Card Container */}
      <div className="relative flex flex-col h-full w-full max-w-7xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Top Sticky Control Bar */}
        <header className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/90 px-4 sm:px-6 py-3.5 z-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Presentation className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  معاينة العرض التقديمي والتمبلت التنفيذي قبل التصدير
                </h2>
                <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  جاهز للبروجكتور والـ PDF
                </span>
              </div>
              <p className="text-xs text-slate-400">
                اختر التمبلت، عاين الشريحة ثنائية اللغة (عربي + إنجليزي)، واسمع سكريبت الإلقاء بالعامية المصرية قبل الطباعة
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'تصغير الشاشة' : 'تكبير ملء الشاشة'}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-rose-400 hover:bg-slate-700/80 transition-all cursor-pointer"
              title="إغلاق المعاينة"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Secondary Options Strip: Templates, Language, View & Export */}
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/90 px-4 sm:px-6 py-3 z-10 text-xs">
          {/* Template Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-slate-400 font-bold shrink-0">التمبلت المعتمد:</span>

            <button
              type="button"
              onClick={() => setSelectedTemplate('alfa_boardroom')}
              className={`rounded-xl px-3 py-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                selectedTemplate === 'alfa_boardroom'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🏛️ ألفا بورد رووم (Boardroom)
            </button>

            <button
              type="button"
              onClick={() => setSelectedTemplate('lean_six_sigma')}
              className={`rounded-xl px-3 py-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                selectedTemplate === 'lean_six_sigma'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🔬 لين سيكس سيجما (Lean RCA)
            </button>

            <button
              type="button"
              onClick={() => setSelectedTemplate('rapid_committee')}
              className={`rounded-xl px-3 py-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                selectedTemplate === 'rapid_committee'
                  ? 'bg-rose-500 text-white shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⚡ الـ 3 دقائق السريعة (Rapid Pitch)
            </button>

            <button
              type="button"
              onClick={() => setSelectedTemplate('official_memo')}
              className={`rounded-xl px-3 py-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                selectedTemplate === 'official_memo'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📑 المذكرة الرسمية (Official Memo)
            </button>
          </div>

          {/* Language Mode & Speaker Notes Toggles */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setLanguageMode('bilingual')}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  languageMode === 'bilingual'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 ثنائي (Bilingual)
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('arabic')}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  languageMode === 'arabic'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇪🇬 عربي فقط
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('english')}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  languageMode === 'english'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            {/* View Mode Toggle: Single Slide Carousel vs All Slides */}
            <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="عرض شريحة بشريحة للبروجكتور"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>بروجكتور</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all_slides')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  viewMode === 'all_slides'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="استعراض كل الـ 7 شرائح معاً"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>الكل (7)</span>
              </button>
            </div>

            {/* Speaker Notes Toggle */}
            <button
              type="button"
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`rounded-xl border px-3 py-1.5 font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showSpeakerNotes
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>سكريبت الإلقاء {showSpeakerNotes ? 'مفعّل' : 'مخفي'}</span>
            </button>
          </div>
        </div>

        {/* Metadata Bar & Customize Toggle */}
        <div className="shrink-0 flex items-center justify-between border-b border-slate-800/60 bg-slate-950/40 px-6 py-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>المرشح: <strong className="text-slate-200">{candidateName}</strong></span>
            <span>•</span>
            <span>المؤسسة: <strong className="text-slate-200">{organization}</strong></span>
            <span>•</span>
            <span>الهدف: <strong className="text-amber-300">{targetCommittee}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setIsEditingMeta(!isEditingMeta)}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline flex items-center gap-1"
          >
            <Sliders className="h-3 w-3" />
            <span>{isEditingMeta ? 'إغلاق التعديل' : 'تعديل البيانات الرسمية'}</span>
          </button>
        </div>

        {/* Optional Metadata Editor Drawer */}
        {isEditingMeta && (
          <div className="shrink-0 bg-slate-950 border-b border-slate-800 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">اسم المرشح والوظيفة:</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">اسم المؤسسة / الفروع:</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">اللجنة / المناسبة:</label>
              <input
                type="text"
                value={targetCommittee}
                onChange={(e) => setTargetCommittee(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Main Content Area (Scrollable or Full Deck) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {viewMode === 'carousel' && currentSlide ? (
            /* Carousel View: Active Slide Display */
            <div className="space-y-4">
              {/* Carousel Slide Navigator & Audio Cue */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {slides.map((s, idx) => (
                    <button
                      key={s.slideNumber}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === activeSlideIndex
                          ? 'w-8 bg-amber-500'
                          : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`شريحة ${s.slideNumber}`}
                    />
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-400 mr-2">
                    0{currentSlide.slideNumber} / 0{slides.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePlayCurrentSlideAudio(currentSlide)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>
                      {isPlaying && currentAudioTitle === `سلايد ${currentSlide.slideNumber}: ${currentSlide.slideTitleAr}`
                        ? 'إيقاف الصوت'
                        : 'استمع للشريحة بالعامية'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={activeSlideIndex <= 0}
                      onClick={() => setActiveSlideIndex((p) => Math.max(0, p - 1))}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="الشريحة السابقة"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={activeSlideIndex >= slides.length - 1}
                      onClick={() => setActiveSlideIndex((p) => Math.min(slides.length - 1, p + 1))}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="الشريحة التالية"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Rendered Template Card */}
              <SlideTemplateCard
                slide={currentSlide}
                templateId={selectedTemplate}
                languageMode={languageMode}
                showSpeakerNotes={showSpeakerNotes}
                candidateName={candidateName}
                organization={organization}
                onPlayAudio={() => handlePlayCurrentSlideAudio(currentSlide)}
              />
            </div>
          ) : (
            /* All Slides View: Continuous Deck for Review & Printing */
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center">
                <p className="text-xs font-bold text-amber-400">
                  معاينة كامل العرض التقديمي (7 شرائح متتالية) مجهزة للطباعة والتصدير
                </p>
                <p className="text-[11px] text-slate-400">
                  كل شريحة مصممة بحجم صفحة مستقلة مطابقة لتمبلت {selectedTemplate} المختار
                </p>
              </div>

              {slides.map((slide, idx) => (
                <div key={slide.slideNumber} className="relative">
                  <div className="absolute -top-3 right-4 rounded-full bg-slate-800 px-3 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-slate-700 z-10">
                    الشريحة {slide.slideNumber} من {slides.length}
                  </div>
                  <SlideTemplateCard
                    slide={slide}
                    templateId={selectedTemplate}
                    languageMode={languageMode}
                    showSpeakerNotes={showSpeakerNotes}
                    candidateName={candidateName}
                    organization={organization}
                    onPlayAudio={() => handlePlayCurrentSlideAudio(slide)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Export & Action Bar */}
        <footer className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/90 px-4 sm:px-6 py-4 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>عرض متوافق مع معايير لجان تقييم العمليات (Boardroom Standard)</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Copy Deck */}
            <button
              type="button"
              onClick={handleCopyMarkdownDeck}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title="نسخ محتوى الشرائح كـ Markdown"
            >
              {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{isCopied ? 'تم النسخ بنجاح!' : 'نسخ العرض منسقاً'}</span>
            </button>

            {/* Standalone HTML File */}
            <button
              type="button"
              onClick={handleDownloadStandaloneHTML}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm"
              title="تحميل كملف HTML مستقل يعمل دون إنترنت"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>تحميل ملف HTML للعرض</span>
            </button>

            {/* Native Browser Print / PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              title="طباعة العرض أو حفظه كملف PDF"
            >
              <Printer className="h-4 w-4 text-slate-950" />
              <span>طباعة / تصدير PDF مجهز</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Hidden Print Container for Clean Page Breaks */}
      <div className="hidden print-deck-container" dir="rtl">
        {slides.map((s) => (
          <div key={s.slideNumber} className="print-slide-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '8px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b' }}>{organization} — {s.pillarRef}</span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0' }}>{s.slideTitleAr}</h2>
                <h3 style={{ fontSize: '14px', fontFamily: 'monospace', color: '#475569' }}>{s.slideTitleEn}</h3>
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>0{s.slideNumber}/07</span>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{candidateName}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: languageMode === 'bilingual' ? '1fr 1fr' : '1fr', gap: '20px', marginBottom: '20px' }}>
              {(languageMode === 'bilingual' || languageMode === 'arabic') && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' }}>نقاط العرض التنفيذية (بالعربي):</h4>
                  <ul style={{ paddingRight: '16px', lineHeight: '1.8', fontSize: '13px' }}>
                    {s.bulletPointsAr.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(languageMode === 'bilingual' || languageMode === 'english') && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }} dir="ltr">
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' }}>Executive Presentation Points (English):</h4>
                  <ul style={{ paddingLeft: '16px', lineHeight: '1.8', fontSize: '13px', fontFamily: 'sans-serif' }}>
                    {s.bulletPointsEn.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {showSpeakerNotes && (
              <div style={{ background: '#fef3c7', padding: '14px', borderRadius: '8px', border: '1px solid #fde68a', marginTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px' }}>
                  ما تقوله بلسانك أمام اللجنة (بالعامية المصرية الواثقة):
                </div>
                <div style={{ fontSize: '12px', color: '#78350f', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{s.candidateScriptAr}"
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal Subcomponent: Template-Specific Visual Card
interface SlideTemplateCardProps {
  slide: CaseSlideItem;
  templateId: DeckTemplateId;
  languageMode: DeckLanguageMode;
  showSpeakerNotes: boolean;
  candidateName: string;
  organization: string;
  onPlayAudio?: () => void;
}

const SlideTemplateCard: React.FC<SlideTemplateCardProps> = ({
  slide,
  templateId,
  languageMode,
  showSpeakerNotes,
  candidateName,
  organization,
  onPlayAudio,
}) => {
  // 1. Alfa Executive Boardroom Theme
  if (templateId === 'alfa_boardroom') {
    return (
      <div className="rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Boardroom Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-500/40 uppercase">
                {organization}
              </span>
              {slide.pillarRef && (
                <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                  PILLAR: {slide.pillarRef}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {slide.slideTitleAr}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-amber-200/80">{slide.slideTitleEn}</p>
          </div>

          <div className="text-left font-mono">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">
              0{slide.slideNumber}
              <span className="text-base text-slate-600 font-normal">/07</span>
            </div>
            <div className="text-[10px] text-slate-400">{candidateName}</div>
          </div>
        </div>

        {/* Slide Content: Bilingual or Single */}
        <div className={`grid gap-6 ${languageMode === 'bilingual' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Arabic Column */}
          {(languageMode === 'bilingual' || languageMode === 'arabic') && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  نقاط العرض التنفيذية المعروضة على الشاشة:
                </span>
                <span className="text-[10px] font-mono text-slate-500">ARABIC</span>
              </div>
              <ul className="space-y-3">
                {slide.bulletPointsAr.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-100 leading-relaxed">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* English Column */}
          {(languageMode === 'bilingual' || languageMode === 'english') && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4" dir="ltr">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                  Executive Presentation Points (English):
                </span>
                <span className="text-[10px] font-mono text-slate-500">ENGLISH</span>
              </div>
              <ul className="space-y-3 font-sans">
                {slide.bulletPointsEn.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Speaker Notes Box (ما تقوله بلسانك أمام اللجنة) */}
        {showSpeakerNotes && (
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-950 p-5 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  ما تقوله بلسانك أمام اللجنة (Candidate Speech Cue):
                </span>
                <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                  بالعامية المصرية الواثقة
                </span>
              </div>

              {onPlayAudio && (
                <button
                  type="button"
                  onClick={onPlayAudio}
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>استمع</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-amber-100 font-normal leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-amber-500/20">
              "{slide.candidateScriptAr}"
            </p>
          </div>
        )}
      </div>
    );
  }

  // 2. Lean Six Sigma Theme (Clean White/Navy Process Driven)
  if (templateId === 'lean_six_sigma') {
    return (
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                LEAN OPERATIONS & RCA
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                {slide.pillarRef || 'PROCESS GATE'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
              {slide.slideTitleAr}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyan-300/80">{slide.slideTitleEn}</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-center font-mono">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">STEP 0{slide.slideNumber}</div>
            <div className="text-[10px] text-cyan-200">DMAIC / CAPA GATE</div>
          </div>
        </div>

        {/* Content Box */}
        <div className={`grid gap-6 ${languageMode === 'bilingual' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {(languageMode === 'bilingual' || languageMode === 'arabic') && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                معايير ومحددات القياس (Metrics & SLA):
              </div>
              <ul className="space-y-2.5">
                {slide.bulletPointsAr.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(languageMode === 'bilingual' || languageMode === 'english') && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3" dir="ltr">
              <div className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wider">
                Operational Metrics & Root Cause Targets:
              </div>
              <ul className="space-y-2.5 font-sans">
                {slide.bulletPointsEn.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Speaker Cue */}
        {showSpeakerNotes && (
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-2">
            <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
              <span>ما تقوله أمام اللجنة بلغة المهندس العملياتي (بالعامية المصرية):</span>
              {onPlayAudio && (
                <button
                  type="button"
                  onClick={onPlayAudio}
                  className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  استمع للصوت
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-cyan-900/40">
              "{slide.candidateScriptAr}"
            </p>
          </div>
        )}
      </div>
    );
  }

  // 3. Rapid Committee Pitch (High Impact, Bold Typography)
  if (templateId === 'rapid_committee') {
    return (
      <div className="rounded-3xl border-2 border-rose-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
          <span className="rounded-full bg-rose-500/20 px-3 py-1 font-mono text-xs font-bold text-rose-300 border border-rose-500/40">
            RAPID COMMITTEE PITCH — 3 MINUTES
          </span>
          <span className="font-mono text-2xl font-black text-rose-400">#0{slide.slideNumber}</span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            {slide.slideTitleAr}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">{slide.slideTitleEn}</p>
        </div>

        <div className={`grid gap-4 ${languageMode === 'bilingual' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {(languageMode === 'bilingual' || languageMode === 'arabic') && (
            <div className="space-y-2.5">
              {slide.bulletPointsAr.map((pt, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 text-xs sm:text-sm text-slate-100 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">»</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}

          {(languageMode === 'bilingual' || languageMode === 'english') && (
            <div className="space-y-2.5" dir="ltr">
              {slide.bulletPointsEn.map((pt, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">»</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showSpeakerNotes && (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-950/30 p-5 space-y-2">
            <div className="text-xs font-black text-rose-300 uppercase">
              الجملة الحاسمة بلسانك أمام د. شريف وأ. رانيا (بالعامية المصرية):
            </div>
            <p className="text-sm sm:text-base text-rose-100 font-semibold leading-relaxed">
              "{slide.candidateScriptAr}"
            </p>
          </div>
        )}
      </div>
    );
  }

  // 4. Official Memo Theme (Formal Document Style)
  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Formal Memo Top Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4 text-xs">
        <div>
          <span className="font-bold text-emerald-400">مذكرة عرض تشغيلية رسمية</span>
          <span className="text-slate-400 mr-2">| وثيقة سرية مخصصة للجنة التقييم القيادي</span>
        </div>
        <div className="font-mono text-slate-400">REF: AMG-OPS-SLIDE-0{slide.slideNumber}</div>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white">{slide.slideTitleAr}</h3>
        <p className="text-xs font-mono text-emerald-300">{slide.slideTitleEn}</p>
      </div>

      <div className={`grid gap-5 ${languageMode === 'bilingual' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {(languageMode === 'bilingual' || languageMode === 'arabic') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="text-xs font-bold text-slate-300">بنود القرار والتنفيذ المعتمد:</div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {slide.bulletPointsAr.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">[{i + 1}]</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(languageMode === 'bilingual' || languageMode === 'english') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2" dir="ltr">
            <div className="text-xs font-bold text-slate-300 font-mono">Executive Governance Clauses:</div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
              {slide.bulletPointsEn.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">[{i + 1}]</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showSpeakerNotes && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2">
          <div className="text-xs font-bold text-emerald-400">بيان المرشح الشفهي (بالعامية المصرية):</div>
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            "{slide.candidateScriptAr}"
          </p>
        </div>
      )}
    </div>
  );
};
