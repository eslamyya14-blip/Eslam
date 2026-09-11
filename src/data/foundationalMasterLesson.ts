// Comprehensive Master Lesson Data: "MANAGER MODE — غيّر طريقة تفكيرك"
// Based directly on the user's verbatim coach script in Egyptian Arabic

export interface MasterChapter {
  id: string;
  stepNumber: number;
  keywordEn: string;
  keywordAr: string;
  titleAr: string;
  titleEn: string;
  narrativeText: string;
  keyQuestionEn: string;
  keyQuestionAr: string;
  goldenRuleEn: string;
  goldenRuleAr: string;
  pauseMantra: string;
  audioSpeechText: string;
}

export const MASTER_LESSON_INTRO = {
  title: '🎙️ MANAGER MODE — غيّر طريقة تفكيرك',
  subtitle: 'درس تأسيسي هادئ وواثق بالعامية المصرية ونبرة كوتش يدربك',
  introScript: `اسمع الدرس ده بهدوء... ومتستعجلش.
الهدف مش إنك تحفظ إنجليزي.
الهدف إنك تغيّر طريقة تفكيرك.
من النهارده... لما تشوف مشكلة...
مخك ما يقولش: "مين السبب؟"
مخك يقول:
What is the problem? إيه المشكلة؟
What does the data say? الأرقام بتقول إيه؟
وبعدها... What is the risk? إيه الخطر؟
وبعدها... What can I do now? أقدر أعمل إيه دلوقتي؟
وبعدها... Why did it happen? ليه حصلت؟
وبعدها... How do I fix it and prevent it? إزاي أصلحها... وأمنعها تتكرر؟
وبعدها... Who needs to be involved? مين لازم أشارك؟
وأخيرًا... How do I know the solution worked? إزاي أعرف إن الحل نجح؟

دي مش سبع أسئلة عشوائية. دي طريقة تفكير مدير.
احفظها كقصة واحدة:
Problem ... Risk ... Action ... Root Cause ... Solution ... People ... Results.
دلوقتي... هنفك القصة واحدة واحدة.`,
  coreQuestions: [
    { en: 'What is the problem?', ar: 'إيه المشكلة؟' },
    { en: 'What does the data say?', ar: 'الأرقام بتقول إيه؟' },
    { en: 'What is the risk?', ar: 'إيه الخطر؟' },
    { en: 'What can I do now?', ar: 'أقدر أعمل إيه دلوقتي؟' },
    { en: 'Why did it happen?', ar: 'ليه حصلت؟' },
    { en: 'How do I fix it and prevent it?', ar: 'إزاي أصلحها... وأمنعها تتكرر؟' },
    { en: 'Who needs to be involved?', ar: 'مين لازم أشارك؟' },
    { en: 'How do I know the solution worked?', ar: 'إزاي أعرف إن الحل نجح؟' },
  ],
};

