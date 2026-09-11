import { ManagerStep, CoachVoice, SimulationCase } from '../types';

export const COACH_VOICES: CoachVoice[] = [
  {
    id: 'Fenrir',
    name: 'Fenrir',
    labelAr: 'الكوتش أحمد (صوت هادئ وواثق وعميق)',
    gender: 'male',
    toneAr: 'نبرة قيادية رصينة، بطيئة ومريحة، وقفات استراتيجية بعد كل مبدأ',
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    labelAr: 'الكوتش طارق (صوت دافئ ومشجع)',
    gender: 'male',
    toneAr: 'نبرة كوتش متمرس، توجيه بالعامية المصرية الصريحة والعملية',
  },
  {
    id: 'Kore',
    name: 'Kore',
    labelAr: 'الكوتش ندى (صوت تنفيذي حاسم وهادئ)',
    gender: 'female',
    toneAr: 'نبرة قيادية حكيمة، تركيز على إدارة المشاعر وهدوء القرار',
  },
  {
    id: 'Charon',
    name: 'Charon',
    labelAr: 'المحاور الصارم (نبرة لجان التقييم)',
    gender: 'male',
    toneAr: 'نبرة اختبار رسمية لطرح أسئلة المقابلات والـ Curveballs',
  },
];

export const MANAGER_STEPS: ManagerStep[] = [
  {
    id: 'data',
    stepNumber: 1,
    keywordEn: 'DATA',
    keywordAr: 'المشكلة والداتا',
    titleEn: 'Problem and Data',
    titleAr: 'المشكلة والداتا (Data-driven)',
    keyQuestionEn: 'What is the problem? What does the data say?',
    keyQuestionAr: 'إيه هي المشكلة بالضبط؟ والداتا بتقول إيه بالأرقام؟',
    mantraEn: 'No data... no strong decision. DATA: I do not guess, I measure.',
    mantraAr: 'مفيش داتا... مفيش قرار قوي. مفيش تخمين... في قياس.',
    coachRuleEn: 'Stop saying "I feel there is an issue". Start saying "The data shows 30 missed cases".',
    coachRuleAr: 'بطل تقول "حاسس إن في لخبطة"... قول فوراً: "الداتا بتأكد وجود 30 حالة متأخرة".',
    audioPromptText: `الخطوة الأولى... Problem and Data. ... اسمعني بهدوء يا بطل... وركز في المبدأ ده كويس: مفيش داتا... مفيش قرار قوي. ... المشكلة يعني داتا... Problem equals Data. ...
...
لما حد يجيلك الفرع ويقولك: 'الدنيا مقلوبة والعملاء بيشتكوا'... متتوترش ومتجريش ورا العياط. اقف ثابت واسأله بنبرة هادية: 'الأرقام بتقول إيه؟ كام عينة اتأخرت؟ كام دقيقة زيادة في الـ TAT؟' ...
...
المدير الحقيقي مش بيخمّن... المدير الحقيقي بيقيس.
...
افتكر دايماً الوقفات دي عشان تثبت في عقلك:
المشكلة... يعني داتا... Problem equals Data.`,
    caseStudy: {
      context: 'شكوى شفهية من تكدس المرضى في فترة الصباح بالفرع',
      action: 'مراجعة شاشات الانتظار: استخراج متوسط الـ TAT، اتضح أن التأخير في قسم تسجيل التأمين فقط بمتوسط 18 دقيقة',
      metric: '30 حالة مسجلة على السيستم بدقة أرقام',
    },
    deepDivePoints: [
      {
        heading: 'عقلية الـ Data-driven',
        explanation: 'التحول من ردود الفعل العاطفية إلى لغة الأرقام الصامتة التي لا تقبل الجدال.',
        term: 'Data-driven (مدعوم بالأرقام)',
      },
      {
        heading: 'القاعدة الذهبية',
        explanation: 'لو معندكش داتا موثقة، أي قرار هتاخده هيكون مجرد تخمين مكلف.',
        term: 'No data... no strong decision',
      },
    ],
    interactiveCheck: {
      question: 'الموظف بيقولك: "المرضى بيتخانقوا والدنيا واقفة خالص!".. ردك كمدير إيه؟',
      options: [
        {
          text: 'أجري فوراً أزعق في الاستقبال وأقولهم اشتغلوا بسرعة.',
          isManagerMindset: false,
          feedback: 'ده تصرف انفعالي سطحي بيزود التوتر في الصالة ومبيحلش أصل الأزمة.',
        },
        {
          text: 'أهديه فوراً وأسأله: "الـ Data بتقول إيه؟ كام مريض منتظر؟ وإيه نوع التحاليل المتأخرة؟"',
          isManagerMindset: true,
          feedback: 'الله ينور عليك! دي عقلية الـ Data-driven: الهدوء والبدء بلغة الأرقام فوراً.',
        },
        {
          text: 'أقوله دي مش مسؤوليتي واكتب إيميل للمدير الإقليمي.',
          isManagerMindset: false,
          feedback: 'هروب من المسؤولية ورمي اللوم على الآخرين.',
        },
      ],
    },
  },
  {
    id: 'priority',
    stepNumber: 2,
    keywordEn: 'PRIORITY',
    keywordAr: 'الريسك والأولوية',
    titleEn: 'Risk and Priority',
    titleAr: 'الريسك والأولوية (Prioritization)',
    keyQuestionEn: "What's the risk?",
    keyQuestionAr: 'إيه هو حجم الخطر؟ ومين اللي يتصلح الأول؟',
    mantraEn: 'Risk determines Priority. PRIORITY: I do not scatter myself, I determine what matters most.',
    mantraAr: 'حجم الخطر هو اللي بيحدد الأولوية. مش بشتت نفسي، بركز على الأهم.',
    coachRuleEn: 'Not all problems can or should be solved at once. Focus on patient safety, business survival, or critical bottlenecks.',
    coachRuleAr: 'مش كل المشاكل بتتحل في نفس الثانية.. الأولوية لسلامة المريض وسمعة المؤسسة واستمرار التشغيل.',
    audioPromptText: `الخطوة التانية... Risk and Priority. ...
...
خد نفس عميق... واسمعني كويس: مش كل حاجة بتولع في الشغل محتاجة تطفيها في نفس النفس. ...
حجم الخطر... هو اللي بيحدد الأولوية...
Risk equals Priority. ...
...
لو عندك برنتر عطلانة... وفي نفس الوقت عينة دم باثولوجي طارئة مهددة بالفساد... مين اللي يتحرك الأول؟ العينة طبعاً! لأن تكلفتها صحة مريض ومخالفة طبية جسيمة. ...
المدير مش بيمشي ورا الصوت العالي... المدير بيمشي ورا الريسك الأعلى.
...
اسمعها وثبتها:
الريسك... يحدد الأولوية... Risk equals Priority.`,
    caseStudy: {
      context: 'تعطل جهاز التكييف في صالة الانتظار وتوقف ثلاجة حفظ العينات في نفس التوقيت',
      action: 'نقل عينات الدم فوراً إلى ثلاجة احتياطية حرجة، ثم فتح النوافذ وتشغيل مراوح الصالة لحين صيانة التكييف',
      metric: 'تصنيف: High Risk (سلامة العينات أولاً)',
    },
    deepDivePoints: [
      {
        heading: 'مصفوفة الخطر (Risk Matrix)',
        explanation: 'تقييم أي مشكلة على محورين: احتمالية الحدوث، وشدة الأثر على صحة المريض والسمعة.',
        term: 'Risk determines Priority',
      },
      {
        heading: 'ترتيب الأولويات (Prioritization)',
        explanation: 'حماية المريض أولاً، سلامة العينات ثانياً، استمرار السيستم ثالثاً، والراحة رابعاً.',
        term: 'Prioritization',
      },
    ],
    interactiveCheck: {
      question: 'عميل VIP بيزعق عشان قهوته اتأخرت، والممرضة بتقولك عينة دم طفل اتجلطت وعايزة إعادة سحب.. أولويتك إيه؟',
      options: [
        {
          text: 'أجري أهدي العميل الـ VIP الأول عشان ميعملش شكوى للمدير العام.',
          isManagerMindset: false,
          feedback: 'غلط. سلامة التشخيص الطبي وسلامة الطفل مقدمة أخلاقياً وتشغيلياً على أي مجاملة.',
        },
        {
          text: 'أوجه أسرع سحب بديل للطفل فوراً لحماية التشخيص، وأكلف مسؤول الفرع باحتواء العميل بهدوء.',
          isManagerMindset: true,
          feedback: 'ممتاز! ده تطبيق مباشر لقاعدة: Risk determines Priority.',
        },
      ],
    },
  },
  {
    id: 'ownership',
    stepNumber: 3,
    keywordEn: 'OWNERSHIP',
    keywordAr: 'الأكشن الفوري والملكية',
    titleEn: 'Immediate Action',
    titleAr: 'الأكشن الفوري والملكية (Ownership)',
    keyQuestionEn: 'What can I do now?',
    keyQuestionAr: 'إيه اللي في إيدي أعمله دلوقتي حالا لاحتواء الموقف؟',
    mantraEn: 'Problem identified? Take Ownership. Take Action. OWNERSHIP: I do not wait, I act.',
    mantraAr: 'شفت المشكلة؟ شيل الليلة، وخد أكشن في ساعتها. مفيش انتظار.',
    coachRuleEn: 'Never say "This is not my job". Say "I take Ownership" and apply immediate containment.',
    coachRuleAr: 'إياك تقول "دي مش شغلتي".. قول بنبرة واثقة: "أنا واخد المسؤولية وبتحرك فوراً".',
    audioPromptText: `الخطوة التالتة... Immediate Action and Ownership. ...
...
دي أهم لحظة بتفرق بين المشرف العادي... وبين رئيس القسم Section Head القائد. ...
الموظف المهزوز أول ما يشوف مصيبة يقول: 'يا فندم السيستم واقع ومش شغلتي كلم الـ IT'. ...
أما القائد في Manager Mode بيقول بكل ثقة وهدوء: 'أنا واخد المسؤولية... وهتصرف فوراً'.
Action equals Ownership. ...
...
أول ما الأزمة تحصل، خد أكشن احتواء فوري يوقف النزيف، متسيبش المريض في حيرة. جهز مسار بديل ورقي، شغّل الخط السريع، بعدين ندوّر مين الغلطان.
...
احفظ النبرة دي في ودنك:
الأكشن... يعني مسؤولية وملكية... Action equals Ownership.`,
    caseStudy: {
      context: 'سقوط شبكة الإنترنت المركزية في الفرع وقت الذروة وتوقف السيستم',
      action: 'تفعيل بروتوكول الطوارئ (Offline Form) فوراً وتوصيل راوتر 4G احتياطي لتسجيل المرضى دون تأخير',
      metric: 'إجراء احتواء فوري في أول 5 دقائق',
    },
    deepDivePoints: [
      {
        heading: 'تحمل المسؤولية (Extreme Ownership)',
        explanation: 'الاعتراف بأن المشكلة في نطاق اختصاصك ما دامت تؤثر على مرضاك وزملائك.',
        term: 'I take Ownership',
      },
      {
        heading: 'إجراء الاحتواء الفوري (Containment Action)',
        explanation: 'إيقاف تسرب الضرر فوراً بحل مؤقت آمن قبل الدخول في الحلول طويلة الأمد.',
        term: 'Immediate Action',
      },
    ],
    interactiveCheck: {
      question: 'المريض واقف غضبان لأن نتيجة تحليله متأخرة 3 ساعات بسبب عطل جهاز المعمل.. تصرفك كـ Section Head؟',
      options: [
        {
          text: 'أقوله: "المعمل المركزي هو اللي متأخر وكلمهم في التليفون اشتكي هناك".',
          isManagerMindset: false,
          feedback: 'تصرف كارثي يهدم سمعة الفرع ويبين ضعف المسؤولية.',
        },
        {
          text: 'أعتذر له بهدوء، أتحمل المسؤولية، وأتواصل بنفسي مع مدير المعمل لطباعة النتيجة ومتابعتها فوراً حتى استلامها.',
          isManagerMindset: true,
          feedback: 'أحسنت! Action equals Ownership في أوضح صورها.',
        },
      ],
    },
  },
  {
    id: 'rca',
    stepNumber: 4,
    keywordEn: 'RCA',
    keywordAr: 'السبب الجذري ومكان الخنقة',
    titleEn: 'Root Cause Analysis (RCA)',
    titleAr: 'تحليل السبب الجذري ومكان الخنقة (Bottleneck)',
    keyQuestionEn: 'Why did it happen? Where is the bottleneck?',
    keyQuestionAr: 'ليه ده حصل من الأساس؟ وفين مكان الخنقة والتعطيل؟',
    mantraEn: "Don't treat the symptom. Find the Root Cause. RCA: I do not treat the symptom, I search for the cause.",
    mantraAr: 'ما تعالجش العَرَض وتسيب المرض. دوّر على السبب الجذري ومكان الخنقة.',
    coachRuleEn: "The team isn't 'just careless'. Look for the system bottleneck that makes doing the right thing hard.",
    coachRuleAr: 'الموظف مش بالضرورة مهمل.. دوّر على العيب في السيستم أو الإجراء اللي خلاه يقع في الغلط.',
    audioPromptText: `الخطوة الرابعة... RCA and Bottleneck. ...
...
اسمع النبرة دي كويس يا بطل: اوعى تعالج العَرَض وتسيب المرض. ...
RCA equals Bottleneck. ...
...
لو مريض عنده صداع واديته مسكن، الصداع هيروح ساعتين ويرجع.. كدة عالجت العرض. لكن لو عملت أشعة رنين وعرفت إن في ضغط عالي في المخ، كدة جبت السبب الجذري. ...
في الفرع نفس الكلام: لو كل يوم النتيجة بتتأخر.. متقولش التمريض كسلان.. اسأل نفسك خمس مرات 'ليه؟':
ليه اتأخرت؟ عشان التحضير اتأخر.. ليه التحضير اتأخر؟ عشان المادة الكيميائية كانت ناقصة.. ليه ناقصة؟ عشان طلب الشراء متعملش في معاده!
ده هو مكان الخنقة... الـ Bottleneck.
...
افتكرها وكررها:
السبب الجذري... يعني مكان الخنقة... RCA equals Bottleneck.`,
    caseStudy: {
      context: 'تكرار رفض عينات التجلط (Coagulation) بسبب وجود تجلطات صغيرة في الأنابيب',
      action: 'تطبيق تحليل الـ 5 Whys: اكتشاف أن السبب ليس مهارة الساحب، بل عدم توفر أجهزة التقليب الأوتوماتيكية في عربات السحب',
      metric: 'تحديد الخنقة: غياب تقليب العينة خلال أول 30 ثانية',
    },
    deepDivePoints: [
      {
        heading: 'تحليل الأسباب الخمسة (5 Whys)',
        explanation: 'التعمق بالسؤال المتكرر حتى نصل إلى جذر الخلل المؤسسي أو الإجرائي.',
        term: 'Root Cause Analysis (RCA)',
      },
      {
        heading: 'عنق الزجاجة (The Bottleneck)',
        explanation: 'النقطة الأبطأ في مسار العمليات التي تحدد سرعة النظام بأكمله.',
        term: 'Bottleneck (نقطة الاختناق)',
      },
    ],
    interactiveCheck: {
      question: 'نسبة رفض عينات السحب المنزلي زادت الأسبوع ده.. إيه الخطوة الذكية لـ Section Head؟',
      options: [
        {
          text: 'أخصم يومين لكل ساحب عنده عينة مرفوضة عشان يركزوا.',
          isManagerMindset: false,
          feedback: 'عقاب متسرع بيخلق خوف وتعتيم، ومبيحلش السبب الحقيقي.',
        },
        {
          text: 'أحلل العينات المرفوضة: نوعها، وقت السحب، وحالة حفظ الصناديق الباردة (Ice Packs) للوصول للسبب الحقيقي.',
          isManagerMindset: true,
          feedback: 'عظيم جداً! Don\'t treat the symptom, find the root cause.',
        },
      ],
    },
  },
  {
    id: 'capa',
    stepNumber: 5,
    keywordEn: 'CAPA',
    keywordAr: 'الحل والوقاية وربط الاتفاقيات',
    titleEn: 'CAPA (Corrective & Preventive Action)',
    titleAr: 'الحل والوقاية (CAPA & Standardization)',
    keyQuestionEn: 'How do I fix it and prevent it?',
    keyQuestionAr: 'إزاي أصلح الغلط دلوقتي وأضمن إنه ميتكررش تاني أبداً؟',
    mantraEn: 'Correct it. Prevent it. SLA. Trial Period. Standardization. CAPA: I do not just fix the problem, I prevent its recurrence.',
    mantraAr: 'صلح الغلط، وامنع تكراره، بسيناريو SLA ملزم وتجربة وتعميم SOP.',
    coachRuleEn: 'Corrective Action handles today. Preventive Action redesigns the system for tomorrow.',
    coachRuleAr: 'الإجراء التصحيحي بينقذ النهاردة.. لكن الإجراء الوقائي وسياسة الـ SLA بتبني السيستم لبكرة.',
    audioPromptText: `الخطوة الخامسة... CAPA and Standardization. ...
...
ركز في الكلمات دي، دي جوهر الشغل المؤسسي:
صلّح... وامنع التكرار...
CAPA equals Fix and Prevent. ...
...
الحل مش إننا نصلح العطل ونروّح ننام. التصليح ده مجرد Corrective Action.
القائد الحقيقي بيسأل: 'إزاي أضمن بنسبة مية في المية إن نفس الغلطة دي متكررش تاني مع أي مريض في أي فرع؟' ...
هنا بييجي دور:
الـ SLA... اتفاقية مستوى الخدمة الملزمة مع الإدارات.
فترة التجربة... Trial Period لاختبار الحل على فرع صغير.
والـ Standardization... تحويل الحل لإجراء قياسي SOP وتعميمه وتدريب الكل عليه.
...
اسمعها بوضوح وثبتها:
صلح وامنع... CAPA equals Fix and Prevent.`,
    caseStudy: {
      context: 'تأخر مستمر في توريد قفازات الفحص الطبي ومستهلكات السحب للفروع',
      action: 'تطبيق إجراء وقائي: وضع SLA ملزم مع المخازن بالتوريد خلال 24 ساعة عند وصول المخزون للحد الحرج (Reorder Point) وتعميم SOP',
      metric: 'انخفاض نفاد المخزون من 15% إلى 0%',
    },
    deepDivePoints: [
      {
        heading: 'الفرق بين التصحيح والوقاية',
        explanation: 'Corrective = إطفاء الحريق الحالي. Preventive = تركيب شبكة إطفاء ومنع أسباب الاشتعال.',
        term: 'Corrective & Preventive Actions',
      },
      {
        heading: 'اتفاقية مستوى الخدمة (SLA)',
        explanation: 'اتفاق مكتوب يحدد توقيت وجودة تسليم الخدمة بين الإدارات المختلفة مع عقوبات أو تصعيد واضح.',
        term: 'SLA + Standardization',
      },
    ],
    interactiveCheck: {
      question: 'اكتشفت إن جهاز التحليل بينسى الساحب يغير الإبرة الخاصة بيه في الصباح.. الحل الأصح كـ Section Head؟',
      options: [
        {
          text: 'أعلق ورقة مكتوبة بخط الإيد على الحيطة "ممنوع نسيان تغيير الإبرة".',
          isManagerMindset: false,
          feedback: 'حل بدائي جداً ومبيمنعش الخطأ البشري مع ضغط الشغل.',
        },
        {
          text: 'إجراء وقائي: برمجة السيستم بحيث لا يقبل بدء الفحص إلا بعد مسح باركود الإبرة الجديدة وتحديث الـ SOP.',
          isManagerMindset: true,
          feedback: 'هندسة وقائية محترفة (Standardization & Poka-Yoke)!',
        },
      ],
    },
  },
  {
    id: 'stakeholders',
    stepNumber: 6,
    keywordEn: 'STAKEHOLDERS',
    keywordAr: 'أصحاب المصلحة والتنسيق المشترك',
    titleEn: 'Stakeholders & Cross-functional',
    titleAr: 'أصحاب المصلحة والتنسيق (Cross-functional)',
    keyQuestionEn: 'Who needs to be involved?',
    keyQuestionAr: 'مين الأطراف اللي لازم تتدخل ونقعد معاهم على ترابيزة واحدة؟',
    mantraEn: 'Stakeholders. Cross-functional. Mitigation. Escalation. STAKEHOLDERS: I do not work alone, I involve the right people.',
    mantraAr: 'متحاربش لوحدك.. رتب مع الإدارات، خفف المقاومة، وصعّد باحترافية.',
    coachRuleEn: 'Solutions fail when done in a silo. Align with other departments, mitigate resistance, and escalate professionally when blocked.',
    coachRuleAr: 'مفيش مدير بيعيش في جزيرة لوحده.. نسّق مع الـ IT والمخازن والجودة بلغة الأرقام.',
    audioPromptText: `الخطوة السادسة... Stakeholders and Cross-functional. ...
...
اسمعني بهدوء يا قائد... معظم الحلول بتفشل مش عشان الفكرة وحشة... بتفشل عشان المدير فكّر ونفّذ لوحده في جزيرة معزولة! ...
Stakeholders equals Alignment. ...
...
مشاكل الفرع دايماً متقاطعة: نقص الكواشف مرتبط بالمشتريات والمخازن، بطء السيستم مرتبط بالـ IT، ومعايير السحب مرتبطة بالجودة. ...
لو حبيت تفرض سياسة جديدة، الناس هتقاومك طبيعي.
ذكاءك كـ Section Head بيظهر في كلمتين:
Mitigation... تخفيف المقاومة وإقناعهم بلغة المكسب المشترك والداتا.
وEscalation... التصعيد المحترف في التوقيت الصح لما المصلحة العامة تتعطل.
...
اسمعها وكررها:
الشركاء... يعني التنسيق والتحالف... Stakeholders equals Alignment.`,
    caseStudy: {
      context: 'رفض تمريض الفروع استخدام التابلت الإلكتروني الجديد في تسجيل المرضى بحجة بطئه',
      action: 'عقد اجتماع مشترك (Cross-functional) يضم ممثل التمريض وفريق الـ IT لتعديل واجهة الاستخدام وتدريبهم عملياً',
      metric: 'ارتفاع نسبة الالتزام من 25% إلى 100%',
    },
    deepDivePoints: [
      {
        heading: 'أصحاب المصلحة (Stakeholders)',
        explanation: 'أي طرف يتأثر بالقرار أو يؤثر فيه (الأطباء، التمريض، المشتريات، المريض، الإدارة العليا).',
        term: 'Stakeholders',
      },
      {
        heading: 'التخفيف والتصعيد (Mitigation & Escalation)',
        explanation: 'Mitigation = حل الخلافات بود واحترافية. Escalation = نقل القرار للمستوى الأعلى ببيانات موثقة دون شخصنة.',
        term: 'Mitigation & Escalation',
      },
    ],
    interactiveCheck: {
      question: 'مدير المشتريات بيرفض يشتري نوع معين من أنابيب الأطفال وبيقول غالي.. هتعمل إيه؟',
      options: [
        {
          text: 'أشتكيه فوراً للـ CEO وأقوله الراجل ده بيعطل الشغل ومبيفهمش.',
          isManagerMindset: false,
          feedback: 'تصعيد شخصي عدائي يكسر العلاقة بين الإدارات ويدل على ضعف المهارة القيادية.',
        },
        {
          text: 'أعرض عليه تقرير داتا: نسبة إعادة السحب وتكلفة هدر العينات وغضب أهالي الأطفال أكبر بكثير من فرق السعر.',
          isManagerMindset: true,
          feedback: 'قمة الاحترافية! Data-driven Stakeholder Mitigation.',
        },
      ],
    },
  },
  {
    id: 'followup',
    stepNumber: 7,
    keywordEn: 'FOLLOW-UP',
    keywordAr: 'المتابعة والتقفيل بالأرقام',
    titleEn: 'Follow-up, KPIs & Closure',
    titleAr: 'المتابعة والتقفيل بالأرقام (KPIs & Closure)',
    keyQuestionEn: 'How do I know the solution worked?',
    keyQuestionAr: 'إزاي أتأكد إن المشكلة ماتت وانتهت ومؤشر الأداء اتحسن؟',
    mantraEn: 'Follow-up. KPI. Closure. Documentation. FOLLOW-UP: I do not assume it worked, I measure and close.',
    mantraAr: 'مش بفترض إن الحل نجح.. بقيس بمؤشر KPI، بقفل المشكلة، وبوثق في الـ SOP.',
    coachRuleEn: 'Zero cases = Closure. Document the standard operating procedure so the win is permanent.',
    coachRuleAr: 'صفر حالات خطأ يعني إغلاق تام.. وثّق الإجراء عشان تفضل النتيجة مستدامة سنين قدام.',
    audioPromptText: `الخطوة السابعة والأخيرة... Follow-up and Closure. ...
...
وصلنا لمحطة التتويج يا بطل... اسمع النبرة دي وثبتها جواك:
Follow-up equals Closure. ...
...
عملت الخطوات الستة كلها؟ ممتاز... بس لو ما قستش النتيجة، كأنك معملتش حاجة!
مفيش حاجة اسمها 'الشباب قالولي الدنيا رايقة وبقت فل'...
المدير بيقول:
'معدل رفض العينات نزل من 8% إلى 0.4%'.
'متوسط وقت انتظار المريض نزل من 42 دقيقة لـ 14 دقيقة'.
'نسبة رضا العميل NPS ارتفعت لـ 92%'.
ولما الرقم يوصل للمستهدف، بنعمل حاجتين:
Closure... إغلاق رسمي للملف.
وDocumentation... توثيق الإجراء في دليل التشغيل عشان لو أي حد جديد جه يشتغل بنفس الجودة.
...
اسمعها وكررها دايماً:
المتابعة... يعني تقفيل ونجاح مثبت... Follow-up equals Closure.`,
    caseStudy: {
      context: 'بعد إطلاق سياسة التوريد السريع، هل اختفت شكاوى نقص المستهلكات فعلياً؟',
      action: 'متابعة أسبوعية لمدة شهرين متتاليين وسحب تقارير ERP دورية حتى تسجيل 0 شكوى لمدة 8 أسابيع متتالية',
      metric: 'KPI مستهدف: 0 شكاوى + إغلاق رسمي للملف وتوثيق الـ SOP',
    },
    deepDivePoints: [
      {
        heading: 'مؤشرات قياس الأداء (KPIs)',
        explanation: 'الرقم الحاسم الذي يترجم نجاح الإجراء التشغيلي بصورة ملموسة (TAT, NPS, Rejection Rate).',
        term: 'Key Performance Indicator (KPI)',
      },
      {
        heading: 'الإغلاق والتوثيق (Closure & Documentation)',
        explanation: 'الإعلان الرسمي عن انتهاء الأزمة وحفظ الطريقة في إجراءات العمل المعتمدة.',
        term: 'Closure & Documentation',
      },
    ],
    interactiveCheck: {
      question: 'طبقت نظام جديد في الاستقبال لتسريع سحب العينات.. إمتى تقول "أنا كدة خلصت المهمة بنجاح"؟',
      options: [
        {
          text: 'أول ما نركب السيستم الجديد والساحبين يشكروا فيه في اليوم الأول.',
          isManagerMindset: false,
          feedback: 'الانطباع المبدئي خادع ومبيثبتش استدامة النجاح.',
        },
        {
          text: 'لما تقارير الـ KPI تثبت استقرار الـ TAT تحت 15 دقيقة لمدة شهر، ونوثق الطريقة رسمي في دليل التشغيل.',
          isManagerMindset: true,
          feedback: '100%! دي عقلية التقفيل الاحترافية (Follow-up, KPI, and Closure).',
        },
      ],
    },
  },
];

