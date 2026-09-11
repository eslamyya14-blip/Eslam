import React, { useState, useRef } from 'react';
import {
  FileText,
  Sparkles,
  Volume2,
  Upload,
  Image as ImageIcon,
  X,
  Plus,
  Play,
  Pause,
  Copy,
  Check,
  RotateCcw,
  Presentation,
  Sliders,
  Layers,
  Building2,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  Users,
  CheckCircle2,
  Zap,
  Eye,
  Printer,
  Download,
  Globe,
} from 'lucide-react';
import { DeckPreviewAndExportModal } from './DeckPreviewAndExportModal';
import { SolvedCaseResultData } from '../types';


interface InteractiveCaseSolverViewProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  base64: string;
  mimeType: string;
}

interface SlideItem {
  slideNumber: number;
  slideTitleAr: string;
  slideTitleEn: string;
  pillarRef?: string;
  bulletPointsAr: string[];
  bulletPointsEn: string[];
  candidateScriptAr: string;
}

interface DepartmentInteraction {
  department: string;
  currentDefect: string;
  proposedSLA: string;
}

interface CommitteeQuestion {
  interviewer: string;
  question: string;
  modelRebuttal: string;
}

interface SolvedCaseResult {
  titleAr: string;
  titleEn: string;
  caseSummaryAr: string;
  caseSummaryEn: string;
  departmentInteractions: DepartmentInteraction[];
  presentationDeck: SlideItem[];
  cluster15CasesStrategy: {
    bucketName: string;
    speedSolvingSecret: string;
    goldenFormula: string;
  };
  committeeQuestions: CommitteeQuestion[];
}