export const MASTER_CHAPTERS: MasterChapter[] = [
  {
    id: 'one_data',
    stepNumber: 1,
    keywordEn: 'DATA',
    keywordAr: 'المشكلة والداتا',
    titleAr: 'المحور الأول: المشكلة والبيانات (Problem & Data)',
    titleEn: 'ONE — PROBLEM AND DATA',
    narrativeText: `جالك موظف وقال: "يا فندم شيت تسجيل حالات التأمين فيه مشكلة والناس بتنسى تسجل!"
المدير العادي يقول: "مين اللي نسي؟ هخصم له!"
المدير الذكي يقول: "استنى... وريني الداتا."
فتحنا الداتا ولقينا:
الشهر ده كان بيرجعلنا ثلاثين حالة منسية كل شهر.
ثلاثين حالة مش "إحساس". ثلاثين حالة ده رقم.
دي المشكلة.
قاعدتك الذهبية:
No data... no strong decision.
مفيش داتا... مفيش قرار قوي.
اسأل دائمًا: What does the data say? الأرقام بتقول إيه؟`,
    keyQuestionEn: 'What does the data say?',
    keyQuestionAr: 'الأرقام بتقول إيه بالدقة؟',
    goldenRuleEn: 'No data... no strong decision.',
    goldenRuleAr: 'مفيش داتا... مفيش قرار قوي. أنا لا أخمن... أنا أقيس.',
    pauseMantra: 'Problem = Data',
    audioSpeechText: `المحور الأول... Problem and Data. ... اسمع بهدوء: ... جالك موظف وقال: "يا فندم شيت تسجيل حالات التأمين فيه مشكلة والناس بتنسى تسجل!" ... المدير العادي يقول: مين اللي نسي هخصم له! ... لكن المدير الذكي يقول: استنى... وريني الداتا. ... فتحنا الداتا ولقينا: بيرجعلنا 30 حالة منسية كل شهر. ... 30 حالة مش إحساس... ده رقم. ... قاعدتك الذهبية: No data... no strong decision. ... مفيش داتا... مفيش قرار قوي. ... المشكلة يعني داتا... Problem equals Data.`,
  },
  {
    id: 'two_priority',
    stepNumber: 2,
    keywordEn: 'PRIORITY',
    keywordAr: 'الريسك والأولوية',
    titleAr: 'المحور الثاني: الخطر والأولوية (Risk & Priority)',
    titleEn: 'TWO — RISK AND PRIORITY',
    narrativeText: `عرفنا المشكلة: ثلاثين حالة بتضيع.
نسأل: ما هو الخطر؟ What is the risk?
لو المشكلة دي بتأخر موافقة عملية لمريض... يبقى الخطر عالي.
لو بتأخر تقرير روتيني... الخطر متوسط.
المدير يرتب أولوياته بناءً على الخطر.
وده اسمه: Prioritization.
ترتيب الأولويات.
قاعدتك الذهبية:
Risk determines Priority.
الخطر هو اللي يحدد الأولوية.`,
    keyQuestionEn: 'What is the risk?',
    keyQuestionAr: 'ما هو الخطر الحقيقي على المريض والتشغيل؟',
    goldenRuleEn: 'Risk determines Priority.',
    goldenRuleAr: 'الخطر هو اللي يحدد الأولوية. أنا لا أشتت نفسي... أنا أحدد الأهم.',
    pauseMantra: 'Risk = Priority',
    audioSpeechText: `المحور الثاني... Risk and Priority. ... عرفنا المشكلة: 30 حالة بتضيع. ... نسأل بهدوء: What is the risk? ما هو الخطر؟ ... لو المشكلة دي بتأخر موافقة علاج أو عملية لمريض... يبقى الخطر عالي جداً. ... لو بتأخر تقرير روتيني... الخطر متوسط. ... المدير يرتب أولوياته بناءً على الخطر. وده اسمه: Prioritization. ... قاعدتك الذهبية: Risk determines Priority. ... الخطر هو اللي يحدد الأولوية. ... الخطر يعني أولوية... Risk equals Priority.`,
  },
  {
    id: 'three_action',
    stepNumber: 3,
    keywordEn: 'OWNERSHIP',
    keywordAr: 'التصرف والملكية',
    titleAr: 'المحور الثالث: التصرف الفوري والمسؤولية (Action & Ownership)',
    titleEn: 'THREE — IMMEDIATE ACTION',
    narrativeText: `الخطر عالي... يبقى أقدر أعمل إيه دلوقتي حالاً؟
What can I do now?
ما تقولش: "هستنى الشركة تصلح السيستم الشهر الجاي."
المدير ما يستناش.
نعمل مسار بديل فورًا:
"يا شباب... لحد ما السيستم يتصلح، هنعمل شيت طوارئ مشترك مؤقت لمتابعة الحالات دي يدويًا أول بأول."
ده اسمه: Immediate Action.
تصرف فوري.
ولما تاخد خطوة زي دي... أنت كمدير بتاخد: Ownership.
الملكية... والمسؤولية.
قاعدتك الذهبية:
Problem identified? Take Ownership. Take Action.
عرفت المشكلة؟ تحمّل المسؤولية... واتحرك.`,
    keyQuestionEn: 'What can I do now?',
    keyQuestionAr: 'أقدر أعمل إيه دلوقتي حالاً لإخماد الحريق؟',
    goldenRuleEn: 'Problem identified? Take Ownership. Take Action.',
    goldenRuleAr: 'عرفت المشكلة؟ تحمّل المسؤولية... واتحرك فوراً.',
    pauseMantra: 'Action = Ownership',
    audioSpeechText: `المحور الثالث... Immediate Action and Ownership. ... الخطر عالي... يبقى أقدر أعمل إيه دلوقتي حالاً؟ What can I do now? ... متقولش: هستنى الشركة تصلح السيستم الشهر الجاي. ... المدير ما يستناش. ... نعمل مسار بديل فوراً: شيت طوارئ مشترك مؤقت لمتابعة الحالات أول بأول. ... ده اسمه: Immediate Action. ولما تاخد خطوة زي دي... أنت كمدير بتاخد: Ownership. ... قاعدتك الذهبية: Problem identified? Take Ownership. Take Action. ... التصرف يعني مسؤولية... Action equals Ownership.`,
  },
  {
    id: 'four_rca',
    stepNumber: 4,
    keywordEn: 'RCA',
    keywordAr: 'السبب الجذري',
    titleAr: 'المحور الرابع: تحليل السبب الجذري والخنقة (RCA & Bottleneck)',
    titleEn: 'FOUR — RCA (Root Cause Analysis)',
    narrativeText: `حلينا الموقف مؤقتًا.
لكن... ليه المشكلة حصلت أصلًا؟
Why did it happen?
هنا المدير ما يلومش الناس.
المدير يبحث عن: Root Cause. السبب الجذري.
ده اسمه: RCA (Root Cause Analysis).
نسأل خمس مرات: "ليه؟"
ليه الحالات بتضيع؟
الموظف بينسى يسجل.
ليه بينسى؟
الشيت مش سهل يتفتح من الموبايل.
ليه؟
عشان معندهمش إنترنت سريع في العيادات الخارجية.
هنا اكتشفنا:
السبب الحقيقي مش إهمال الموظف.
السبب الحقيقي: ضعف شبكة الإنترنت وصعوبة فتح الشيت.
وده اسمه: Bottleneck.
عنق الزجاجة. الخنقة اللي معطلة الشغل.
قاعدتك الذهبية:
Don't treat the symptom. Find the Root Cause.
ما تعالجش العَرَض... ابحث عن السبب الجذري.`,
    keyQuestionEn: 'Why did it happen?',
    keyQuestionAr: 'ليه المشكلة حصلت أصلًا؟ وأين عنق الزجاجة؟',
    goldenRuleEn: "Don't treat the symptom. Find the Root Cause.",
    goldenRuleAr: 'ما تعالجش العَرَض... ابحث عن السبب الجذري وعنق الزجاجة.',
    pauseMantra: 'RCA = Bottleneck',
    audioSpeechText: `المحور الرابع... Root Cause Analysis. ... حلينا الموقف مؤقتاً... لكن ليه المشكلة حصلت أصلاً؟ Why did it happen? ... هنا المدير ما يلومش الناس... المدير يبحث عن: Root Cause. ... ده اسمه: RCA. ... نسأل 5 مرات: ليه؟ ... ليه الحالات بتضيع؟ الموظف بينسى يسجل. ... ليه بينسى؟ الشيت مش سهل يتفتح من الموبايل. ... ليه؟ معندهمش إنترنت سريع في العيادات الخارجية. ... هنا اكتشفنا عنق الزجاجة: Bottleneck. ... قاعدتك الذهبية: Don't treat the symptom. Find the Root Cause. ... الخنقة يعني جذر المشكلة... RCA equals Bottleneck.`,
  },
  {
    id: 'five_capa',
    stepNumber: 5,
    keywordEn: 'CAPA',
    keywordAr: 'الحل والمنع',
    titleAr: 'المحور الخامس: الإجراءات التصحيحية والوقائية والـ SLA (CAPA)',
    titleEn: 'FIVE — CAPA (Fix & Prevent)',
    narrativeText: `عرفنا السبب: الإنترنت وصعوبة إدخال البيانات.
نسأل: إزاي أصلح المشكلة... وأمنعها تتكرر؟
How do I correct it... and how do I prevent it?
ده اسمه: CAPA.
Corrective Action: صلّحنا المشكلة القديمة ودخلنا الثلاثين حالة المتأخرة.
Preventive Action: عملنا نموذج جوجل بسيط وسريع يتفتح بزرار واحد من الموبايل حتى لو النت ضعيف.
وحددنا وقت ملزم:
"أي حالة تدخل لازم تتسجل خلال ثلاثين دقيقة."
ده اسمه: SLA (Service Level Agreement).
اتفاقية مستوى الخدمة.
وجربنا الحل أسبوعين عشان نتأكد:
ده اسمه: Trial Period.
فترة تجربة.
ولما نجح... عممناه على كل الأقسام:
ده اسمه: Standardization.
التوحيد القياسي.
قاعدتك الذهبية:
Fix it today. Prevent it forever.
صلّحها النهاردة... وامنعها للأبد.`,
    keyQuestionEn: 'How do I fix it and prevent it?',
    keyQuestionAr: 'إزاي أصلح المشكلة... وأمنعها تتكرر مدى الحياة؟',
    goldenRuleEn: 'Fix it today. Prevent it forever.',
    goldenRuleAr: 'صلّحها النهاردة... وامنعها للأبد بسياسة موحدة وSLA ملزمة.',
    pauseMantra: 'CAPA = Fix & Prevent',
    audioSpeechText: `المحور الخامس... CAPA and Standardization. ... عرفنا السبب: الإنترنت وصعوبة إدخال البيانات. ... نسأل: إزاي أصلح المشكلة وأمنعها تتكرر؟ How do I correct it and how do I prevent it? ... ده اسمه: CAPA. ... Corrective Action: صلحنا القديم وسجلنا الحالات. ... Preventive Action: عملنا نموذج خفيف بضغطة زر من الموبايل. ... وحددنا وقت ملزم: التسجيل خلال 30 دقيقة. وده اسمه: SLA. ... وجربناه أسبوعين: Trial Period. ... ولما نجح عممناه: Standardization. ... قاعدتك الذهبية: Fix it today. Prevent it forever. ... الحل يعني وقاية... CAPA equals Fix & Prevent.`,
  },
  {
    id: 'six_stakeholders',
    stepNumber: 6,
    keywordEn: 'STAKEHOLDERS',
    keywordAr: 'الشركاء والتنسيق',
    titleAr: 'المحور السادس: الأطراف المعنية وإدارة المقاومة (Stakeholders & RACI)',
    titleEn: 'SIX — STAKEHOLDERS',
    narrativeText: `المدير ما يشتغلش لوحده في جزيرة منعزلة.
مين لازم يشارك؟
Who needs to be involved?
دول اسمهم: Stakeholders.
الأطراف المعنية.
قعدنا مع الـ IT: عشان يقووا شبكة الواي فاي.
قعدنا مع التمريض والاستقبال: ودربناهم على الفورم الجديد.
ده اسمه: Cross-functional coordination.
التنسيق بين الإدارات المختلفة.
لو موظف قديم قال: "أنا متعود على الشيت القديم ومش هغيّر!"
المدير الذكي ما يتخانقش.
يقعد معاه ويوضح له: "الفورم الجديد هيوفر وقتك وهيقلل أخطاءك."
ده اسمه: Mitigation.
تقليل المقاومة وتسهيل التغيير.
ولو حد رفض تمامًا يتعاون ويعطل الشغل؟
هنا المدير يعمل: Escalation.
تصعيد إداري هادئ ومدروس للمدير الأعلى.
قاعدتك الذهبية:
A manager aligns people. A manager doesn't work alone.
المدير ينسق مع الناس... المدير لا يعمل بمفرده.`,
    keyQuestionEn: 'Who needs to be involved?',
    keyQuestionAr: 'مين لازم أشارك؟ وإزاي أتعامل مع المقاومة؟',
    goldenRuleEn: "A manager aligns people. A manager doesn't work alone.",
    goldenRuleAr: 'المدير ينسق مع الناس... المدير لا يعمل بمفرده أبداً.',
    pauseMantra: 'Stakeholders = RACI Alignment',
    audioSpeechText: `المحور السادس... Stakeholders and Alignment. ... المدير ما يشتغلش لوحده في جزيرة منعزلة. ... مين لازم يشارك؟ Who needs to be involved? ... دول اسمهم: Stakeholders. ... قعدنا مع الـ IT عشان شبكة الواي فاي. قعدنا مع التمريض والاستقبال ودربناهم. ... ده اسمه: Cross-functional coordination. ... ولو موظف قديم قاوم التغيير؟ نفهمه بهدوء إنه هيوفر وقته... وده اسمه: Mitigation. ... ولو تعنت؟ نعمل تصعيد منظم: Escalation. ... قاعدتك الذهبية: A manager aligns people. A manager doesn't work alone. ... الشركاء يعني تناغم وتنسيق... Stakeholders equals RACI Alignment.`,
  },
  {
    id: 'seven_followup',
    stepNumber: 7,
    keywordEn: 'FOLLOW-UP',
    keywordAr: 'المتابعة والقياس',
    titleAr: 'المحور السابع: المتابعة والـ KPIs والإغلاق التام (Follow-up & Closure)',
    titleEn: 'SEVEN — FOLLOW-UP AND KPIs',
    narrativeText: `طبقنا الحل... وشاركنا الناس...
السؤال الأخير:
إزاي أعرف إن الحل نجح؟
How do I know the solution worked?
المدير لا يفترض. المدير يتابع: Follow-up.
بعد شهر... فتحنا الأرقام تاني.
لقينا الحالات المنسية نزلت من:
ثلاثين حالة... إلى صفر!
Zero cases.
هنا نقدر نقول: المشكلة اتحلت رسميًا.
وده اسمه: KPI (Key Performance Indicator).
مؤشر الأداء الرئيسي.
وبعدها نعمل: Closure.
إغلاق رسمي للمشكلة.
ونسجل كل اللي عملناه في ملف التدريب: Documentation.
قاعدتك الذهبية:
If you cannot measure it... you cannot manage it.
لو مش قادر تقيسه... مش هتعرف تديره.`,
    keyQuestionEn: 'How do I know the solution worked?',
    keyQuestionAr: 'إزاي أعرف إن الحل نجح بالأرقام؟',
    goldenRuleEn: 'If you cannot measure it... you cannot manage it.',
    goldenRuleAr: 'لو مش قادر تقيسه... مش هتعرف تديره. نقيس ونغلق الملف.',
    pauseMantra: 'Follow-up = Closing Loop',
    audioSpeechText: `المحور السابع... Follow-up and Closure. ... طبقنا الحل وشاركنا الناس... السؤال الأخير: How do I know the solution worked? إزاي أعرف إن الحل نجح؟ ... المدير لا يفترض... المدير يتابع: Follow-up. ... بعد شهر فتحنا الأرقام: لقينا الحالات المنسية نزلت من 30 لصفر! ... هنا نقدر نقول: المشكلة اتحلت رسمياً. ... ده اسمه: KPI. ومؤشر الأداء أثبت النجاح. ... وبعدها نعمل إغلاق رسمي للملف: Closure. ونسجل كل حاجة: Documentation. ... قاعدتك الذهبية: If you cannot measure it... you cannot manage it. ... المتابعة يعني إغلاق الحلقة... Follow-up equals Closing Loop.`,
  },
];