export const THE_MANAGER_FORMULA = [
  {
    termEn: 'DATA',
    termAr: 'المشكلة والداتا',
    mantraEn: 'Problem = Data. I do not guess. I measure.',
    mantraAr: 'المشكلة تساوي داتا... مفيش تخمين، في قياس.',
    keyQuestion: 'What does the data say?',
    color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
  },
  {
    termEn: 'PRIORITY',
    termAr: 'الريسك والأولوية',
    mantraEn: 'Risk = Priority. Risk determines Priority.',
    mantraAr: 'الريسك يساوي أولوية... الخطر يحدد مين يتحل الأول.',
    keyQuestion: "What's the risk?",
    color: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
  },
  {
    termEn: 'OWNERSHIP',
    termAr: 'الأكشن الفوري والملكية',
    mantraEn: 'Action = Ownership. I take ownership and act.',
    mantraAr: 'الأكشن يساوي مسؤولية... شيل الليلة وتصرف فوراً.',
    keyQuestion: 'What can I do now?',
    color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
  },
  {
    termEn: 'RCA',
    termAr: 'السبب الجذري ومكان الخنقة',
    mantraEn: "RCA = Bottleneck. Don't treat the symptom.",
    mantraAr: 'الـ RCA يساوي خنقة... متسكنش العرض، هات الأصل.',
    keyQuestion: 'Why did it happen?',
    color: 'border-purple-500/50 text-purple-400 bg-purple-500/10',
  },
  {
    termEn: 'CAPA',
    termAr: 'الحل والوقاية وربط الاتفاقيات',
    mantraEn: 'CAPA = Fix & Prevent. SLA & Standardization.',
    mantraAr: 'الـ CAPA تساوي حل ووقاية... صلح النهار ده واقفل لبكرة.',
    keyQuestion: 'How do I fix it & prevent it?',
    color: 'border-rose-500/50 text-rose-400 bg-rose-500/10',
  },
  {
    termEn: 'STAKEHOLDERS',
    termAr: 'أصحاب المصلحة والتنسيق',
    mantraEn: 'Stakeholders = Alignment. Involve the right people.',
    mantraAr: 'الشركاء يساووا تحالف... متشتغلش لوحدك في جزيرة.',
    keyQuestion: 'Who needs to be involved?',
    color: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
  },
  {
    termEn: 'FOLLOW-UP',
    termAr: 'المتابعة والتقفيل بالأرقام',
    mantraEn: 'Follow-up = Closure. Measure and close.',
    mantraAr: 'المتابعة تساوي تقفيل... قيس بالـ KPI وقفل الحالة.',
    keyQuestion: 'How do I know it worked?',
    color: 'border-teal-500/50 text-teal-400 bg-teal-500/10',
  },
];

