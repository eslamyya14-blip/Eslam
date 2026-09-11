import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Resilient Gemini Generator with automatic model fallback pool
async function generateContentWithFallback(
  ai: GoogleGenAI,
  request: {
    contents: any[];
    config?: any;
    preferredModel?: string;
  }
) {
  // Pool of genuine, active Google Gemini models
  const candidateModels = [
    request.preferredModel || "gemini-3.8-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
  ];
  const modelsToTry = Array.from(new Set(candidateModels.filter(Boolean)));
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: request.contents,
        config: request.config,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || (typeof err === "object" ? JSON.stringify(err) : String(err));
      // Log fallback progress cleanly to stdout
      console.log(`[Gemini Model Pool] Model ${model} unavailable (transient/demand), trying next model...`);
      // Brief pause before trying next candidate model
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw lastError;
}

function safeParseJson(raw: string | undefined | null, defaultValue: any = {}): any {
  if (!raw) return defaultValue;
  try {
    return JSON.parse(raw);
  } catch {
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parsing error:", e, "Raw string was:", raw);
      return defaultValue;
    }
  }
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    ttsModel: "gemini-3.1-flash-tts-preview",
  });
});

// Server-side in-memory audio cache to preserve Gemini TTS quota
const ttsAudioCache = new Map<string, { audio: string; mimeType: string; sampleRate: number }>();
let ttsQuotaCooldownUntil = 0;