export const ONE_BREATH_STORY = {
  title: 'الآن... القصة كلها في نفس واحد',
  subtitle: 'The One-Breath Story — طريقة سرد الأزمة أمام اللجنة بدون ارتباك',
  text: `مشكلة؟ Problem and Data. بالأرقام: Data-driven.
خطر؟ Risk and Priority. رتب: Prioritization.
تحرك: Immediate Action. وخد: Ownership.
دور على السبب: RCA. اكتشف: Root Cause. حدد: Bottleneck.
حل: CAPA. صحح: Corrective Action. امنع: Preventive Action.
حدد الوقت: SLA. جرّب: Trial Period. وحّد: Standardization.
شارك: Stakeholders. نسّق: Cross-functional. قلل المقاومة: Mitigation. ولو مفيش تعاون: Escalation.
وبعد التنفيذ: Follow-up. قِس: KPI. اقفل: Closure. وسجل: Documentation.`,
  audioSpeechText: `اسمع القصة كلها في نفس واحد يا بطل: ...
مشكلة؟ Problem and Data. بالأرقام: Data-driven. ...
خطر؟ Risk and Priority. رتب: Prioritization. ...
تحرك: Immediate Action. وخد: Ownership. ...
دور على السبب: RCA. اكتشف: Root Cause. حدد: Bottleneck. ...
حل: CAPA. صحح: Corrective Action. امنع: Preventive Action. ...
حدد الوقت: SLA. جرّب: Trial Period. وحّد: Standardization. ...
شارك: Stakeholders. نسّق: Cross-functional. قلل المقاومة: Mitigation. ولو مفيش تعاون: Escalation. ...
وبعد التنفيذ: Follow-up. قِس: KPI. اقفل: Closure. وسجل: Documentation. ...
دي القصة كلها... احفظ إيقاعها في عقلك!`,
};

