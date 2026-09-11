// Live Day Interview Simulation Data for Islam Mohamed Kamel Al Sapaa
// Assessment: Branches Operation Section Head / Operation Support Section Head
// Location: Espana Plaza, AMG Meeting Room (13 Sep, 2:00 PM - 2:45 PM)

export interface PanelMember {
  id: string;
  name: string;
  title: string;
  focusArea: string;
  avatarEmoji: string;
  voice: string;
  toneDescription: string;
}

export interface DayStageItem {
  id: string;
  timeLabel: string;
  title: string;
  kicker: string;
  icon: string;
  overview: string;
  dialogues: {
    speaker: string;
    role: string;
    text: string;
    audioVoice?: string;
    isCandidate?: boolean;
  }[];
  coachMantra: string;
  actionChecklist: string[];
}

export const AMG_PANEL_MEMBERS: PanelMember[] = [
  {
    id: 'ops_director',
    name: 'د. شريف',
    title: 'مدير العمليات وسلاسل الإمداد (Operations Director)',
    focusArea: 'سرعة خدمة المريض، وقت الانتظار TAT، التكلفة، وإدارة الفروع بكفاءة عالية',
    avatarEmoji: '👨‍⚕️',
    voice: 'Charon',
    toneDescription: 'نبرة عملية صارمة، يبحث عن الأرقام والحلول الميدانية القابلة للتطبيق',
  },
  {
    id: 'hr_director',
    name: 'أ. رانيا',
    title: 'مديرة الموارد البشرية والتطوير التنظيمي (HR Director)',
    focusArea: 'السلوك القيادي، إدارة مقاومة الموظفين، الذكاء العاطفي، وثقافة الولاء',
    avatarEmoji: '👩‍💼',
    voice: 'Kore',
    toneDescription: 'نبرة تحليلية فاحصة، تقيس الثبات الانفعالي والتعامل مع الزملاء الأقدم',
  },
  {
    id: 'quality_lead',
    name: 'م. كريم',
    title: 'رئيس الجودة والتحول الرقمي (Quality & Process Lead)',
    focusArea: 'معايير الـ SOP، دقة الفحوصات، إجراءات الـ CAPA، وتكامل الأنظمة الرقمية',
    avatarEmoji: '👨‍💻',
    voice: 'Puck',
    toneDescription: 'نبرة هندسية دقيقة، يركز على منع تكرار الأخطاء وتوثيق الإجراءات',
  },
];