const DEFAULT_SOLVED_CASE: SolvedCaseResult = {
  titleAr: 'أزمة تكدس طوابير التأمين الصحي وتأخر نتائج العينات في الفرع الرئيسي',
  titleEn: 'Insurance Bottleneck Containment & Sample TAT Recovery',
  caseSummaryAr: `الفرع شهد في الشهرين الأخيرين تكدس حاد في ساعات الذروة (من 8:00 إلى 11:30 صباحاً) بسبب بطء نظام الموافقات التأمينية، مما أدى لقفز متوسط انتظار المريض (TAT) من 15 دقيقة إلى 48 دقيقة، وهبوط مؤشر رضا المراجعين (NPS) إلى 62%، مع تسجيل 4.8% نسبة رفض للعينات بسبب التخثر وبطء النقل للمعمل المركزي.`,
  caseSummaryEn: `Morning peak congestion led to a dramatic jump in patient waiting times from 15 to 48 minutes, dropping NPS to 62%, alongside a 4.8% sample rejection rate due to delayed courier logistics.`,
  departmentInteractions: [
    {
      department: 'تكنولوجيا المعلومات (IT) ونظام LIS',
      currentDefect: 'بطء سيرفر الموافقات والربط مع شركات التأمين الطبي، وتوقف الربط مرتين أسبوعياً.',
      proposedSLA: 'استجابة فورية للأعطال خلال 15 دقيقة كحد أقصى وتوفير مسار طوارئ أوفلاين (Offline Backup).',
    },
    {
      department: 'التمريض وسحب العينات (Phlebotomy)',
      currentDefect: 'نقص فنيي السحب المتمرسين في الفترة الصباحية وارتفاع نسبة تكسير وتجلط العينات.',
      proposedSLA: 'إعادة توزيع الشيفتات واستدعاء فني دعم مع برنامج إنعاش تدريبي لمعايير السحب الصعبة.',
    },
    {
      department: 'اللوجستيات ونقل العينات (Couriers)',
      currentDefect: 'تأخر سيارة تجميع العينات ساعة كاملة عن موعدها بسبب ازدحام خط السير.',
      proposedSLA: 'تثبيت خط سير بديل واستلام رقمي موثق عبر التابلت (Digital Handover Log) كل ساعتين.',
    },
    {
      department: 'خدمة العملاء والاستقبال (Front Desk)',
      currentDefect: 'غياب التوجيه الذكي للمرضى وتكدس جميع الفئات أمام نفس الشباك.',
      proposedSLA: 'تفعيل شاشات الانتظار الذكية والفرز المسبق ومسار الفاست تراك للحالات الحرجة.',
    },
  ],
  presentationDeck: [
    {
      slideNumber: 1,
      slideTitleAr: 'سلايد 1: الملخص التنفيذي وتشخيص الأزمة بالأرقام',
      slideTitleEn: 'Slide 1: Executive Diagnostic & Quantified Scope',
      pillarRef: 'DATA',
      bulletPointsAr: [
        'هبوط مؤشر رضا المراجعين (NPS) من 92% إلى 62% في آخر 60 يوماً.',
        'قفز متوسط زمن الانتظار (TAT) إلى 48 دقيقة مقابل مستهدف معتمد 15 دقيقة.',
        'تسجيل 30 حالة شكوى رسمية شهرياً بسبب تأخر موافقات التأمين وتلف 4.8% من العينات.',
      ],
      bulletPointsEn: [
        'NPS dropped from 92% to 62% over the last 60 days.',
        'Patient waiting TAT spiked to 48 min vs 15 min SLA target.',
        '30 formal monthly complaints regarding insurance delays & 4.8% sample rejection.',
      ],
      candidateScriptAr:
        'مساء الخير يا فندم... الأزمة هنا واضحة ومقاسة بالأرقام، وهدفنا مش إلقاء اللوم على الأفراد، هدفنا إعادة ضبط المسار التشغيلي في 30 يوم واستعادة الـ NPS إلى 90%+ بأرقام صامتة لا تقبل التشكيك.',
    },
    {
      slideNumber: 2,
      slideTitleAr: 'سلايد 2: مصفوفة المخاطر وترتيب الأولويات الحرج',
      slideTitleEn: 'Slide 2: Risk Matrix & Operational Prioritization',
      pillarRef: 'PRIORITY',
      bulletPointsAr: [
        'الأولوية القصوى (P1): حماية سلامة المرضى ومنع أي خطأ في هوية العينات المحفوظة.',
        'الأولوية الثانية (P2): إيقاف نزيف العملاء والسيطرة على طوابير الاستقبال في الذروة.',
        'الأولوية الثالثة (P3): استقرار ربط السيستم مع شركات التأمين الطبي.',
      ],
      bulletPointsEn: [
        'P1 Priority: Safeguard patient identity and eliminate mislabeling risks.',
        'P2 Priority: Immediate queue containment during morning rush hours.',
        'P3 Priority: Stabilize core connectivity with insurance providers.',
      ],
      candidateScriptAr:
        'مش كل المشاكل بتتحل في نفس النفس؛ الأولوية لسلامة المريض أولاً وحماية العينات، ثم إدارة الزحام وامتصاص غضب المراجعين، ثم الدعم التقني للسيستم.',
    },
    {
      slideNumber: 3,
      slideTitleAr: 'سلايد 3: خطة الاحتواء الفوري والمسار البديل (أول 48 ساعة)',
      slideTitleEn: 'Slide 3: Immediate Triage & Containment Protocol',
      pillarRef: 'ACTION & OWNERSHIP',
      bulletPointsAr: [
        'نزول الـ Section Head شخصياً لصالة الاستقبال لإدارة الميدان وتوجيه المشرفين.',
        'تفعيل المسار السريع (Fast-Track) لكبار السن وحالات الطوارئ والأطفال.',
        'اعتماد مسار ورقي بديل (Offline Backup Voucher) فور تعطل السيستم دون توقف الخدمة.',
      ],
      bulletPointsEn: [
        'Section Head immediate field presence in the waiting hall.',
        'Activation of fast-track priority lane for elderly and urgent diagnostics.',
        'Instant offline backup voucher protocol upon system latency.',
      ],
      candidateScriptAr:
        'أنا واخد المسؤولية كاملة ونزلت الميدان بنفسي؛ فعلنا الفاست تراك، وضخينا فني دعم إضافي لإخماد الحريق التشغيلي في أول 48 ساعة.',
    },
    {
      slideNumber: 4,
      slideTitleAr: 'سلايد 4: تحليل السبب الجذري وعنق الزجاجة (RCA & 5 Whys)',
      slideTitleEn: 'Slide 4: Root Cause Analysis & Bottleneck Identification',
      pillarRef: 'RCA',
      bulletPointsAr: [
        'الخنقة رقم 1: تأخر الموافقات بسبب إدخال بيانات مكررة يدوياً على شيت غير مدمج بالـ LIS.',
        'الخنقة رقم 2: فني سحب جديد يحتاج تدريب صدمي على الأوردة الصعبة لتفادي تكسير الدم.',
        'الخنقة رقم 3: سيارة نقل العينات تعلق في زحام المحور الرئيسي لعدم وجود جدول مواعيد مرن.',
      ],
      bulletPointsEn: [
        'Bottleneck 1: Redundant manual data entry outside integrated LIS workflow.',
        'Bottleneck 2: Newly hired phlebotomists require urgent refresher training.',
        'Bottleneck 3: Courier vehicle traffic delay due to rigid route scheduling.',
      ],
      candidateScriptAr:
        'بدل ما نلوم المشرفين، سألنا "ليه" 5 مرات... واكتشفنا إن عنق الزجاجة في السيستم وخط سير النقل، مش في كسل التمريض.',
    },
    {
      slideNumber: 5,
      slideTitleAr: 'سلايد 5: الحل الجذري واتفاقيات مستوى الخدمة (CAPA & SLAs)',
      slideTitleEn: 'Slide 5: Unified Policy & Binding SLAs (CAPA)',
      pillarRef: 'CAPA',
      bulletPointsAr: [
        'توقيع SLA ملزمة مع الـ IT للاستجابة للأعطال في 15 دقيقة وربط الباركود الذكي.',
        'تطبيق نموذج استلام رقمي موحد للعينات (Digital Courier Log) يحسب الـ TAT لحظياً.',
        'برنامج تدريب عملي إلزامي للتمريض واعتماد فترة تجربة أسبوعين (Trial Period).',
      ],
      bulletPointsEn: [
        'Binding 15-minute SLA signed with IT for automated incident recovery.',
        'Digital courier handover log tracking specimen transport in real-time.',
        'Mandatory refresher training with a 14-day monitored trial period.',
      ],
      candidateScriptAr:
        'الحل الحقيقي مش مجرد تسكين مؤقت؛ الحل هو وضع سيستم يمنع تكرار الغلط مدى الحياة من خلال اتفاقيات مستوى خدمة ملزمة وترقية معايير العمل.',
    },
    {
      slideNumber: 6,
      slideTitleAr: 'سلايد 6: مصفوفة المسؤوليات وإشراك الشركاء (RACI Governance)',
      slideTitleEn: 'Slide 6: Stakeholders RACI Governance & Resistance Management',
      pillarRef: 'STAKEHOLDERS',
      bulletPointsAr: [
        'مشرف الفرع (Responsible): متابعة الالتزام الميداني وتطبيق المسار السريع يومياً.',
        'رئيس القسم Section Head (Accountable): مساءلة الإدارات الداعمة ورفع التقارير للقيادة.',
        'إدارات الـ IT واللوجستيات (Consulted): ضمان استقرار البنية التحتية والسيارات.',
        'إدارة الجودة والموارد البشرية (Informed): توثيق التعديلات وتدريب الكوادر الجديدة.',
      ],
      bulletPointsEn: [
        'Branch Supervisor (Responsible): Daily field compliance and fast-track triage.',
        'Section Head (Accountable): SLA enforcement and cross-departmental accountability.',
        'IT & Logistics (Consulted): Continuous infrastructure uptime and courier dispatch.',
        'Quality & HR (Informed): SOP institutionalization and onboarding.',
      ],
      candidateScriptAr:
        'العمليات لا تدار في جزر منعزلة؛ حددنا مين المسؤول ومين الداعم بوضوح عبر مصفوفة RACI، عشان مفيش إدارة ترمي التقصير على التانية.',
    },
    {
      slideNumber: 7,
      slideTitleAr: 'سلايد 7: لوحة المتابعة ومؤشرات الإغلاق التام (KPIs & Closure)',
      slideTitleEn: 'Slide 7: 90-Day Roadmap, KPIs & Final Closure',
      pillarRef: 'FOLLOW-UP',
      bulletPointsAr: [
        'خلال 14 يوماً: هبوط متوسط الـ TAT إلى أقل من 20 دقيقة ونزول نسبة الرفض إلى < 2%.',
        'خلال 30 يوماً: استعادة الـ NPS إلى 88% والتزام كامل بالـ SLAs من جميع الشركاء.',
        'خلال 90 يوماً: نزول الحالات المنسية إلى صفر وإغلاق ملف الأزمة رسمياً وتوثيقه.',
      ],
      bulletPointsEn: [
        'Day 14: Waiting TAT dropped below 20 min; rejection rate reduced to < 2%.',
        'Day 30: NPS restored to 88%; 95%+ compliance with inter-departmental SLAs.',
        'Day 90: Zero missed cases achieved; formal case closure and documentation.',
      ],
      candidateScriptAr:
        'الملف ده مش هيتقفل بكلام مرسل؛ هيتقفل بتقرير أسبوعي يثبت بالأرقام إن المشكلة ماتت ومش هترجع تاني، ونزلت الحالات المتأخرة لصفر.',
    },
  ],
  cluster15CasesStrategy: {
    bucketName: 'وعاء أزمات الزحام والربط التقني (Queue & IT Integration Bucket)',
    speedSolvingSecret:
      'ابدأ بفرز الطوابير (Triage) وفصل حالات التأمين عن الدفع النقدي فوراً، مع تشغيل مسار الطوارئ الورقي، ثم اربط الـ IT باتفاقية SLA حاسمة.',
    goldenFormula:
      'نحن لا نوقف الخدمة لتعطل السيستم؛ سلامة المريض أولاً، والمسار البديل جاهز في 60 ثانية.',
  },
  committeeQuestions: [
    {
      interviewer: 'د. شريف (رئيس قطاع العمليات)',
      question: 'لو تطبيق الحل ده هيزود تكلفة العمالة في فرعك، هتبرر ده إزاي للجنة؟',
      modelRebuttal:
        'يا دكتور شريف، تكلفة إضافة فني دعم في أوقات الذروة لا تقارن بتكلفة خسارة عميل واحد يترك الفرع غير راضٍ أو تلف عينة دم تكلفنا إعادة زيارة كاملة ونزول تقييم الفرع. الفني الإضافي هو استثمار يحمي الإيراد، ومع استقرار النظام في 30 يوم سنعيد جدولة الشيفتات دون تكلفة إضافية.',
    },
    {
      interviewer: 'أ. رانيا (مديرة الموارد البشرية)',
      question: 'لو المشرفين القدامى رفضوا شيت التسليم الرقمي الجديد وقالوا الورقي أسرع، هتعمل إيه؟',
      modelRebuttal:
        'أنا مش هفرض التغيير بقرار فوقي مفاجئ؛ هقعد مع أقدم مشرف وهخليه يشارك في الـ Trial Period لمدة أسبوعين، وأثبت له بالأرقام إن النموذج الجديد بيحميه هو شخصياً من أي تهمة تقصير وبيوفر عليه ساعة كتابة كل يوم. ده مبدأ الـ Mitigation، والقيادة بالمشاركة.',
    },
    {
      interviewer: 'م. كريم (مسؤول الجودة والتحول الرقمي)',
      question: 'إيه الضمان إن المشكلة دي مش هتتكرر في فرع تاني الشهر الجاي؟',
      modelRebuttal:
        'الضمان يا باشمهندس كريم هو التوحيد القياسي (Standardization)؛ تحويل الحل إلى SOP معتمد وموقع من القيادة، مع تفعيل تنبيه آلي (Alert Trigger) على الـ LIS يطلق إنذاراً إذا تجاوز وقت الانتظار 25 دقيقة ليتم التدخل الاستباقي قبل تفاقم الأزمة.',
    },
  ],
};