export const THE_MANAGER_FORMULA = {
  title: '🔥 THE MANAGER FORMULA',
  subtitle: 'معادلة المدير السبعة — 7 مبادئ محفورة في العقل',
  mantras: [
    { en: 'DATA', textEn: 'I do not guess. I measure.', textAr: 'أنا لا أخمّن. أنا أقيس.' },
    { en: 'PRIORITY', textEn: 'I do not distract myself. I prioritize.', textAr: 'أنا لا أشتت نفسي. أنا أحدد الأهم.' },
    { en: 'OWNERSHIP', textEn: 'I do not wait. I act.', textAr: 'أنا لا أنتظر. أنا أتحرك.' },
    { en: 'RCA', textEn: 'I do not treat the symptom. I find the cause.', textAr: 'أنا لا أعالج العرض. أنا أبحث عن السبب.' },
    { en: 'CAPA', textEn: 'I do not just fix it. I prevent it.', textAr: 'أنا لا أصلح المشكلة فقط. أنا أمنع تكرارها.' },
    { en: 'STAKEHOLDERS', textEn: 'I do not work alone. I align people.', textAr: 'أنا لا أعمل وحدي. أنا أشرك الناس الصح.' },
    { en: 'FOLLOW-UP', textEn: 'I do not assume. I measure and close.', textAr: 'أنا لا أفترض إن الحل نجح. أنا أقيس. وأغلق.' },
  ],
  audioSpeechText: `معادلة المدير الذهبية: ...
DATA. أنا لا أخمّن... أنا أقيس. ...
PRIORITY. أنا لا أشتت نفسي... أنا أحدد الأهم. ...
OWNERSHIP. أنا لا أنتظر... أنا أتحرك. ...
RCA. أنا لا أعالج العرض... أنا أبحث عن السبب. ...
CAPA. أنا لا أصلح المشكلة فقط... أنا أمنع تكرارها. ...
STAKEHOLDERS. أنا لا أعمل وحدي... أنا أشرك الناس الصح. ...
FOLLOW-UP. أنا لا أفترض إن الحل نجح... أنا أقيس... وأغلق.`,
};