export const FULL_LESSON_AUDIO_SCRIPT = `أهلاً بيك في جلسة تدريب عقلية المدير... Manager Mode...
خد نَفَس عميق... وركز معايا في النبرة دي...
هدفي مش إنك تحفظ قائمة من 7 عناصر وتسمعهم زي التلميذ...
هدفي إنك مع التكرار والتدريب... تبدأ تسمع في عقلك الباطن الروابط دي تلقائياً وبوقفات حاسمة:

المشكلة... تساوي داتا...
Problem equals Data...

الريسك... يحدد الأولوية...
Risk equals Priority...

شفت المشكلة؟... خد أكشن فوري وشيل الليلة...
Action equals Ownership...

ماتعالجش العرض... دوّر على السبب الجذري ومكان الخنقة...
RCA equals Bottleneck...

صلّح النهارده... وامنع تكرارها بـ SLA وسياسة واضحة لبكرة...
CAPA equals Fix and Prevent...

متحاربش لوحدك... نسّق مع أصحاب المصلحة والإدارات المشتركة...
Stakeholders equals Alignment...

واخيراً... اتبع بالأرقام والـ KPI... واقفل الملف تماماً...
Follow-up equals Closure...

اسمع المعادلة كاملة مرة تانية بإيقاعها الهادئ والواثق:
DATA...
PRIORITY...
OWNERSHIP...
RCA...
CAPA...
STAKEHOLDERS...
FOLLOW-UP.

المشكلة؟... داتا!
الخطر؟... أولوية!
التصرف؟... مسؤولية!
السبب؟... خنقة!
الحل؟... وقاية!
الفريق؟... تنسيق!
والنهاية؟... تقفيل ونجاح بالأرقام!

يلا بينا نطبق المنهج ده عملياً في أصعب حالات التشغيل.`;