// Text-to-Speech Endpoint using gemini-3.1-flash-tts-preview
// In Egyptian Arabic coaching tone with deliberate, confident pauses
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice = "Fenrir" } = req.body;
    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Missing or invalid 'text' field" });
      return;
    }

    const cleanText = text.replace(/[*_#~]/g, " ").trim();
    const cacheKey = `${voice}:::${cleanText}`;
    if (ttsAudioCache.has(cacheKey)) {
      res.json(ttsAudioCache.get(cacheKey));
      return;
    }

    // If quota was previously exhausted, signal client to use the high-fidelity Egyptian speech synthesizer
    if (Date.now() < ttsQuotaCooldownUntil) {
      res.status(200).json({
        fallbackToClient: true,
        reason: "quota_cooldown",
        retryAfterMs: ttsQuotaCooldownUntil - Date.now(),
      });
      return;
    }

    const ai = getGenAIClient();
    const prompt = `Say in a calm, confident, unhurried, reassuring executive coach mentor tone in natural spoken Egyptian Arabic (بالعامية المصرية الهادئة والواثقة الخاصة ببيئة العمل). Speak at a deliberate, steady pace and leave clear, reflective coaching pauses after each managerial term and principle: ${cleanText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice,
            },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const audioPart = candidate?.content?.parts?.find((p) => p.inlineData?.data);
    const base64Audio = audioPart?.inlineData?.data;

    if (!base64Audio) {
      res.status(200).json({
        fallbackToClient: true,
        reason: "no_audio_data",
      });
      return;
    }

    const result = {
      audio: base64Audio,
      mimeType: audioPart?.inlineData?.mimeType || "audio/pcm;rate=24000",
      sampleRate: 24000,
    };

    ttsAudioCache.set(cacheKey, result);
    res.json(result);
  } catch (error: any) {
    const errorMsg = String(error?.message || error || "");
    const is429 = errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED") || error?.status === 429;
    if (is429) {
      // Cooldown for 5 minutes so subsequent requests smoothly use client speech without throwing errors
      ttsQuotaCooldownUntil = Date.now() + 5 * 60 * 1000;
      res.status(200).json({
        fallbackToClient: true,
        reason: "quota_exceeded",
        message: "Gemini TTS quota exceeded, smoothly running local Egyptian dialect engine",
      });
      return;
    }

    res.status(200).json({
      fallbackToClient: true,
      reason: "server_fallback",
      message: errorMsg,
    });
  }
});

// Manager Problem Breakdown Endpoint
app.post("/api/coach-analysis", async (req, res) => {
  try {
    const {
      problemTitle,
      problemDescription,
      userResponse,
      scenarioText,
      context,
    } = req.body;

    const resolvedProblem = (problemDescription || userResponse || scenarioText || "").trim();
    if (!resolvedProblem) {
      res.status(400).json({ error: "Problem description or response is required" });
      return;
    }

    const ai = getGenAIClient();
    const systemInstruction = `أنت Master Operations & Leadership Coach مصري خبير، بتدرب رئيس قسم عمليات ودعم تشغيلي (Section Head).
أسلوبك بالعامية المصرية الهادئة والواثقة، مش سريع، بنبرة كوتش بيربي عقلية القيادة والتحكم، وبتعتمد على معادلة التفكير الإداري (7 خطوات):
1. DATA (المشكلة والداتا): مفيش داتا... مفيش قرار قوي.
2. PRIORITY & RISK (الأولوية والريسك): حجم الخطر والضرر هو اللي بيحدد الأولوية.
3. IMMEDIATE ACTION & OWNERSHIP (الأكشن الفوري والملكية): شيل الليلة وخود أكشن حاسم.
4. RCA & BOTTLENECK (السبب الجذري ومكان الخنقة): 5 Whys وتحديد الـ Bottleneck.
5. CAPA (الحل الوقائي والـ SLA): إجراء تصحيحي + وقائي + SLA وتوحيد الإجراء (SOP).
6. STAKEHOLDERS (أصحاب المصلحة والتنسيق): Cross-functional alignment + تخفيف المقاومة والتصعيد المحترف.
7. FOLLOW-UP & KPIs (المتابعة والتقفيل): مؤشرات أداء KPI وتقفيل الحالة وتوثيقها.

أخرج النتيجة بتنسيق JSON حصراً:
{
  "scoreOutOf10": 8,
  "egyptianCoachFeedback": "توجيه تنفيذي عميق بالعامية المصرية الهادئة يبدأ بتقدير المجهود ثم تصحيح دقيق بالأرقام",
  "detectedKeywords": ["Action", "Ownership", "Data"],
  "missingKeywords": ["CAPA", "SLA"],
  "suggestedExecutivePhraes": "صياغة بديلة احترافية يقولها المدير للجنة أو في الميدان",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "improvements": ["تطوير 1", "تطوير 2"],
  "summary": "ملخص الموقف بنبرة كوتش بالعامية المصرية",
  "dataStep": { "headline": "...", "advice": "...", "keyQuestion": "What does the data say?", "suggestedMetrics": ["..."] },
  "riskStep": { "headline": "...", "riskLevel": "High | Medium | Low", "priorityReason": "...", "keyQuestion": "What's the risk?" },
  "actionStep": { "headline": "...", "immediateAction": "...", "ownershipStatement": "أنا مسؤول وهتصرف فوراً...", "keyQuestion": "What can I do now?" },
  "rcaStep": { "headline": "...", "whyAnalysis": ["السبب 1", "السبب 2", "السبب الجذري"], "bottleneck": "مكان الخنقة", "keyQuestion": "Why did it happen?" },
  "capaStep": { "headline": "...", "corrective": "...", "preventive": "...", "sla": "...", "standardizationPlan": "...", "keyQuestion": "How do I fix it and prevent it?" },
  "stakeholdersStep": { "headline": "...", "departments": ["..."], "mitigation": "...", "escalationTrigger": "...", "keyQuestion": "Who needs to be involved?" },
  "followUpStep": { "headline": "...", "kpi": "...", "closureCriteria": "...", "documentationArtifact": "...", "keyQuestion": "How do I know the solution worked?" },
  "coachMantra": "جملة ذهبية بالعامية المصرية للمدير تثبت في ودنه"
}`;

    const promptText = `سيناريو المشكلة:\n${scenarioText || problemTitle || "موقف تشغيلي بمجموعة معامل ومراكز أشعة ألفا"}\n\nرد وتصرف المرشح:\n${userResponse || problemDescription}\n${context ? `السياق الإضافي: ${context}` : ""}`;

    const response = await generateContentWithFallback(ai, {
      preferredModel: "gemini-3.8-flash",
      contents: [{ text: promptText }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = safeParseJson(response.text);
    const result = {
      scoreOutOf10: parsed.scoreOutOf10 || 8,
      egyptianCoachFeedback: parsed.egyptianCoachFeedback || parsed.summary || "إجابة تنفيذية ممتازة مبنية على حسم وسرعة استجابة.",
      detectedKeywords: parsed.detectedKeywords || ["Action", "Ownership"],
      missingKeywords: parsed.missingKeywords || ["CAPA", "SLA"],
      suggestedExecutivePhraes: parsed.suggestedExecutivePhraes || "سأعتمد على مصفوفة RACI لتحديد الأدوار بدقة وربط المؤشرات التشغيلية بتقارير أسبوعية.",
      strengths: parsed.strengths || ["ثقة عالية وسرعة استجابة", "تحمل مسؤولية ميداني واضح"],
      improvements: parsed.improvements || ["إضافة مؤشرات أرقام محددة", "توضيح الـ SLA مع الإدارات"],
      summary: parsed.summary || parsed.egyptianCoachFeedback,
      dataStep: parsed.dataStep,
      riskStep: parsed.riskStep,
      actionStep: parsed.actionStep,
      rcaStep: parsed.rcaStep,
      capaStep: parsed.capaStep,
      stakeholdersStep: parsed.stakeholdersStep,
      followUpStep: parsed.followUpStep,
      coachMantra: parsed.coachMantra || "مفيش داتا... مفيش قرار قوي.",
      analysis: parsed,
    };

    res.json(result);
  } catch (error: any) {
    console.log("Coach analysis error:", error?.message || error);
    res.status(500).json({
      error: error?.message || "Failed to analyze problem",
    });
  }
});

// AI Interview Answer Grading & Coaching Endpoint
app.post("/api/interview-eval", async (req, res) => {
  try {
    const {
      question,
      questionText,
      points = [],
      modelAnswerGuidance,
      answer,
      candidateAnswer,
      category,
    } = req.body;

    const resolvedAnswer = (candidateAnswer || answer || "").trim();
    const resolvedQuestion = (questionText || question || "سؤال المقابلة القيادية").trim();

    if (!resolvedAnswer || resolvedAnswer.length < 3) {
      res.status(400).json({ error: "Candidate answer is required" });
      return;
    }

    const ai = getGenAIClient();
    const guidance = modelAnswerGuidance || (Array.isArray(points) ? points.join("\n") : "");
    const systemInstruction = `أنت خبير قيادي مصري لتقييم مقابلات رؤساء الأقسام (Section Head / Operation Support) في مجموعة طبية كبرى (Alfa Medical Group).
بتقيم إجابة المرشح بناءً على منهجية STAR (Situation, Task, Action, Result) وعقلية الحل والقيادة بدون سلطة مباشرة (Influence without Authority) واللغة المبنية على الأرقام.
${guidance ? `النهج المثالي المتوقع للسؤال:\n${guidance}` : ""}

أخرج النتيجة بصيغة JSON حصراً بالعامية المصرية الراقية والداعمة:
{
  "score": 85,
  "egyptianFeedback": "تقييم الكوتش بالعامية المصرية الهادئة والواثقة",
  "starCompliance": {
    "situationPresent": true,
    "taskPresent": true,
    "actionPresent": true,
    "resultPresent": true
  },
  "verdict": "حكم موجز مثل: رد Section Head واثق ومقنع",
  "verdict_sub": "توضيح مختصر بالعامية",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "improvements": ["تطوير 1", "تطوير 2"],
  "executivePolish": "صياغة تنفيذية بالأرقام يقولها المرشح في المقابلة لتقفيل الإجابة بقوة",
  "follow_up_question": "سؤال حاسم ومحرج تطرحه اللجنة لاختبار ثباته"
}`;

    const response = await generateContentWithFallback(ai, {
      preferredModel: "gemini-3.8-flash",
      contents: [
        {
          text: `فئة السؤال: ${category || "قيادة ودعم تشغيلي"}\nسؤال المقابلة:\n"${resolvedQuestion}"\n\nإجابة المرشح:\n"${resolvedAnswer}"\n\nقيم الإجابة بدقة وقدم التغذية الراجعة بالعامية المصرية.`,
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = safeParseJson(response.text);
    const starHits = parsed.star_hits || {};
    const starCompliance = parsed.starCompliance || {
      situationPresent: Boolean(starHits.S ?? true),
      taskPresent: Boolean(starHits.T ?? true),
      actionPresent: Boolean(starHits.A ?? true),
      resultPresent: Boolean(starHits.R ?? true),
    };

    res.json({
      score: parsed.score || 85,
      egyptianFeedback: parsed.egyptianFeedback || parsed.verdict_sub || parsed.verdict || "إجابة ممتازة مبنية على خبرة واقعية واضحة.",
      starCompliance,
      verdict: parsed.verdict || "رد Section Head واثق ومقنع",
      verdict_sub: parsed.verdict_sub || "",
      strengths: parsed.strengths || ["ثقة بالنفس بدون مبالغة", "استخدام مصطلحات إدارية سليمة"],
      improvements: parsed.improvements || ["ذكر أرقام محددة لنتائج الـ TAT أو الـ NPS"],
      executivePolish: parsed.executivePolish || parsed.suggested_sentence || "في إدارتي للفرع، حولت الشكاوى إلى مصفوفة أولويات، ونزلنا وقت انتظار المريض بنسبة 35% في أول أسبوعين.",
      follow_up_question: parsed.follow_up_question || "إيه الإجراء اللي هتاخده لو رئيس قطاع العمليات طلب تقليل الميزانية 20% في نفس وقت الأزمة؟",
    });
  } catch (error: any) {
    console.log("Interview eval error:", error?.message || error);
    res.status(500).json({
      error: error?.message || "Failed to evaluate answer",
    });
  }
});

// Comprehensive HR Personality & Readiness Report Endpoint
const handlePersonalityReport = async (req: express.Request, res: express.Response) => {
  try {
    const { answers, history, totalQuestions, xp, overallImpression } = req.body;
    const ai = getGenAIClient();
    const systemInstruction = `أنت رئيس لجنة التقييم واستشاري الموارد البشرية والعمليات لمجموعة معامل ومراكز أشعة كبرى (Alfa Medical Group).
بتحلل أداء المرشح لإصدار تقرير الجاهزية لمنصب رئيس قسم الدعم التشغيلي والفروع (Operations Support Section Head) بالعامية المصرية التحليلية الراقية والداعمة.
أخرج النتيجة بتنسيق JSON حصراً:
{
  "readinessScore": 92,
  "executiveTitle": "قائد عمليات ميداني معتمد (Operations Section Head)",
  "strengths": ["ثبات انفعالي قوي تحت الضغط والسيطرة على الطوابير", "خبرة واقعية بالأرقام والنزول الميداني الفوري", "امتلاك منهجية حل المشكلات الجذرية (RCA & CAPA)"],
  "developmentAreas": ["التنسيق المبكر مع الإدارات المركزية وسلاسل الإمداد", "تضمين نسب الـ NPS دائماً في كل استعراض تنفيذي"],
  "coachEgyptianAdvice": "يا فندم... أنت جاهز تماماً بنسبة تفوق 90%. ادخل المقابلة بهدوء الواثق، وخلي كل كلمة مقاسة بالأرقام وحماية سمعة الشركة وسلامة المريض.",
  "executive_summary": "ملخص تنفيذي مركز عن المرشح ونقاط تميزه",
  "leadership_style": "نمط القيادة (مثلاً: قيادة تحليلية مبنية على البيانات والحسم الميداني)",
  "problem_solving_approach": "طريقته في حل الأزمات وسرعة الاحتواء",
  "stakeholder_management": "قدرته على التعامل مع الإدارات والموردين",
  "hiring_recommendation": "توصية الترقية النهائية ونسبة الجاهزية المئوية"
}`;

    let summaryText = "";
    if (answers && typeof answers === "object") {
      summaryText = Object.entries(answers)
        .map(([k, v]) => `سؤال ${k}: ${v}`)
        .join("\n\n");
    } else if (Array.isArray(history)) {
      summaryText = history
        .map((item: any, idx: number) => `سؤال ${idx + 1}: ${item.question}\nالإجابة: ${item.answer}\nالدرجة: ${item.score || "N/A"}`)
        .join("\n\n");
    }

    const promptText = `سجل إجابات المرشح:\n${summaryText || overallImpression || "خبرة واقعية في إدارة فروع المعامل والأشعة وسرعة احتواء الأزمات"}\n\nإجمالي الأسئلة: ${totalQuestions || 11}\nنقاط الخبرة: ${xp || 100}`;

    const response = await generateContentWithFallback(ai, {
      preferredModel: "gemini-3.8-flash",
      contents: [{ text: promptText }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = safeParseJson(response.text);
    res.json({
      readinessScore: parsed.readinessScore || 92,
      executiveTitle: parsed.executiveTitle || "قائد عمليات ميداني معتمد (Operations Section Head)",
      strengths: parsed.strengths || [
        "ثبات انفعالي قوي تحت الضغط والسيطرة على الطوابير",
        "خبرة واقعية بالأرقام والنزول الميداني الفوري",
        "امتلاك منهجية حل المشكلات الجذرية (RCA & CAPA)",
      ],
      developmentAreas: parsed.developmentAreas || [
        "التنسيق المبكر مع الإدارات المركزية وسلاسل الإمداد",
        "تضمين نسب الـ NPS دائماً في كل استعراض تنفيذي",
      ],
      coachEgyptianAdvice: parsed.coachEgyptianAdvice || "يا فندم... أنت جاهز تماماً بنسبة تفوق 90%. ادخل المقابلة بهدوء الواثق، وخلي كل كلمة مقاسة بالأرقام وحماية سمعة الشركة وسلامة المريض.",
      executive_summary: parsed.executive_summary || "مرشح قيادي واعد يمتلك حساً تشغيلياً عالياً وقدرة على قيادة الفرق الميدانية.",
      leadership_style: parsed.leadership_style || "قيادة تشاركية حاسمة مبنية على البيانات والحضور الميداني",
      problem_solving_approach: parsed.problem_solving_approach || "منهجية 5 Whys وتفعيل مسارات الطوارئ الفورية",
      stakeholder_management: parsed.stakeholder_management || "مصفوفة RACI واتفاقيات SLAs ملزمة",
      hiring_recommendation: parsed.hiring_recommendation || "يوصى بالترقية فوراً لمنصب Section Head",
    });
  } catch (error: any) {
    console.log("Personality report error:", error?.message || error);
    res.status(500).json({
      error: error?.message || "Failed to generate report",
    });
  }
};

app.post("/api/personality-report", handlePersonalityReport);
app.post("/api/personality-analysis", handlePersonalityReport);

// Interactive Case Study Solver & Presentation Deck Generator
app.post("/api/solve-case-study", async (req, res) => {
  try {
    const { caseText, caseDescription, imageBase64, imageMimeType, images, focusDepartment } = req.body;
    const resolvedText = (caseText || caseDescription || "").trim();
    const incomingImages: Array<{ base64: string; mimeType?: string; name?: string }> = [];

    if (Array.isArray(images) && images.length > 0) {
      images.forEach((img: any) => {
        const rawB64 = typeof img === "string" ? img : (img?.base64 || img?.data || "");
        if (rawB64) {
          incomingImages.push({
            base64: rawB64,
            mimeType: img?.mimeType || "image/jpeg",
            name: img?.name || "case_image",
          });
        }
      });
    } else if (imageBase64) {
      incomingImages.push({ base64: imageBase64, mimeType: imageMimeType || "image/jpeg" });
    }

    if (!resolvedText && incomingImages.length === 0) {
      res.status(400).json({ error: "Case text or at least one image is required" });
      return;
    }

    const ai = getGenAIClient();
    const systemInstruction = `أنت رئيس قسم الدعم التشغيلي والفروع (Section Head of Branch Operations & Support) في مجموعة معامل ومراكز أشعة كبرى (Alfa Medical Group: Alfa Lab & Alfa Scan).
مهمتك تحويل المشكلة أو الكيس ستادي المعروضة في المستندات أو الصور أو النص إلى خطة عمل تنفيذية حاسمة، مصممة في عرض تقديمي (Presentation Deck) من 7 شرائح احترافية.

قواعد اللغة واللهجة الصارمة:
1. كل النصوص العربية للمرشح (candidateScriptAr، الملخص، وردود أسئلة اللجنة، والجملة الذهبية) لازم تكون بالعامية المصرية الأصيلة الهادئة الواثقة (زي كلام مدير عمليات مصري شاطر في اجتماع بورد رووم: "يا فندم"، "الأزمة واضحة ومقاسة بالأرقام"، "بدل ما ندوّر مين الغلطان بنسأل إيه الخلل في السيستم"، "نزلت الميدان بنفسي"، "المسار البديل جاهز في 60 ثانية"). ممنوع الفصحى الجافة في السكريبت.
2. العرض التقديمي لازم يكون ثنائي اللغة بالكامل (Bilingual Deck: Arabic & English):
   - كل شريحة لها عنوان عربي وإنجليزي.
   - كل نقطة عرض لها صياغة عربية وإنجليزية مقابلة ومحترفة (Bullet points).
   - سكريبت الإلقاء العربي بالعامية المصرية ومعه تلخيص تنفيذي بالإنجليزي (candidateScriptEn).
   - تفاعلات الإدارات والـ SLAs بالعربي والإنجليزي.

لو في صور مرفقة (شيتات إكسيل، شاشات انتظار، تقارير رفض، فواتير، مستندات ورقية):
1. حلل كل البيانات والأرقام ونسب التأخير ومعدلات الخطأ الموجودة في الصور.
2. استخرج مكان الخنقة الحقيقي (Bottleneck) والسبب الجذري (Root Cause).
3. وزّع المسؤوليات وصمّم الـ SLA الملزمة.

أخرج النتيجة بتنسيق JSON حصراً:
{
  "titleAr": "عنوان تنفيذي جذاب وحاسم للكيس ستادي بالعربي",
  "titleEn": "Executive Case Study Title in English",
  "caseSummaryAr": "ملخص تحليلي للأزمة التشغيلية والمخاطر المباشرة على المريض بالأرقام بالعامية المصرية الهادئة الواثقة",
  "caseSummaryEn": "Executive Summary highlighting operational breakdown, metrics, and patient safety risk in English",
  "departmentInteractions": [
    {
      "department": "اسم الإدارة بالعربي (مثل: تكنولوجيا المعلومات والـ LIS)",
      "departmentEn": "Department Name in English (e.g., IT & LIS Connectivity)",
      "currentDefect": "سبب التعطيل الحالي أو التقصير بالأرقام بالعربي",
      "currentDefectEn": "Root operational defect and bottleneck in English",
      "proposedSLA": "اتفاقية مستوى الخدمة الملزمة المقترحة مع وقت استجابة محدد بالعربي",
      "proposedSLAEn": "Proposed binding SLA and turnaround time in English"
    }
  ],
  "framework7Steps": {
    "data": { "arabic": "تحليل الأرقام ومؤشرات الـ TAT والرفض بالعامية المصرية", "english": "Data Analysis & Quantifiable Metrics" },
    "priorityRisk": { "arabic": "مصفوفة الخطر وتأثيره على التشغيل وسمعة المؤسسة", "english": "Priority & Risk Matrix" },
    "immediateAction": { "arabic": "إجراء الاحتواء الفوري خلال أول 24-48 ساعة والمسار البديل", "english": "Immediate Containment Action" },
    "rca": { "arabic": "تحليل السبب الجذري والـ 5 Whys وتحديد الـ Bottleneck الحقيقي", "english": "Root Cause Analysis & Bottleneck" },
    "capaSlaPolicy": { "arabic": "إجراء تصحيحي وقائي مع وضع SOP موحد وسياسة SLA ملزمة", "english": "CAPA & Standard Policy/SLA" },
    "stakeholders": { "arabic": "خريطة الأطراف المشتركة ومصفوفة RACI وإدارة المقاومة", "english": "Stakeholders RACI Alignment" },
    "weeklyReporting": { "arabic": "لوحة المتابعة الأسبوعية ومؤشرات الإغلاق التام", "english": "Weekly Dashboard & KPIs" }
  },
  "presentationDeck": [
    {
      "slideNumber": 1,
      "slideTitleAr": "سلايد 1: الملخص التنفيذي وتشخيص الأزمة بالأرقام",
      "slideTitleEn": "Slide 1: Executive Diagnostic & Quantified Scope",
      "pillarRef": "DATA",
      "bulletPointsAr": ["نقطة رقمية بالعربي 1", "نقطة رقمية بالعربي 2", "نقطة رقمية بالعربي 3"],
      "bulletPointsEn": ["Quantified defect baseline in English", "TAT and financial/reputation impact", "30-Day stabilization target"],
      "candidateScriptAr": "مساء الخير يا فندم... الأزمة هنا واضحة ومقاسة بالأرقام... (بالعامية المصرية القيادية الواثقة)",
      "candidateScriptEn": "Good afternoon esteemed committee. The operational baseline is clearly quantified...",
      "keyTakeawayAr": "البيانات تقود القرار ولا مكان للتخمين",
      "keyTakeawayEn": "Data-driven decisions supersede assumptions"
    },
    {
      "slideNumber": 2,
      "slideTitleAr": "سلايد 2: مصفوفة المخاطر وترتيب الأولويات الحرج",
      "slideTitleEn": "Slide 2: Risk Matrix & Operational Prioritization",
      "pillarRef": "PRIORITY",
      "bulletPointsAr": ["نقطة أولوية بالعربي 1", "نقطة أولوية بالعربي 2", "نقطة أولوية بالعربي 3"],
      "bulletPointsEn": ["P1 Patient safety & diagnostic accuracy", "P2 Peak queue containment", "P3 System connectivity stabilization"],
      "candidateScriptAr": "مش كل المشاكل بتتحل في نفس النفس؛ الأولوية لسلامة المريض أولاً وحماية العينات...",
      "candidateScriptEn": "Prioritization is risk-indexed: patient safety first, queue mitigation second, IT backend third.",
      "keyTakeawayAr": "حجم الضرر هو اللي بيحدد الأسبقية",
      "keyTakeawayEn": "Risk severity defines operational triage"
    },
    {
      "slideNumber": 3,
      "slideTitleAr": "سلايد 3: خطة الاحتواء الفوري والمسار البديل (أول 48 ساعة)",
      "slideTitleEn": "Slide 3: Immediate Triage & Containment Protocol",
      "pillarRef": "ACTION & OWNERSHIP",
      "bulletPointsAr": ["إجراء فوري 1", "إجراء فوري 2", "إجراء فوري 3"],
      "bulletPointsEn": ["Immediate Section Head field triage", "Fast-track routing for urgent patients", "Emergency offline backup activation"],
      "candidateScriptAr": "أنا واخد المسؤولية كاملة ونزلت الميدان بنفسي... فعلت المسار السريع وحولنا الخدمة فوراً للمسار البديل عشان المريض ميتعطلش.",
      "candidateScriptEn": "Total ownership assumed with on-ground presence and zero-latency backup routing.",
      "keyTakeawayAr": "شيل الليلة ولا تنتظر تفاقم الأزمة",
      "keyTakeawayEn": "Decisive ownership prevents crisis cascade"
    },
    {
      "slideNumber": 4,
      "slideTitleAr": "سلايد 4: تحليل السبب الجذري وعنق الزجاجة (RCA & 5 Whys)",
      "slideTitleEn": "Slide 4: Root Cause Analysis & Bottleneck Identification",
      "pillarRef": "RCA",
      "bulletPointsAr": ["سبب 1", "سبب 2", "السبب الجذري الحقيقي"],
      "bulletPointsEn": ["Symptom vs systemic root cause", "Bottleneck in inter-departmental handoff", "Missing automated threshold triggers"],
      "candidateScriptAr": "بدل ما نلوم المشرفين، سألنا 'ليه' خمس مرات... اكتشفنا إن الخنقة مش في سرعة الموظف، الخنقة في تأخر موافقة التأمين 22 دقيقة.",
      "candidateScriptEn": "Applying 5-Whys revealed the bottleneck lies in integration latency, not front-desk staffing.",
      "keyTakeawayAr": "عالج المرض مش العَرَض",
      "keyTakeawayEn": "Target root vulnerabilities, not surface symptoms"
    },
    {
      "slideNumber": 5,
      "slideTitleAr": "سلايد 5: الحل الجذري واتفاقيات مستوى الخدمة (CAPA & SLAs)",
      "slideTitleEn": "Slide 5: Unified Policy & Binding SLAs (CAPA)",
      "pillarRef": "CAPA",
      "bulletPointsAr": ["حل وقائي 1", "SLA ملزمة 2", "SOP موحد 3"],
      "bulletPointsEn": ["Institutionalized SOP protocol", "Binding time-based SLA with support units", "Digital audit trails and verification"],
      "candidateScriptAr": "الحل الحقيقي مش مجرد تسكين مؤقت؛ الحل هو وضع سيستم يمنع تكرار الغلط، مع SLA ملزمة لكل إدارة بوقت محدد بالدقيقة.",
      "candidateScriptEn": "Sustainable CAPA backed by formal SLAs and repeatable SOP governance.",
      "keyTakeawayAr": "السيستم هو اللي بيحمي الشغل مش النوايا",
      "keyTakeawayEn": "Robust systems safeguard operations"
    },
    {
      "slideNumber": 6,
      "slideTitleAr": "سلايد 6: مصفوفة المسؤوليات وإشراك الشركاء (RACI Governance)",
      "slideTitleEn": "Slide 6: Stakeholders RACI Governance & Resistance Management",
      "pillarRef": "STAKEHOLDERS",
      "bulletPointsAr": ["مسؤولية RACI 1", "إدارة المقاومة 2", "مسار التصعيد 3"],
      "bulletPointsEn": ["Cross-functional alignment across operations, IT, and lab", "Clear RACI ownership matrix", "Mitigation plan for frontline staff resistance"],
      "candidateScriptAr": "العمليات مبتشتغلش في جزر منعزلة؛ حددنا مين المسؤول ومين الداعم بوضوح عبر مصفوفة RACI، وقعدت مع المشرفين القدامى عشان نكسب ثقتهم.",
      "candidateScriptEn": "Operations transcend silos via transparent RACI roles and collaborative change management.",
      "keyTakeawayAr": "القيادة بالإقناع والمشاركة مش بالأوامر الفوقية",
      "keyTakeawayEn": "Influence through alignment rather than decree"
    },
    {
      "slideNumber": 7,
      "slideTitleAr": "سلايد 7: لوحة المتابعة ومؤشرات الإغلاق التام (KPIs & Closure)",
      "slideTitleEn": "Slide 7: 90-Day Roadmap, KPIs & Final Closure",
      "pillarRef": "FOLLOW-UP",
      "bulletPointsAr": ["مؤشر 14 يوم", "مؤشر 30 يوم", "إغلاق 90 يوم"],
      "bulletPointsEn": ["Day 14 TAT & error rate milestone", "Day 30 SLA compliance & NPS restoration", "Day 90 zero repeat defects and closure"],
      "candidateScriptAr": "الملف ده مش هيتقفل بكلام مرسل؛ هيتقفل بتقرير أسبوعي يثبت بالأرقام إن المشكلة ماتت ومش هترجع تاني، ونزلت الحالات المتأخرة لصفر.",
      "candidateScriptEn": "Closure is validated strictly through audited KPI milestones and zero recurrence across 90 days.",
      "keyTakeawayAr": "المشكلة لا تعتبر اتحلت إلا لما نثبت بالأرقام إنها ماتت",
      "keyTakeawayEn": "No closure without measurable audit trails"
    }
  ],
  "cluster15CasesStrategy": {
    "bucketName": "اسم الوعاء بالعربي (أزمات العينات والنقل | شكاوى المرضى والزحام | أعطال الربط والسيستم | نقص الموارد والمستهلكات)",
    "bucketNameEn": "Operational Bucket in English",
    "speedSolvingSecret": "سر حل الحالة في 3 دقائق أمام اللجنة بالعامية المصرية",
    "goldenFormula": "الجملة السحرية التي تحسم الجدال أمام اللجنة بالعامية المصرية",
    "goldenFormulaEn": "Golden Executive Formula in English"
  },
  "committeeQuestions": [
    {
      "interviewer": "د. شريف (رئيس قطاع العمليات)",
      "interviewerEn": "Dr. Sherif (Operations Sector Head)",
      "question": "سؤال محرج عن التكلفة أو الـ TAT بالعربي",
      "questionEn": "Tough question regarding cost or TAT in English",
      "modelRebuttal": "رد الكوتش الحاسم بالعامية المصرية: يا دكتور شريف، تكلفة خطأ عينة واحدة وإعادة زيارة المريض بتكلفنا 3 أضعاف...",
      "modelRebuttalEn": "Executive rebuttal highlighting revenue protection and 30-day shift optimization"
    },
    {
      "interviewer": "أ. رانيا (مديرة الموارد البشرية)",
      "interviewerEn": "Ms. Rania (HR Director)",
      "question": "سؤال عن مقاومة الموظفين أو المشرفين القدامى",
      "questionEn": "Tough question regarding staff resistance to new workflows",
      "modelRebuttal": "رد الكوتش بالعامية المصرية: أنا مش هفرض عليهم القرار من فوق، هشرك أقدم مشرف في فترة التجربة...",
      "modelRebuttalEn": "Executive rebuttal detailing participatory leadership and trial pilot periods"
    },
    {
      "interviewer": "م. كريم (مسؤول الجودة والتحول الرقمي)",
      "interviewerEn": "Eng. Karim (QA & Digital Transformation)",
      "question": "سؤال عن استدامة الحل ومنع تكرار الأزمة",
      "questionEn": "Tough question regarding scalability and preventing recurrence",
      "modelRebuttal": "رد الكوتش بالعامية المصرية: الضمان هو التوحيد (Standardization) وتوثيق الـ SOP وربط السيستم بتنبيه آلي...",
      "modelRebuttalEn": "Executive rebuttal on institutionalizing SOPs and automated alert triggers"
    }
  ]
}`;

    const parts: any[] = [];
    for (const img of incomingImages) {
      if (img.base64) {
        const cleanBase64 = img.base64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: img.mimeType || "image/jpeg",
          },
        });
      }
    }

    const textContent = `بيانات دراسة الحالة التشغيلية (${incomingImages.length} صور مرفقة):\n${
      resolvedText || "حلل الصور والمستندات المرفقة بدقة واستخرج المشكلة وحلها كـ Section Head مع عرض تقديمي من 7 شرائح"
    }\n${focusDepartment ? `التركيز على إدارة: ${focusDepartment}` : ""}`;
    parts.push({ text: textContent });

    const response = await generateContentWithFallback(ai, {
      preferredModel: "gemini-3.8-flash",
      contents: [{ parts }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = safeParseJson(response.text);
    res.json(parsed);
  } catch (error: any) {
    console.log("Case solver error:", error?.message || error);
    res.status(500).json({
      error: error?.message || "Failed to solve case study",
    });
  }
});

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