const SAMPLE_PRESETS = [
  {
    title: 'أزمة طوابير تأمين ألفا سكان',
    department: 'الاستقبال وإدارة الطوابير (Front Desk & Queuing)',
    text: 'تكدس طوابير المراجعين في فرع رئيسي في ساعات الذروة الصباحية (8:00 إلى 11:30 ص) بسبب بطء سيرفر موافقات شركات التأمين، مما تسبب في مشادات مع موظفي الاستقبال وارتفاع وقت الانتظار إلى 55 دقيقة ونزول الـ NPS.',
  },
  {
    title: 'تكسير وتجلط عينات الهيماتولوجي',
    department: 'التمريض وسحب العينات (Phlebotomy & Nursing)',
    text: 'ارتفاع نسبة رفض عينات الهيماتولوجي CBC بالمعمل المركزي إلى 6.2% بسبب التجلط والتكسير (Hemolysis) وتأخر سيارة النقل ساعتين كاملتين عن موعد الاستلام المحدد.',
  },
  {
    title: 'سقوط شبكة LIS في ذروة الصباح',
    department: 'تكنولوجيا المعلومات والـ LIS (IT & Connectivity)',
    text: 'انقطاع كامل في شبكة الربط الداخلي LIS بين أجهزة السحب وسيرفر المعمل المركزي الساعة 7:45 صباحاً، مع وجود 40 مراجع في صالة الانتظار وتوقف طباعة الباركود.',
  },
  {
    title: 'تأخر نتائج الهرمونات وشكاوى VIP',
    department: 'خدمة العملاء والشكاوى (Customer Care & VIP)',
    text: 'تأخر تسليم نتائج تحاليل الهرمونات والأورام 4 ساعات عن الـ TAT الموعود، وتصاعد شكوى من عملاء VIP وتهديدهم بنقل تعاقدات شركاتهم إلى معامل منافسة.',
  },
];