export const SIMULATION_PRESETS: SimulationCase[] = [
  {
    id: 'insurance-claims',
    title: 'تأخر موافقات التأمين الطبي وقت الذروة في فرع فيصل 10',
    category: 'عمليات الفروع وخدمة العملاء',
    problemStatement: 'تكدس 45 مريض في الصالة بسبب بطء بوابة التأمين الإلكترونية وتأخر الموافقات الطبية',
    data: 'متوسط الانتظار 38 دقيقة، 3 شركات تأمين رئيسية متوقفة، 45 مريض متأثر',
    risk: 'High Risk: غضب عارم في الصالة، إلغاء زيارات، وتأخر تشخيص حالات حرجة',
    immediateAction: 'تفعيل المسار السريع (Fast-Track) وأخذ بصمات وتعهدات ورقية لتنفيذ التحاليل فوراً دون حبس المريض',
    rootCause: 'الـ Bottleneck هو بطء السيرفر المركزي لشركة وساطة التأمين في أوقات الذروة الصباحية',
    capa: 'وضع بروتوكول Offline طارئ، وتحديد SLA ملزم مع شركات التأمين بالرد خلال 15 دقيقة كحد أقصى',
    stakeholders: 'إدارة الموافقات الطبية، فريق الـ IT، مدراء حسابات شركات التأمين، ومشرفي الاستقبال',
    kpiAndClosure: 'انخفاض وقت الانتظار إلى أقل من 12 دقيقة، ورضا العملاء 94%',
  },
  {
    id: 'reagents-shortage',
    title: 'نقص كواشف فحص السيولة والتجلط في 4 فروع رئيسية',
    category: 'سلاسل الإمداد والمشتريات',
    problemStatement: 'نفاد مفاجئ لكواشف التجلط PT/PTT مما تسبب في تحويل المرضى وتأخر العمليات الجراحية',
    data: '180 مريض معطلين، 4 فروع متأثرة، خسارة متوقعة 45,000 جنيه في يوم واحد',
    risk: 'Critical: تعريض حياة مرضى جراحات القلب والمخ للخطر وضرب مصداقية المعمل',
    immediateAction: 'توجيه سيارة الطوارئ السريعة لنقل كواشف من الفرع الإقليمي الأكبر خلال 45 دقيقة وسحب العينات فوراً',
    rootCause: 'غياب التنبيه المبكر (Reorder Point) على سيستم الـ ERP عند انخفاض المخزون للحد الحرج',
    capa: 'برمجة تنبيه آلي يمنع صرف آخر 20% إلا بطلب شراء تلقائي مسبق، مع SLA للمخازن المركزية بالتوريد الأسبوعي',
    stakeholders: 'المشتريات، المخازن المركزية، مديرو الفروع، وإدارة الجودة',
    kpiAndClosure: 'صفر حالات انقطاع للكواشف للشهر الثالث على التوالي',
  },
  {
    id: 'lis-downtime',
    title: 'انقطاع السيستم المركزي LIS أثناء تسليم النتائج',
    category: 'تكنولوجيا المعلومات والـ IT',
    problemStatement: 'انقطاع الاتصال بقاعدة البيانات المركزية لنتائج المعامل أثناء فترة خروج نتائج مرضى العيادات الخارجية',
    data: 'توقف طباعة 240 نتيجة، اتصال هاتفي من 85 مريض قلقين',
    risk: 'High: تذمر شديد وفقدان ثقة وسقوط خطوط الكول سنتر تحت الضغط',
    immediateAction: 'تشغيل بوابة الرسائل القصيرة SMS لإرسال النتائج الجاهزة المؤكدة على هواتف المرضى فوراً كـ PDF',
    rootCause: 'عطل في مفتاح التحويل (Core Switch) لمركز البيانات الرئيسي دون تحويل تلقائي للـ Redundant',
    capa: 'إصلاح السويتش، وتركيب خط اتصال احتياطي فوري Auto-failover، ومراجعة الـ Disaster Recovery SOP',
    stakeholders: 'فريق البنية التحتية IT، مدراء الفروع، مسؤولو الكول سنتر',
    kpiAndClosure: 'استقرار النظام بنسبة 99.9% وإغلاق الحادث مع تقرير RCA معتمد',
  },
];

export const SIMULATION_CASES = SIMULATION_PRESETS;