export const LIVE_DAY_STAGES: DayStageItem[] = [
  {
    id: 'morning',
    timeLabel: '09:00 ص - 01:30 م',
    title: 'صباح يوم المقابلة والتحضير النفسي',
    kicker: 'المرحلة 01: الإعداد والهدوء',
    icon: '🌅',
    overview:
      'صباح يوم 13 سبتمبر، التركيز على التنفس الهادئ ومراجعة الأرقام الذهبية واستحضار عقلية القيادة دون توتر.',
    dialogues: [
      {
        speaker: 'الكوتش',
        role: 'Executive Mentor',
        text: 'صباح الخير يا إسلام... النهاردة مش يوم امتحان تسميع، النهاردة يوم عرض خبرة 14 سنة في الميدان. نبرتك تكون هادية، واثقة، مش سريعة. افتكر دائماً: المشكلة يعني داتا، والريسك يعني أولوية، والأكشن يعني مسؤولية.',
        audioVoice: 'Fenrir',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'أنا جاهز ومستعد... معايا أرقامي، وتجاربي الحقيقية في فيصل 10 والفروع الكبرى، وواثق إن فضل ربنا ومجهودي السنين اللي فاتت هيظهر في كل كلمة.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
    ],
    coachMantra: 'لا تدخل المقابلة كباحث عن وظيفة؛ ادخل كشريك تنفيذي جاء ليحل أزمات التشغيل.',
    actionChecklist: [
      'مراجعة الأرقام الحاسمة (NPS 92%, TAT 14 دقيقة, 40+ فرع جديد).',
      'التنفس العميق والابتعاد عن التشتت.',
      'الوصول المبكر لمقر المقابلة بـ 30 دقيقة.',
    ],
  },
  {
    id: 'arrival',
    timeLabel: '01:30 م - 01:55 م',
    title: 'الوصول إلى إسبانيا بلازا والاستقبال',
    kicker: 'المرحلة 02: الانطباع الأول',
    icon: '🏢',
    overview:
      'الوصول إلى مبنى إسبانيا بلازا، الاستقبال الودود والواثق، وضبط لغة الجسد قبل الدخول.',
    dialogues: [
      {
        speaker: 'مسؤولة الاستقبال (AMG)',
        role: 'Front Desk',
        text: 'أهلاً بحضرتك يا فندم في مقر ألفا ميديكال جروب.. اتفضل استريح في صالة الضيافة.',
        audioVoice: 'Kore',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'أهلاً بحضرتك، شكراً جزيلاً. أنا إسلام محمد كامل، عندي مقابلة تقييم لمنصب Section Head الدعم التشغيلي الساعة 2:00 م.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'مسؤولة الاستقبال (AMG)',
        role: 'Front Desk',
        text: 'تمام يا فندم، لجنة التقييم في انتظار حضرتك في غرفة الاجتماعات الرئيسية.',
        audioVoice: 'Kore',
      },
    ],
    coachMantra: 'الانطباع الأول يبدأ من طريقة إلقاء السلام على موظف الاستقبال، فكل تفصيلة محسوبة.',
    actionChecklist: [
      'ابتسامة واثقة ومصافحة مهنية متزنة.',
      'الجلوس بظهر مفرود ومراجعة خريطة الـ 90 يوماً ذهنياً.',
      'إغلاق صوت الهاتف تماماً.',
    ],
  },
  {
    id: 'meeting_room_entry',
    timeLabel: '01:58 م - 02:02 م',
    title: 'دخول قاعة المقابلة وكسر الجليد',
    kicker: 'المرحلة 03: التواجد القيادي',
    icon: '🚪',
    overview:
      'الدخول إلى قاعة الاجتماعات، التحية الرسمية المحترمة لأعضاء اللجنة، وبدء الجلسة بهدوء.',
    dialogues: [
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'السلام عليكم ورحمة الله وبركاته... مساء الخير على حضراتكم جميعاً، يسعدني جداً وجودي معكم اليوم.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'أهلاً بيك يا إسلام، اتفضل استريح.. مرحب بيك في جلسة التقييم الخاصة بـ Section Head.',
        audioVoice: 'Charon',
      },
      {
        speaker: 'أ. رانيا',
        role: 'مديرة الموارد البشرية',
        text: 'أهلاً يا إسلام، احنا راجعنا الـ CV وعارفين تاريخك، وحابين نسمع منك مباشرة عن تجربتك ورؤيتك.',
        audioVoice: 'Kore',
      },
    ],
    coachMantra: 'النظرة الموزعة بالعدل على كل أعضاء اللجنة تشعرهم جميعاً باحترامك واهتمامك.',
    actionChecklist: [
      'التواصل البصري المتوازن بين د. شريف وأ. رانيا وم. كريم.',
      'نبرة صوت مسموعة ومريحة بدون استعجال.',
      'وضع الأوراق أو التابلت بأناقة أمامك.',
    ],
  },
  {
    id: 'opening_pitch',
    timeLabel: '02:02 م - 02:10 م',
    title: 'عرض المقدمة والرؤية القيادية (The Pitch)',
    kicker: 'المرحلة 04: القيمة المضافة',
    icon: '🎤',
    overview:
      'تقديم نفسك في 3 دقائق مركزة تربط بين سنوات الميدان الـ 14 والقدرة على قيادة وتطوير الفروع.',
    dialogues: [
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'إسلام، عرفنا بنفسك وقولنا باختصار ليه شايف إنك الأنسب لقيادة الدعم التشغيلي للمجموعة؟',
        audioVoice: 'Charon',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'شكراً يا فندم... خبرتي 14 سنة في قلب الميدان الطبي، منها 11 سنة في خطوط المواجهة الأولى. في فرع فيصل 10 وغيره من الفروع الكبرى، اتعلمت إن إدارة العمليات مش مجرد رد فعل؛ هي منهجية "Problem = Data, Risk = Priority, Action = Ownership". قدرت بفضل الله أنزل وقت انتظار المريض من 42 لـ 14 دقيقة، وأرفع الـ NPS لـ 92%، وشاركت في افتتاح وتوحيد معايير 40 فرع جديد. هدفي كـ Section Head إني أحمي سمعة المجموعة، وأربط الإدارات المساندة بـ SLAs ملزمة، وأبني صف تاني قوي.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'م. كريم',
        role: 'رئيس الجودة والتحول الرقمي',
        text: 'كلام ممتاز.. عجبني تركيزك على لغة الأرقام والـ SLAs.',
        audioVoice: 'Puck',
      },
    ],
    coachMantra: 'المقدمة الناجحة ليست سرد تواريخ، بل هي إثبات أنك الحل لمشاكل الإدارة الحالية.',
    actionChecklist: [
      'الالتزام بزمن محدد (أقل من 3 دقائق).',
      'ذكر أرقام مثبتة (14 دقيقة TAT, 92% NPS, 40 فرع).',
      'إبراز مفهوم المسؤولية والـ SLAs.',
    ],
  },
  {
    id: 'panel_questions',
    timeLabel: '02:10 م - 02:25 م',
    title: 'أسئلة اللجنة التنافسية ومنهجية STAR',
    kicker: 'المرحلة 05: الاختبار العميق',
    icon: '🎯',
    overview:
      'إجابة أسئلة د. شريف وأ. رانيا وم. كريم باستخدام أسلوب STAR الحاسم والرد بالأرقام.',
    dialogues: [
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'لو فرع رئيسي عنده نسبة رفض عينات عالية وتأخير في الـ TAT بنسبة 50%، هتعمل إيه في أول يومين؟',
        audioVoice: 'Charon',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'أولاً: Immediate Action؛ هنزل الصالة بنفسي أعزل المشكلة، وأشغل مسار الفحص السريع للحالات الطارئة. ثانياً: Data Diagnosis؛ هسحب تقرير الـ LIS لأعرف بالظبط: هل الرفض سببه الهيموليسيز، ولا تخثر العينات، ولا تأخر النقل؟ ثالثاً: RCA؛ لو المشكلة في طريقة السحب هعمل تدريب ميداني فوري، ولو المشكلة في حفظ العينات هعدل خط سير سيارات التجميع مع سلاسل الإمداد فوراً.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'أ. رانيا',
        role: 'مديرة الموارد البشرية',
        text: 'طب لو عندك مشرفين أقدم منك ومش متقبلين تعليماتك الجديدة، هتديرهم إزاي؟',
        audioVoice: 'Kore',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'أنا مش بدير بالسلطة؛ بدير بالتأثير (Influence without authority). هقعد معاهم جلسة استماع فردية، هقدر تاريخهم، وهقولهم بوضوح: أنا هنا عشان أحل المشاكل اللي معطلة فروعكم مع الإدارة المركزية، ونجاحنا مشترك. هشركهم في القرارات وهنسب النجاح ليهم أمام الإدارة.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
    ],
    coachMantra: 'لا تدافع عن نفسك بحرارة مفرطة؛ اشرح طريقتك بهدوء المعلم الواثق من أدواته.',
    actionChecklist: [
      'استخدام هيكل STAR الصارم (الموقف، المهمة، الأكشن، النتيجة).',
      'التفريق الواضح بين المعالجة السريعة والحل الجذري المستدام.',
      'إظهار النضج في التعامل مع الزملاء القدامى.',
    ],
  },
  {
    id: 'case_study',
    timeLabel: '02:25 م - 02:37 م',
    title: 'عرض ومناقشة دراسة الحالة (The Case Study)',
    kicker: 'المرحلة 06: حسم الـ 6-7 سلايدات',
    icon: '📊',
    overview:
      'عرض حل الكيس ستادي التشغيلية أمام اللجنة باتباع الخطوات السبعة وهيكل السلايدات الموحد.',
    dialogues: [
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'دلوقتي يا إسلام معانا دراسة حالة فرع بيعاني من انخفاض الـ NPS لـ 62% وتأخر الـ TAT في تسليم النتائج، اتفضل اعرض رؤيتك للحل.',
        audioVoice: 'Charon',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'بناءً على الخطوات السبعة لعقلية المدير: 1) الداتا: حددنا إن 70% من التأخير في قسم تسجيل موافقات التأمين وليس في المعمل. 2) الريسك: مهدد بفقدان تعاقدات شركات كبرى. 3) الأكشن الفوري: تفعيل نموذج التعهد السريع خلال 24 ساعة. 4) الـ RCA: بطء الاتصال بالـ API لشركات الوساطة. 5) الـ CAPA: توقيع SLA ملزم مع الـ IT برد تلقائي في 15 دقيقة. 6) الشركاء: مصفوفة RACI واضحة للاستقبال والتأمين والـ IT. 7) المتابعة: تقرير أسبوعي للـ TAT مع مستهدف استعادة الـ NPS لـ 90% خلال 30 يوم.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'م. كريم',
        role: 'رئيس الجودة والتحول الرقمي',
        text: 'ممتاز.. ده بالضبط التفكير المنهجي اللي المجموعة محتاجاه في المرحلة دي.',
        audioVoice: 'Puck',
      },
    ],
    coachMantra: 'دراسة الحالة ليست استعراض معلومات؛ هي إثبات أن لديك قالباً ذهنياً ثابتاً يفكك أي أزمة في دقائق.',
    actionChecklist: [
      'استعراض الخطوات السبعة بالترتيب: Data, Risk, Action, RCA, CAPA, Stakeholders, Follow-up.',
      'تحديد المستهدفات الرقمية الواضحة والمدى الزمني (30 يوماً).',
      'إبراز الـ SLA بين الإدارات المختلفة كحل جذري.',
    ],
  },
  {
    id: 'reverse_questions',
    timeLabel: '02:37 م - 02:42 م',
    title: 'أسئلة المرشح الذكية للجنة (Reverse Inquiries)',
    kicker: 'المرحلة 07: الشغف والشراكة',
    icon: '❓',
    overview:
      'طرح أسئلة استراتيجية ذكية تدل على فهم عميق لأهداف المجموعة ورغبة حقيقية في إحداث أثر.',
    dialogues: [
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'إسلام، في نهاية المقابلة، هل عندك أي أسئلة حابب تسألها لينا؟',
        audioVoice: 'Charon',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'نعم يا فندم، لو أذنتم لي: إيه هو أهم تحدي تشغيلي بيواجه المجموعة حالياً في خطة التوسع، واللي بتتوقعوا من الـ Section Head الجديد إنه يحله في أول 90 يوم؟ والسؤال الثاني: إيه هي المؤشرات اللي لو حققتها بعد 6 شهور تقولوا إن اختيار إسلام كان القرار الأصوب؟',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'أ. رانيا',
        role: 'مديرة الموارد البشرية',
        text: 'سؤالين في غاية النضج والذكاء يا إسلام، ويدلوا على إنك بتفكر كقائد شريك مش مجرد موظف.',
        audioVoice: 'Kore',
      },
    ],
    coachMantra: 'السؤال الذكي في ختام المقابلة يرسخ مكانتك في عقول أعضاء اللجنة كشخص يعتمد عليه.',
    actionChecklist: [
      'تجنب الأسئلة الروتينية عن الإجازات أو مواعيد الدوام.',
      'التركيز على أولويات البزنس ومؤشرات النجاح في أول 90 يوماً.',
      'الإنصات باهتمام لإجابات اللجنة وتدوين الملاحظات.',
    ],
  },
  {
    id: 'closing_day',
    timeLabel: '02:42 م - 02:45 م',
    title: 'المغادرة وإرسال رسالة الشكر التنفيذية',
    kicker: 'المرحلة 08: التقفيل الاحترافي',
    icon: '🤝',
    overview:
      'إنهاء الجلسة بمصافحة راقية، وإرسال رسالة شكر احترافية للجنة خلال 24 ساعة.',
    dialogues: [
      {
        speaker: 'د. شريف',
        role: 'مدير العمليات',
        text: 'شكراً جزيلاً يا إسلام على وقتك وطاقتك، كانت جلسة مثمرة جداً وبنتمنى لك كل التوفيق.',
        audioVoice: 'Charon',
      },
      {
        speaker: 'إسلام (المرشح)',
        role: 'المرشح',
        text: 'الشرف ليا يا فندم، سعيد جداً بالنقاش الممتع مع حضراتكم وفخور بانتمائي لمجموعة ألفا.. في رعاية الله.',
        audioVoice: 'Fenrir',
        isCandidate: true,
      },
      {
        speaker: 'الكوتش',
        role: 'Executive Mentor',
        text: 'عاش يا بطل! أداء استثنائي ومنضبط. دلوقتي جه وقت إرسال إيميل الشكر الرسمي لتثبيت الأثر.',
        audioVoice: 'Fenrir',
      },
    ],
    coachMantra: 'إيميل الشكر بعد المقابلة ليس مجرد مجاملة، بل هو وثيقة تذكير نهائية بقيمتك والتزامك.',
    actionChecklist: [
      'مصافحة متزنة مع كل عضو ونظرة تقدير صادقة.',
      'مغادرة القاعة بهدوء ودون أي ارتباك.',
      'نسخ وإرسال إيميل الشكر التنفيذي للجنة خلال 24 ساعة.',
    ],
  },
];

export const THANK_YOU_EMAIL_TEMPLATE = {
  subject: 'Thank You – Branches Operation Section Head Assessment (Islam Mohamed Kamel Al Sapaa)',
  body: `Dear Dr. Sherif, Ms. Rania, and Eng. Karim,

I would like to express my sincere gratitude and appreciation for the engaging and insightful assessment session today at Espana Plaza for the Branches Operation Section Head position.

Discussing our operational strategies, patient journey challenges, and the branch rescue Case Study further reinforced my excitement and complete readiness to contribute to Alfa Medical Group (AMG) at this strategic leadership level.

With my 14+ years in field operations, demonstrated track record across high-density branches like Faisal 10, and commitment to our 7-step operational framework:
(DATA, PRIORITY, OWNERSHIP, RCA, CAPA, STAKEHOLDERS, FOLLOW-UP),
I am eager to standardize excellence, enhance NPS to 92%+, and eliminate bottlenecks across all AMG branch operations.

Thank you once again for your valuable time and leadership.

Warm regards,

Islam Mohamed Kamel Al Sapaa
Senior Area Operations & Reception Anchor – Faisal 10
Alfa Medical Group (AMG)
Mobile: +20 100 000 0000 | Email: eslamsp311@gmail.com`,
};