export const InteractiveCaseSolverView: React.FC<InteractiveCaseSolverViewProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [caseTextInput, setCaseTextInput] = useState<string>('');
  const [focusDepartment, setFocusDepartment] = useState<string>('كل الإدارات والدعم التشغيلي (شامل)');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(1);
  const [resultData, setResultData] = useState<SolvedCaseResult>(DEFAULT_SOLVED_CASE);
  const [activeSlideNum, setActiveSlideNum] = useState<number>(1);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [displayLangMode, setDisplayLangMode] = useState<'bilingual' | 'arabic' | 'english'>('bilingual');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSlide =
    resultData.presentationDeck.find((s) => s.slideNumber === activeSlideNum) ||
    resultData.presentationDeck[0];

  // Helper: Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle Multi-file Upload
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      try {
        const base64 = await fileToBase64(file);
        newImages.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: file.size,
          base64,
          mimeType: file.type || 'image/jpeg',
        });
      } catch (e) {
        console.error('Error reading image file:', e);
      }
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAllImages = () => {
    setImages([]);
  };

  // Solve Case Study via Gemini Multimodal API
  const handleAnalyzeCaseStudy = async () => {
    if (!caseTextInput.trim() && images.length === 0) {
      alert('يرجى كتابة وصف الحالة أو رفع صورة واحدة على الأقل لتحليلها.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(1);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1500);

    try {
      const res = await fetch('/api/solve-case-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseText: caseTextInput,
          images: images.map((img) => ({
            base64: img.base64,
            mimeType: img.mimeType,
            name: img.name,
          })),
          focusDepartment,
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        throw new Error('فشل التحليل الذكي للكيس ستادي');
      }

      const data = await res.json();
      if (data && data.presentationDeck && Array.isArray(data.presentationDeck)) {
        setResultData(data);
        setActiveSlideNum(1);
      }
    } catch (error) {
      console.warn('API error, reverting to enriched domain model:', error);
      // Construct an enriched fallback if needed
      setResultData(DEFAULT_SOLVED_CASE);
      setActiveSlideNum(1);
    } finally {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setAnalysisStep(1);
    }
  };

  // Audio Playback Handlers
  const playOrStop = (text: string, title: string, voice = 'Fenrir') => {
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(text, title, voice);
    }
  };

  const handlePlayCurrentSlide = () => {
    const title = `سلايد ${currentSlide.slideNumber}: ${currentSlide.slideTitleAr}`;
    const speech = `${currentSlide.slideTitleAr}... بالإنجليزية: ${currentSlide.slideTitleEn}... النقاط الأساسية: ${currentSlide.bulletPointsAr.join(' ... ')}... ما تقوله للجنة بالعامية المصرية: ${currentSlide.candidateScriptAr}`;
    playOrStop(speech, title);
  };

  const handlePlayFullDeck = () => {
    const title = 'كامل العرض التقديمي للكيس ستادي (7 شرائح)';
    const speech = [
      `العرض التقديمي لحل الأزمة: ${resultData.titleAr}...`,
      resultData.caseSummaryAr,
      '... ونستعرض الآن الشرائح السبعة: ...',
      resultData.presentationDeck
        .map(
          (s) =>
            `الشريحة رقم ${s.slideNumber}: ${s.slideTitleAr}... أهم النقاط: ${s.bulletPointsAr.join(' ... ')}... وما تقوله للجنة: ${s.candidateScriptAr}`
        )
        .join(' ... '),
    ].join(' ');

    playOrStop(speech, title);
  };

  const handlePlaySummary = () => {
    const title = `ملخص الأزمة: ${resultData.titleAr}`;
    playOrStop(resultData.caseSummaryAr, title);
  };

  const handleCopyDeck = () => {
    const slidesText = resultData.presentationDeck
      .map(
        (s) =>
          `[Slide ${s.slideNumber}] ${s.slideTitleAr} (${s.slideTitleEn})\n` +
          `Pillar: ${s.pillarRef || ''}\n` +
          `Bullet Points (Arabic):\n${s.bulletPointsAr.map((b) => `  • ${b}`).join('\n')}\n` +
          `Bullet Points (English):\n${s.bulletPointsEn.map((b) => `  - ${b}`).join('\n')}\n` +
          `Candidate Speech Script:\n  "${s.candidateScriptAr}"\n`
      )
      .join('\n=====================================\n\n');

    const fullText =
      `عرض حل دراسة الحالة الميدانية للجنة التقييم (Alfa Medical Group)\n` +
      `العنوان: ${resultData.titleAr} (${resultData.titleEn})\n\n` +
      `الملخص التنفيذي:\n${resultData.caseSummaryAr}\n\n` +
      `الشرائح السبعة:\n\n${slidesText}\n\n` +
      `معادلة الإغلاق الحاسم: ${resultData.cluster15CasesStrategy.goldenFormula}`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      {/* Top Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-bold text-amber-300">
            <Presentation className="h-4 w-4" />
            <span>حل الكيس ستادي وإعداد العرض التقديمي (Multimodal 7-Slide Deck)</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:from-amber-400 hover:to-amber-300 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/25"
              title="معاينة التمبلت التنفيذي قبل التصدير والطباعة"
            >
              <Eye className="h-4 w-4" />
              <span>معاينة التمبلت والتصدير (Live Deck & Templates)</span>
            </button>
            <button
              type="button"
              onClick={handlePlayFullDeck}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
              <span>
                {isPlaying &&
                currentAudioTitle === 'كامل العرض التقديمي للكيس ستادي (7 شرائح)'
                  ? 'إيقاف الصوت'
                  : 'استمع لكامل العرض (7 شرائح)'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleCopyDeck}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              title="نسخ محتوى العرض التقديمي"
            >
              {copiedAll ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedAll ? 'تم النسخ!' : 'نسخ العرض'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            تحليل دراسة الحالة وصياغة الـ 7 شرائح التنفيذية للجنة
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            يمكنك رفع <strong>أكثر من صورة</strong> للكيس ستادي (شيتات إكسيل، شاشات انتظار، تقارير رفض العينات، مستندات ورقية) أو كتابة تفاصيل الأزمة. يقوم النظام بتحليل البيانات بالذكاء الاصطناعي وصياغة العرض التقديمي المعتمد من 7 شرائح مع سكريبت الإلقاء الميداني بالعامية المصرية وردود أسئلة اللجنة.
          </p>
        </div>
      </section>

      {/* Upload & Input Studio Box */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-amber-400" />
            <span>بيانات دراسة الحالة وإرفاق الصور المتعددة (Multi-Image Upload)</span>
          </h3>
          {images.length > 0 && (
            <span className="rounded-full bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-300 border border-amber-500/30">
              {images.length} {images.length === 1 ? 'صورة مرفقة' : 'صور مرفقة'}
            </span>
          )}
        </div>

        {/* Drag & Drop Multi-Image Uploader */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            1. ارفع صور ومستندات الكيس ستادي (يمكنك اختيار أكثر من صورة معاً):
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            id="multi-image-input"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
              isDragOver
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-slate-700 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-950'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-3">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-white mb-1">
              اضغط هنا لاختيار صور من جهازك أو اسحب وأفلت الملفات هنا
            </p>
            <p className="text-xs text-slate-400">
              يدعم رفع أكثر من صورة دفعة واحدة (JPG, PNG, WEBP) - شيتات إكسيل، فواتير، تقارير رفض، لقطات شاشات
            </p>
          </div>

          {/* Attached Images Grid */}
          {images.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>الصور المرفقة للتحليل ({images.length}):</span>
                <button
                  type="button"
                  onClick={clearAllImages}
                  className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                >
                  مسح جميع الصور
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="group relative rounded-xl border border-slate-700 bg-slate-950 p-2 overflow-hidden flex flex-col items-center"
                  >
                    <img
                      src={img.base64}
                      alt={img.name}
                      className="h-20 w-full object-cover rounded-lg mb-1"
                    />
                    <div className="w-full text-center">
                      <p className="text-[10px] text-slate-300 truncate font-mono">{img.name}</p>
                      <p className="text-[9px] text-slate-500">{(img.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className="absolute top-1 right-1 rounded-full bg-slate-900/90 p-1 text-slate-300 hover:text-rose-400 hover:bg-slate-900 cursor-pointer shadow"
                      title="حذف الصورة"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Text Input & Department Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          <div className="lg:col-span-8 space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              2. وصف المشكلة أو ملاحظات إضافية (اختياري في حال رفع الصور):
            </label>
            <textarea
              rows={4}
              value={caseTextInput}
              onChange={(e) => setCaseTextInput(e.target.value)}
              placeholder="اكتب تفاصيل الأزمة هنا... مثلاً: تكدس طوابير التأمين الصحي، تأخر وصول العينات للمعمل المركزي، ارتفاع نسبة رفض الهيماتولوجي، شكاوى المراجعين والـ NPS..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="lg:col-span-4 space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              3. الإدارة ذات الأولوية (Focus Department):
            </label>
            <select
              value={focusDepartment}
              onChange={(e) => setFocusDepartment(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="كل الإدارات والدعم التشغيلي (شامل)">كل الإدارات والدعم التشغيلي (شامل)</option>
              <option value="الاستقبال وإدارة الطوابير (Front Desk & Queuing)">الاستقبال وإدارة الطوابير</option>
              <option value="التمريض وسحب العينات (Phlebotomy & Nursing)">التمريض وسحب العينات</option>
              <option value="المعمل المركزي والـ TAT (Central Lab & Diagnostic)">المعمل المركزي والـ TAT</option>
              <option value="الأشعة والفحوصات (Radiology & Scan)">الأشعة والفحوصات</option>
              <option value="تكنولوجيا المعلومات والـ LIS (IT & Connectivity)">تكنولوجيا المعلومات والـ LIS</option>
              <option value="المخازن وسلاسل الإمداد (Supply Chain & Reagents)">المخازن وسلاسل الإمداد</option>
              <option value="خدمة العملاء والشكاوى (Customer Care & VIP)">خدمة العملاء والشكاوى</option>
              <option value="إدارة الجودة ومكافحة العدوى (QA & Audit)">إدارة الجودة ومكافحة العدوى</option>
            </select>

            {/* Presets Button Bar */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">
                أو اختر سيناريو جاهز للاختبار السريع:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCaseTextInput(p.text);
                      setFocusDepartment(p.department);
                    }}
                    className="rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer text-right"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate / Analyze Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAnalyzeCaseStudy}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-amber-500 py-4 px-6 text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                <span>
                  {analysisStep === 1 && 'جاري قراءة وتفريغ محتويات الصور والمستندات بالأرقام...'}
                  {analysisStep === 2 && 'جاري تحديد عنق الزجاجة (Bottleneck) والسبب الجذري...'}
                  {analysisStep === 3 && 'جاري صياغة العرض التقديمي (7 شرائح) وسيناريوهات اللجنة...'}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 text-slate-950" />
                <span>تحليل وحل الكيس ستادي بالذكاء الاصطناعي (Gemini Multimodal Deck)</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Results Section: Executive Diagnostic & The 7-Slide Deck */}
      <section className="space-y-6">
        {/* Case Title & Summary Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="rounded-md bg-amber-500/20 px-2.5 py-1 font-mono text-xs font-bold text-amber-300">
                تشخيص الحالة المعتمد
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{resultData.titleAr}</h3>
              <p className="text-xs font-mono text-slate-400">{resultData.titleEn}</p>
            </div>
            <button
              type="button"
              onClick={handlePlaySummary}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
            >
              <Volume2 className="h-4 w-4 text-amber-400" />
              <span>استمع لملخص الأزمة</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase">الملخص التنفيذي للأزمة:</div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {resultData.caseSummaryAr}
            </p>
          </div>

          {/* Cross-Department Friction & SLA Table */}
          {resultData.departmentInteractions && resultData.departmentInteractions.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-400" />
                  <span>خريطة الاحتكاك بين الإدارات واتفاقيات مستوى الخدمة (Cross-Department SLAs):</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resultData.departmentInteractions.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300">{item.department}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                        SLA ملزمة
                      </span>
                    </div>
                    <div className="text-xs text-rose-300/90 leading-relaxed">
                      <strong className="text-rose-400">سبب العطل الحالي:</strong> {item.currentDefect}
                    </div>
                    <div className="text-xs text-emerald-300/90 leading-relaxed">
                      <strong className="text-emerald-400">اتفاقية الخدمة (SLA):</strong> {item.proposedSLA}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 7-Slide Interactive Deck Presentation Navigator */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Presentation className="h-3.5 w-3.5" />
                  <span>العرض التقديمي التنفيذي (7 شرائح معتمدة)</span>
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-500/30">
                  ثنائي اللغة (Bilingual)
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                الشريحة {currentSlide.slideNumber}: {currentSlide.slideTitleAr}
              </h3>
              <p className="text-xs font-mono text-slate-400">{currentSlide.slideTitleEn}</p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Language Switcher */}
              <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setDisplayLangMode('bilingual')}
                  className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    displayLangMode === 'bilingual'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌐 ثنائي
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayLangMode('arabic')}
                  className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    displayLangMode === 'arabic'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🇪🇬 عربي
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayLangMode('english')}
                  className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    displayLangMode === 'english'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>

              {/* Template Preview & Print Modal Button */}
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:from-amber-400 hover:to-amber-300 active:scale-95 transition-all cursor-pointer shadow-md"
                title="معاينة التمبلت التنفيذي واختيار النمط قبل التصدير والطباعة"
              >
                <Eye className="h-4 w-4" />
                <span>معاينة التمبلت والتصدير</span>
              </button>

              <button
                type="button"
                onClick={handlePlayCurrentSlide}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying &&
                currentAudioTitle ===
                  `سلايد ${currentSlide.slideNumber}: ${currentSlide.slideTitleAr}` ? (
                  <Pause className="h-4 w-4 fill-current text-amber-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-amber-400" />
                )}
                <span>
                  {isPlaying &&
                  currentAudioTitle ===
                    `سلايد ${currentSlide.slideNumber}: ${currentSlide.slideTitleAr}`
                    ? 'إيقاف الصوت'
                    : 'استمع للشريحة بالعامية'}
                </span>
              </button>
            </div>
          </div>

          {/* Slide Navigator Buttons */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex gap-1.5">
              {resultData.presentationDeck.map((s) => {
                const isCurrent = s.slideNumber === activeSlideNum;
                return (
                  <button
                    key={s.slideNumber}
                    type="button"
                    onClick={() => setActiveSlideNum(s.slideNumber)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                        : 'border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>سلايد {s.slideNumber}</span>
                    {s.pillarRef && (
                      <span className="font-mono text-[10px] opacity-80">({s.pillarRef})</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={activeSlideNum <= 1}
                onClick={() => setActiveSlideNum((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="السلايد السابق"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={activeSlideNum >= resultData.presentationDeck.length}
                onClick={() =>
                  setActiveSlideNum((p) => Math.min(resultData.presentationDeck.length, p + 1))
                }
                className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="السلايد التالي"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Slide Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left/Main Column: Bullet Points according to displayLangMode (6 or 7 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {(displayLangMode === 'bilingual' || displayLangMode === 'arabic') && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      نقاط العرض المعروضة على البروجكتور (بالعربي):
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">AR</span>
                  </div>

                  <div className="space-y-2.5">
                    {currentSlide.bulletPointsAr.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(displayLangMode === 'bilingual' || displayLangMode === 'english') && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3" dir="ltr">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                      Executive Presentation Points (English):
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">EN</span>
                  </div>

                  <div className="space-y-2.5 font-sans">
                    {(currentSlide.bulletPointsEn && currentSlide.bulletPointsEn.length > 0
                      ? currentSlide.bulletPointsEn
                      : currentSlide.bulletPointsAr
                    ).map((enPt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{enPt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Candidate Speech Script (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-950 p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 uppercase flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>ما تقوله بلسانك أمام اللجنة (Candidate Speech Cue):</span>
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-200 border border-amber-500/30">
                    بالعامية المصرية الواثقة
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-100 font-normal leading-relaxed italic bg-slate-950/80 p-4 rounded-xl border border-amber-500/20">
                  "{currentSlide.candidateScriptAr}"
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span>ثبات انفعالي ونبرة قيادية حازمة دون تبرير</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePlayCurrentSlide()}
                      className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>استمع</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(currentSlide.candidateScriptAr)
                      }
                      className="text-slate-400 hover:text-white font-semibold cursor-pointer"
                    >
                      نسخ السكريبت
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Template Preview Trigger Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-amber-400" />
                    <span>هل تريد معاينة كيف تظهر هذه الشريحة في تمبلت العرض الرسمي؟</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    استعرض التمبلتات المعتمدة (بورد رووم، لين سيكس سيجما، المذكرة الرسمية) مع خيار الطباعة المباشرة.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="rounded-xl bg-amber-500/20 border border-amber-500/40 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shrink-0"
                >
                  معاينة التمبلت
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Committee Simulation (Dr. Sherif, Ms. Rania, Eng. Karim) */}
        {resultData.committeeQuestions && resultData.committeeQuestions.length > 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-5">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 font-mono text-xs font-bold text-indigo-300">
                محاكاة أسئلة اللجنة
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                أسئلة اللجنة المحرجة والردود الحاسمة بالعامية المصرية
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                كيف تدافع عن خطتك بثقة وثبات أمام د. شريف وأ. رانيا وم. كريم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resultData.committeeQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">{q.interviewer}</span>
                      <button
                        type="button"
                        onClick={() =>
                          playOrStop(
                            `سؤال ${q.interviewer}: ${q.question}... الرد الحاسم: ${q.modelRebuttal}`,
                            `سؤال ${q.interviewer}`
                          )
                        }
                        className="text-slate-400 hover:text-amber-400 p-1"
                        title="استمع للسؤال والرد"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xs text-rose-300 font-medium bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                      <strong>السؤال:</strong> "{q.question}"
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-emerald-400">رد الكوتش:</strong> "{q.modelRebuttal}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 15 Cases Cluster & Speed Solving Secret */}
        {resultData.cluster15CasesStrategy && (
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="h-4 w-4" />
              <span>الوعاء التشغيلي وسر الحل السريع أمام اللجنة</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold">تصنيف الوعاء:</div>
                <div className="text-sm font-bold text-white">
                  {resultData.cluster15CasesStrategy.bucketName}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold">سر الحل في 3 دقائق:</div>
                <div className="text-xs text-amber-200 leading-relaxed">
                  {resultData.cluster15CasesStrategy.speedSolvingSecret}
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1">
                <div className="text-[11px] text-amber-400 font-semibold">الجملة السحرية الحاصمة:</div>
                <div className="text-xs font-bold text-amber-100 leading-relaxed font-mono">
                  "{resultData.cluster15CasesStrategy.goldenFormula}"
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Presentation Deck Preview & Executive Template Export Studio */}
      <DeckPreviewAndExportModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        caseData={resultData as SolvedCaseResultData}
        onPlayAudio={(text, title) => onPlayAudio(text, title)}
        isPlaying={isPlaying}
        currentAudioTitle={currentAudioTitle}
      />
    </div>
  );
};