export const MEMORY_CHAIN = {
  en: 'DATA → PRIORITY → OWNERSHIP → RCA → CAPA → STAKEHOLDERS → FOLLOW-UP',
  ar: 'بيانات ... أولوية ... مسؤولية ... سبب جذري ... حل ومنع ... أطراف معنية ... متابعة وقياس',
  audioSpeechText: `احفظ الترتيب ده زي اسمك: ... DATA ... PRIORITY ... OWNERSHIP ... RCA ... CAPA ... STAKEHOLDERS ... FOLLOW-UP ... وبيانات ... أولوية ... مسؤولية ... سبب جذري ... حل ومنع ... أطراف معنية ... متابعة وقياس.`,
};

export const FINAL_MINDSET_TEST = {
  title: '🎯 آخر اختبار: كيف يتصرف المدير الحقيقي عند مواجهة المشاكل؟',
  subtitle: 'Mindset Check — تحول رد الفعل الغريزي من الخوف واللوم إلى القيادة الهادئة',
  contrastBad: {
    title: 'المدير الضعيف (Panic & Blame)',
    points: [
      'يعمل Panic ويتوتر أمام الموظفين والعملاء.',
      'يدور على شخص يلومه: "مين السبب؟ مين المقصر؟"',
      'يتنصل من المسؤولية: "السيستم واقع وكلموا الـ IT".',
      'يسكن العرض بمسكن مؤقت دون البحث عن عنق الزجاجة.',
    ],
  },
  contrastGood: {
    title: 'المدير المحترف (Manager Mode)',
    points: [
      'يسأل بهدوء: What does the data say? (الأرقام بتقول إيه؟)',
      'يحدد الخطر: What is the risk? (حجم الخطر على المريض والتشغيل)',
      'يتحرك فوراً: What can I do now? (أنا واخد المسؤولية وبحتوي الموقف)',
      'يبحث عن الجذر: Why did it happen? (الـ 5 Whys وتحديد الـ Bottleneck)',
      'يمنع التكرار: How do I correct it and prevent it? (CAPA وSLA ملزمة)',
      'يشرك الفريق: Who needs to be involved? (RACI والتنسيق المشترك)',
      'يقيس النتيجة: How do I measure success? (مؤشرات الـ KPI والإغلاق التام)',
    ],
  },
  conclusion: `See the problem.
Understand the risk.
Take ownership.
Find the root cause.
Fix it.
Prevent it.
Involve the right people.
Measure the result.
Close the problem.

دي طريقة تفكير الـ Manager.
من النهارده... أنت مش موظف بتنفذ أوامر... أنت مدير بتدير المنظومة بعقلية واثقة وهادية.`,
  audioSpeechText: `آخر اختبار... لما المدير يشوف مشكلة: ... ما يعملش Panic. ... ما يدورش على شخص يلومه. ... ما يقولش: مين السبب؟ ...
المدير يسأل: What does the data say? ...
ثم: What is the risk? ...
ثم: What can I do now? ...
ثم: Why did it happen? ...
ثم: How do I correct it and prevent it? ...
ثم: Who needs to be involved? ...
ثم: How do I measure success? ...
See the problem. ... Understand the risk. ... Take ownership. ... Find the root cause. ... Fix it. ... Prevent it. ... Involve the right people. ... Measure the result. ... Close the problem. ...
دي طريقة تفكير الـ Manager. من النهارده... أنت قائد منظومة واثق وهادئ!`,
};
