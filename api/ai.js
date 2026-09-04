/* =========================================================
   KARANGAN AI
   API / AI CONTROLLER
   Version 4.8.1 AI-Native Teaching Engine v3.1 — Benchmark-Calibrated

   Supports:
   - translate
   - writing-feedback
   - mentor
   - semantic_judge

   Translation guarantee:
   - zh
   - en
   - meaning
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const OPENAI_URL =
  "https://api.openai.com/v1/responses";

const DEFAULT_MODEL =
  "gpt-5.6-luna";


const GROQ_URL =
  "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODELS_URL =
  "https://api.groq.com/openai/v1/models";

let cachedGroqModel = "";
let cachedGroqModelAt = 0;
const GROQ_MODEL_CACHE_MS = 30 * 60 * 1000;



/* =========================================================
   MAIN HANDLER
   ========================================================= */

export default async function handler(
  req,
  res
) {

  if (
    req.method !== "POST"
  ) {

    return res
      .status(405)
      .json({
        error:
          "Method not allowed",
      });

  }


  try {

    if (
      !process.env.OPENAI_API_KEY &&
      !process.env.GROQ_API_KEY
    ) {

      return res
        .status(500)
        .json({
          error:
            "AI API key 尚未设置。",
        });

    }


    const body =
      req.body || {};


    const {

      type =
        "mentor",

      message =
        "",

      mode =
        "teacher",

      word =
        "",

      context =
        "",

      knownChinese =
        "",

      text =
        "",

      level =
        "Primary School",

      language =
        "Bahasa Melayu",

      instruction =
        "",

      year =
        1,

      learning_target =
        "",

      base_sentence =
        "",

      student_answer =
        ""

    } = body;


    /* =====================================================
       TRANSLATION
       ===================================================== */

    if (
      type === "translate"
    ) {

      if (
        !word ||
        typeof word !==
          "string"
      ) {

        return res
          .status(400)
          .json({
            error:
              "Perkataan diperlukan.",
          });

      }


      const translation =
        await generateTranslation({

          word:
            word.trim(),

          context:
            String(
              context || ""
            ).trim(),

          knownChinese:
            String(
              knownChinese || ""
            ).trim()

        });


      return res
        .status(200)
        .json({

          type:
            "translate",

          word:
            word.trim(),

          zh:
            translation.zh,

          en:
            translation.en,

          meaning:
            translation.meaning,

          answer:
            `${translation.zh} · ${translation.en}`

        });

    }


    /* =====================================================
       SEMANTIC JUDGE — LANGKAH 4
       Understands open vocabulary without changing curriculum/mastery.
       ===================================================== */

    if (type === "teaching_critic_v1") {
      const cleanBase = String(base_sentence || "").trim();
      const cleanAnswer = String(student_answer || "").trim();
      if (!cleanBase || !cleanAnswer) {
        return res.status(400).json({ error: "Base sentence and student answer are required." });
      }

      const critique = await generateTeachingCritique({
        year,
        language,
        learningTarget: String(learning_target || "").trim(),
        skillKey: String(skill_key || "").trim(),
        baseSentence: cleanBase,
        studentAnswer: cleanAnswer,
        teacherJudgment: body?.teacher_judgment || null
      });

      return res.status(200).json(critique);
    }

    if (type === "teaching_generate_v1") {
      const cleanBase = String(base_sentence || "").trim();
      if (!cleanBase) {
        return res.status(400).json({ error: "Base sentence is required." });
      }

      const example = await generateTeachingExample({
        year,
        language,
        learningTarget: String(learning_target || "").trim(),
        skillKey: String(skill_key || "").trim(),
        baseSentence: cleanBase
      });

      return res.status(200).json(example);
    }

    if (
      type === "semantic_judge" ||
      type === "teaching_judge_v2" ||
      type === "teaching_judge_v3"
    ) {

      const cleanBase =
        String(base_sentence || "").trim();

      const cleanAnswer =
        String(student_answer || "").trim();

      if (!cleanBase || !cleanAnswer) {
        return res
          .status(400)
          .json({
            error:
              "Base sentence and student answer are required."
          });
      }

      const judgment =
        await generateSemanticJudgment({
          year,
          language,
          learningTarget:
            String(learning_target || "").trim(),
          baseSentence:
            cleanBase,
          studentAnswer:
            cleanAnswer
        });

      return res
        .status(200)
        .json(judgment);
    }


    /* =====================================================
       WRITING FEEDBACK
       ===================================================== */

    if (
      type ===
      "writing-feedback"
    ) {

      if (
        !text ||
        typeof text !==
          "string"
      ) {

        return res
          .status(400)
          .json({
            error:
              "Karangan diperlukan.",
          });

      }


      const answer =
        await generateText({

          instructions: `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia.

Tahap murid:
${level}

Bahasa:
${language}

Tugas:
Semak karangan murid dan berikan maklum balas
yang ringkas, positif dan mudah difahami.

Semak:
1. Isi
2. Tatabahasa
3. Ejaan
4. Kosa kata
5. Struktur ayat

Peraturan:
- Gunakan Bahasa Melayu Malaysia.
- Jangan gunakan Bahasa Indonesia.
- Sesuai untuk murid sekolah rendah.
- Jangan menulis semula seluruh karangan.
- Berikan petunjuk supaya murid boleh
  membaiki tulisan sendiri.

Gunakan format:

🌟 Kekuatan:
...

💡 Cuba perbaiki:
...

🧠 Cabaran seterusnya:
...

${instruction || ""}
          `.trim(),

          input: `
Karangan murid:

${text}
          `.trim()

        });


      return res
        .status(200)
        .json({
          type:
            "writing-feedback",

          answer
        });

    }


    /* =====================================================
       MENTOR
       ===================================================== */

    if (
      !message ||
      typeof message !==
        "string"
    ) {

      return res
        .status(400)
        .json({
          error:
            "请输入内容。",
        });

    }


    const answer =
      await generateText({

        instructions: `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia.

Tugas:
Membantu murid meningkatkan kemahiran
Bahasa Melayu.

Gaya:
- Gunakan Bahasa Melayu Malaysia.
- Jangan gunakan Bahasa Indonesia.
- Sesuai untuk murid sekolah rendah.
- Gunakan ayat pendek dan jelas.
- Galakkan murid berfikir.
- Berikan petunjuk sebelum memberikan jawapan.
- Jangan menulis seluruh karangan untuk murid.
- Fokus pada tatabahasa, kosa kata,
  struktur ayat dan penulisan.
- Jika murid bertanya dalam Bahasa Cina,
  boleh terangkan secara ringkas dalam
  Bahasa Cina.
- Contoh Bahasa Melayu mesti kekal
  dalam Bahasa Melayu.

Mode:
${mode}

${instruction || ""}
        `.trim(),

        input:
          message.trim()

      });


    return res
      .status(200)
      .json({

        type:
          "mentor",

        answer

      });


  } catch (error) {

    console.error(
      "[Karangan AI API]",
      error
    );


    return res
      .status(
        error.status || 500
      )
      .json({

        error:
          error.publicMessage ||
          "AI 暂时无法回应，请稍后再试。"

      });

  }

}


/* =========================================================
   TRANSLATION ENGINE
   ========================================================= */

async function generateTranslation({

  word,
  context,
  knownChinese

}) {

  const cleanWord =
    String(word || "").trim();

  const cleanContext =
    String(context || "").trim();

  const cleanKnownChinese =
    String(knownChinese || "").trim();


  /*
    PRIMARY:
    Groq free-tier translation.
  */

  if (
    process.env.GROQ_API_KEY
  ) {

    try {

      const groqResult =
        await requestGroqTranslation({

          word:
            cleanWord,

          context:
            cleanContext,

          knownChinese:
            cleanKnownChinese

        });


      if (
        isTranslationComplete(
          groqResult
        )
      ) {

        return cleanTranslation(
          groqResult
        );

      }


      console.warn(
        "[Groq Translation] Incomplete:",
        cleanWord,
        groqResult
      );

    } catch (error) {

      console.error(
        "[Groq Translation Error]",
        error?.message || error
      );

    }

  }


  /*
    FALLBACK:
    Existing OpenAI structured translation.
  */

  if (
    process.env.OPENAI_API_KEY
  ) {

    const baseInstructions = `
Anda ialah kamus pintar Bahasa Melayu Malaysia
untuk murid sekolah rendah Tahun 1 hingga Tahun 6.

Anda mesti menerangkan SATU perkataan Bahasa Melayu.

WAJIB:
- "zh" mesti mempunyai terjemahan Simplified Chinese.
- "en" mesti mempunyai terjemahan English.
- "meaning" mesti mempunyai penerangan ringkas dalam Bahasa Melayu Malaysia.
- Ketiga-tiga medan TIDAK BOLEH kosong.
- Gunakan konteks ayat untuk menentukan maksud tepat.
- Jangan gunakan Bahasa Indonesia.
- English mesti sesuai dengan maksud perkataan dalam ayat.
- Jika perkataan mempunyai beberapa maksud, pilih maksud paling sesuai dengan konteks.
- Maksud BM mesti mudah difahami murid sekolah rendah.
    `.trim();


    const userInput = `
Perkataan:
${cleanWord}

Konteks ayat:
${cleanContext || "Tiada konteks diberikan."}

Terjemahan Cina sedia ada:
${cleanKnownChinese || "Tiada."}

Berikan terjemahan yang lengkap.
    `.trim();


    try {

      let result =
        await requestStructuredTranslation({

          instructions:
            baseInstructions,

          input:
            userInput

        });


      if (
        isTranslationComplete(
          result
        )
      ) {

        return cleanTranslation(
          result
        );

      }


      result =
        await requestStructuredTranslation({

          instructions: `
${baseInstructions}

PENTING:
Jawapan sebelumnya tidak lengkap.

Jangan tinggalkan:
- zh
- en
- meaning

Setiap nilai mesti mempunyai sekurang-kurangnya satu perkataan.
          `.trim(),

          input:
            userInput

        });


      if (
        isTranslationComplete(
          result
        )
      ) {

        return cleanTranslation(
          result
        );

      }

    } catch (error) {

      console.error(
        "[OpenAI Translation Fallback Error]",
        error?.message || error
      );

    }

  }


  const error =
    new Error(
      "All translation providers failed."
    );


  error.status =
    502;


  error.publicMessage =
    "Terjemahan buat sementara waktu tidak tersedia.";


  throw error;

}



async function getGroqTranslationModel() {

  const now = Date.now();

  if (
    cachedGroqModel &&
    now - cachedGroqModelAt < GROQ_MODEL_CACHE_MS
  ) {
    return cachedGroqModel;
  }

  const response = await fetch(
    GROQ_MODELS_URL,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${process.env.GROQ_API_KEY}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "[Groq Models Error]",
      data
    );

    const error = new Error(
      data?.error?.message ||
      "Unable to load Groq models."
    );

    error.status = response.status;
    throw error;
  }

  const modelIds = Array.isArray(data?.data)
    ? data.data
        .map(item => String(item?.id || "").trim())
        .filter(Boolean)
    : [];

  if (!modelIds.length) {
    throw new Error(
      "Groq returned no available models."
    );
  }

  /*
    Prefer general-purpose text models.
    Do NOT hard-code one model as mandatory:
    the API key's live /models list is the source of truth.
  */
  const preferredPatterns = [
    /gpt-oss/i,
    /llama.*70b.*versatile/i,
    /llama.*instant/i,
    /qwen/i,
    /gemma/i
  ];

  const excluded =
    /(whisper|speech|tts|audio|guard|moderation|vision)/i;

  const textModels =
    modelIds.filter(id => !excluded.test(id));

  let selected = "";

  for (const pattern of preferredPatterns) {
    selected =
      textModels.find(id => pattern.test(id)) || "";

    if (selected) break;
  }

  if (!selected) {
    selected = textModels[0] || modelIds[0];
  }

  cachedGroqModel = selected;
  cachedGroqModelAt = now;

  console.log(
    "[Groq Auto Model]",
    selected
  );

  return selected;
}


async function requestGroqTranslation({

  word,
  context,
  knownChinese

}) {

  const response =
    await fetch(
      GROQ_URL,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`

        },

        body:
          JSON.stringify({

            model:
              await getGroqTranslationModel(),

            temperature:
              0,

            messages: [

              {
                role:
                  "system",

                content: `
Anda ialah kamus Bahasa Melayu Malaysia untuk murid sekolah rendah Tahun 1 hingga Tahun 6.

Terjemahkan SATU perkataan Bahasa Melayu.

Gunakan konteks ayat untuk menentukan maksud yang betul.

WAJIB:
- Simplified Chinese
- English
- Maksud ringkas Bahasa Melayu Malaysia
- Jangan gunakan Bahasa Indonesia
- Jangan tinggalkan mana-mana bahagian kosong

Balas tepat SATU baris dalam format:
ZH=<Chinese>|||EN=<English>|||BM=<Maksud BM>
                `.trim()
              },

              {
                role:
                  "user",

                content: `
Perkataan: ${word}
Konteks: ${context || "Tiada konteks."}
Terjemahan Cina sedia ada: ${knownChinese || "Tiada."}
                `.trim()
              }

            ]

          })

      }
    );


  const data =
    await response.json();


  if (
    !response.ok
  ) {

    console.error(
      "[Groq API Error]",
      data
    );


    const error =
      new Error(
        data?.error?.message ||
        "Groq translation request failed."
      );


    error.status =
      response.status;


    throw error;

  }


  const output =
    String(
      data?.choices?.[0]?.message?.content || ""
    ).trim();


  if (
    !output
  ) {

    throw new Error(
      "Empty Groq translation output."
    );

  }


  const match =
    output.match(
      /ZH\s*=\s*(.*?)\s*\|\|\|\s*EN\s*=\s*(.*?)\s*\|\|\|\s*BM\s*=\s*(.*)/is
    );


  if (
    !match
  ) {

    console.warn(
      "[Groq Translation Parse]",
      output
    );


    return {
      zh:
        knownChinese || "",

      en:
        "",

      meaning:
        ""
    };

  }


  return {

    zh:
      String(
        match[1] || ""
      ).trim(),

    en:
      String(
        match[2] || ""
      ).trim(),

    meaning:
      String(
        match[3] || ""
      ).trim()

  };

}


/* =========================================================
   STRUCTURED TRANSLATION REQUEST
   ========================================================= */

async function requestStructuredTranslation({

  instructions,

  input

}) {

  const response =
    await fetch(
      OPENAI_URL,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`

        },

        body:
          JSON.stringify({

            model:
              DEFAULT_MODEL,

            instructions,

            input,

            text: {

              format: {

                type:
                  "json_schema",

                name:
                  "malay_word_translation",

                description:
                  "Complete Bahasa Melayu word translation for a Malaysian primary school learner.",

                strict:
                  true,

                schema: {

                  type:
                    "object",

                  properties: {

                    zh: {

                      type:
                        "string",

                      description:
                        "Simplified Chinese translation. Must not be blank."

                    },

                    en: {

                      type:
                        "string",

                      description:
                        "English translation. Must not be blank."

                    },

                    meaning: {

                      type:
                        "string",

                      description:
                        "Short Bahasa Melayu Malaysia explanation. Must not be blank."

                    }

                  },

                  required: [
                    "zh",
                    "en",
                    "meaning"
                  ],

                  additionalProperties:
                    false

                }

              }

            }

          })

      }
    );


  const data =
    await response.json();


  if (
    !response.ok
  ) {

    console.error(
      "[OpenAI Translation Error]",
      data
    );


    const error =
      new Error(
        data?.error?.message ||
        "OpenAI translation request failed."
      );


    error.status =
      response.status;


    error.publicMessage =
      data?.error?.message ||
      "Translation unavailable.";


    throw error;

  }


  const outputText =
    extractResponseText(
      data
    );


  if (!outputText) {

    console.error(
      "[Translation] Empty output",
      data
    );


    throw new Error(
      "Empty structured translation output."
    );

  }


  try {

    return JSON.parse(
      outputText
    );

  } catch (error) {

    console.error(
      "[Translation JSON Parse Error]",
      outputText
    );


    throw new Error(
      "Invalid translation JSON."
    );

  }

}


/* =========================================================
   CHECK TRANSLATION
   ========================================================= */

function isTranslationComplete(
  result
) {

  if (
    !result ||
    typeof result !==
      "object"
  ) {

    return false;

  }


  const zh =
    String(
      result.zh || ""
    ).trim();


  const en =
    String(
      result.en || ""
    ).trim();


  const meaning =
    String(
      result.meaning || ""
    ).trim();


  return Boolean(
    zh &&
    en &&
    meaning
  );

}


/* =========================================================
   CLEAN TRANSLATION
   ========================================================= */

function cleanTranslation(
  result
) {

  return {

    zh:
      String(
        result.zh
      ).trim(),

    en:
      String(
        result.en
      ).trim(),

    meaning:
      String(
        result.meaning
      ).trim()

  };

}


/* =========================================================
   AI-NATIVE TEACHING ENGINE v3 — LANGKAH 4
   Decision order: Meaning -> Skill Target -> Appropriateness -> Language.
   Independence/mastery remains client-owned.
   ========================================================= */



async function generateTeachingCritique({
  year,
  language,
  learningTarget,
  skillKey,
  baseSentence,
  studentAnswer,
  teacherJudgment
}) {
  const instructions = `
Anda ialah Cikgu Aira Critic, pemeriksa kedua yang BEBAS daripada penilai pertama.

Tugas utama anda: kurangkan FALSE POSITIVE dalam latihan Bahasa Melayu Tahun ${year || 1}.
Jangan cari alasan untuk meluluskan jawapan hanya kerana ayat boleh difahami.

Ayat asas: "${baseSentence}"
Jawapan murid: "${studentAnswer}"
Kemahiran sasaran: ${skillKey || "OPEN"}
Sasaran pembelajaran: ${learningTarget || "Kembangkan ayat dengan maklumat yang sesuai."}

Penilaian pertama (boleh salah):
${JSON.stringify(teacherJudgment || {})}

Semak enam lapisan:
1. MEANING — ayat keseluruhan masuk akal?
2. SKILL TARGET — kemahiran benar-benar dipenuhi, bukan sekadar kata kunci?
3. SEMANTIC APPROPRIATENESS — gabungan perkataan sesuai dalam konteks?
4. PEDAGOGICAL APPROPRIATENESS — adakah guru Tahun 1 patut menerima dan membenarkan murid meniru ayat ini?
5. LANGUAGE — ejaan/tatabahasa.
6. PARTIAL CORRECTNESS — simpan bahagian yang betul dan betulkan hanya bahagian bermasalah.

PERATURAN KETAT:
- "boleh difahami" TIDAK sama dengan "patut PASS".
- Ayat pelik, menghina, tidak sesuai, tidak natural atau tidak patut dijadikan model murid Tahun 1 mesti VETO atau CLARIFY.
- "Kawan saya baik dan gila." mesti VETO untuk PEDAGOGICAL_APPROPRIATENESS; "baik" boleh dipelihara sebagai bahagian betul.
- "Bunga itu cantik dengan rasa masin." mesti VETO.
- Idea imaginatif boleh PASS jika jelas, sesuai untuk kanak-kanak dan masih mengekalkan maksud.
- Jika ragu-ragu sama ada guru patut menerima jawapan, pilih CLARIFY/VETO, bukan PASS.

Output JSON sahaja:
{
  "verdict": "PASS" | "VETO" | "CLARIFY",
  "issue": "NONE" | "MEANING" | "SKILL_TARGET" | "APPROPRIATENESS" | "PEDAGOGICAL_APPROPRIATENESS" | "LANGUAGE" | "UNCERTAIN",
  "pedagogically_appropriate": true | false | null,
  "preserve": ["bahagian yang betul"],
  "problem_span": "teks bermasalah atau kosong",
  "better_alternatives": ["maksimum 3 alternatif ringkas"],
  "student_feedback": "maklum balas ringkas untuk murid",
  "confidence": 0.0
}
  `.trim();

  const input = "Semak semula keputusan penilai pertama. Utamakan keselamatan pedagogi.";

  let result;
  if (process.env.OPENAI_API_KEY) {
    try {
      result = await requestStructuredTeachingCritique({ instructions, input });
    } catch (error) {
      console.warn("[Teaching Critic] OpenAI failed; trying Groq fallback:", error?.message || error);
      if (!process.env.GROQ_API_KEY) throw error;
    }
  }
  if (!result && process.env.GROQ_API_KEY) {
    result = await requestGroqTeachingCritique({ instructions, input });
  }
  if (!result) {
    const error = new Error("No AI provider available for teaching critic.");
    error.status = 503;
    throw error;
  }
  return result;
}

async function requestStructuredTeachingCritique({instructions,input}) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body:JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature:0.0,
      response_format:{type:"json_object"},
      messages:[
        {role:"system",content:instructions},
        {role:"user",content:input}
      ]
    })
  });
  if(!response.ok){
    const e=new Error(`OpenAI critic ${response.status}`); e.status=response.status; throw e;
  }
  const data=await response.json();
  return JSON.parse(data?.choices?.[0]?.message?.content || "{}");
}

async function requestGroqTeachingCritique({instructions,input}) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.GROQ_API_KEY}`
    },
    body:JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature:0.0,
      response_format:{type:"json_object"},
      messages:[
        {role:"system",content:instructions},
        {role:"user",content:input}
      ]
    })
  });
  if(!response.ok){
    const e=new Error(`Groq critic ${response.status}`); e.status=response.status; throw e;
  }
  const data=await response.json();
  return JSON.parse(data?.choices?.[0]?.message?.content || "{}");
}


async function generateTeachingExample({
  year,
  language,
  learningTarget,
  skillKey,
  baseSentence
}) {
  const instructions = `
Anda ialah Cikgu Aira, guru Bahasa Melayu sekolah rendah Malaysia.

Tugas: hasilkan SATU contoh pengajaran untuk murid Tahun ${year || 1}.
Ayat asas: "${baseSentence}"
Kemahiran sasaran: ${skillKey || "OPEN"}
Sasaran pembelajaran: ${learningTarget || "Kembangkan ayat dengan satu maklumat yang bermakna."}

Peraturan wajib:
1. Kekalkan maksud ayat asas.
2. Tambah tepat satu jenis maklumat yang memenuhi kemahiran sasaran.
3. Ayat mesti semula jadi, gramatis, mudah difahami dan sesuai untuk murid Tahun 1.
4. Jangan guna nama/perkataan rawak, jargon, bahasa asing, atau perkataan yang tidak pasti.
5. Jangan sekadar menambah perkataan; hubungan makna seluruh ayat mesti masuk akal.
6. PLACE = tempat; TIME = masa; COMPANION = dengan siapa; DESCRIPTION = penerangan/sifat yang sesuai; INTENSITY = penguatan; OPEN = satu maklumat baharu yang sesuai.
7. Untuk DESCRIPTION, sifat mesti benar-benar sesuai dengan benda/orang yang diterangkan.
8. Output hanya JSON dengan medan:
   sentence: ayat penuh yang betul
   added_information: maklumat yang ditambah
   skill_key: kemahiran sasaran
   appropriateness: NATURAL atau POSSIBLE
   explanation: penerangan sangat pendek untuk murid Tahun 1
   confidence: 0 hingga 1
  `.trim();

  const input = `Hasilkan contoh pengajaran sekarang.`;

  let result;
  if (process.env.OPENAI_API_KEY) {
    try {
      result = await requestStructuredTeachingExample({ instructions, input });
    } catch (error) {
      console.warn("[Teaching Generate] OpenAI failed; trying Groq fallback:", error?.message || error);
      if (!process.env.GROQ_API_KEY) throw error;
    }
  }
  if (!result && process.env.GROQ_API_KEY) {
    result = await requestGroqTeachingExample({ instructions, input });
  }
  if (!result) {
    const error = new Error("No AI provider available for teaching generation.");
    error.status = 503;
    throw error;
  }
  return result;
}

async function requestStructuredTeachingExample({instructions,input}) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body:JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature:0.15,
      response_format:{type:"json_object"},
      messages:[
        {role:"system",content:instructions},
        {role:"user",content:input}
      ]
    })
  });
  if(!response.ok){
    const e=new Error(`OpenAI ${response.status}`); e.status=response.status; throw e;
  }
  const data=await response.json();
  return JSON.parse(data?.choices?.[0]?.message?.content || "{}");
}

async function requestGroqTeachingExample({instructions,input}) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.GROQ_API_KEY}`
    },
    body:JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature:0.15,
      response_format:{type:"json_object"},
      messages:[
        {role:"system",content:instructions},
        {role:"user",content:input}
      ]
    })
  });
  if(!response.ok){
    const e=new Error(`Groq ${response.status}`); e.status=response.status; throw e;
  }
  const data=await response.json();
  return JSON.parse(data?.choices?.[0]?.message?.content || "{}");
}


async function generateSemanticJudgment({
  year,
  language,
  learningTarget,
  baseSentence,
  studentAnswer
}) {

  const instructions = `
Anda ialah AI Teacher Judge v3 untuk Karangan AI, aplikasi Bahasa Melayu sekolah rendah Malaysia. Tugas anda ialah MENILAI secara profesional, bukan sekadar memberi galakan.

Konteks:
- Tahun murid: ${year || 1}
- Bahasa: ${language || "Bahasa Melayu"}
- Sasaran kemahiran: ${learningTarget || "Kembangkan ayat dengan satu maklumat yang bermakna."}

IKUT URUTAN KEPUTUSAN INI. JANGAN LOMPAT:
1. MEANING — Adakah maksud keseluruhan ayat boleh difahami dan hubungan inti seperti ACTION+OBJECT/COMPLEMENT masuk akal?
2. SKILL TARGET — Jika meaning lulus, adakah murid benar-benar menunjukkan kemahiran sasaran semasa? Ayat boleh bermakna tetapi masih tidak memenuhi sasaran.
3. APPROPRIATENESS — Jika sasaran dipenuhi, bezakan NATURAL, POSSIBLE, IMAGINATIVE, ODD, INVALID, UNKNOWN. Kreativiti yang jelas dari segi bahasa tidak boleh dihukum hanya kerana luar biasa.
4. LANGUAGE — Hanya selepas meaning/skill/appropriateness lulus, pilih SATU isu bahasa paling penting jika ada.
5. INDEPENDENCE — JANGAN tentukan mastery, XP atau independence. Itu milik aplikasi klien.

PERATURAN SISTEM:
- Ini ialah semantic judge untuk SEMUA jawapan teks bebas di Guided/Magic dan Independent Stage. Standard penilaian mesti sama di semua stage.
- Jangan beri PASS hanya kerana murid menambah perkataan, tempat, masa, atau frasa baharu. Hubungan semantik inti mesti masuk akal dahulu.
- Untuk kata kerja, semak keserasian kata kerja dengan objek/pelengkapnya. Frasa lokasi atau masa yang betul tidak boleh menyelamatkan hubungan kata kerja+objek yang tidak masuk akal.
- Bezakan struktur yang sengaja kreatif daripada gabungan kata yang tidak membawa maksud. Kreativiti boleh PASS; semantic incompatibility tidak boleh PASS.
- Jangan padankan dengan model answer.
- Perkataan murid tidak perlu berada dalam kosa kata aplikasi.
- Perkataan yang sah secara individu tidak bermaksud gabungannya sesuai. Contoh: “Saya membaca nasi di rumah.” gagal pada MEANING.
- Lokasi imaginatif yang sah tidak boleh menyelamatkan hubungan inti yang salah. “Saya mengemas tahi di langit.” tetap gagal pada MEANING.
- “Ayah membaca di langit.” boleh IMAGINATIVE dan lulus jika skill PLACE dipenuhi.
- “Adik belajar di hutan.” boleh POSSIBLE dan lulus.
- Jawapan kreatif tetapi boleh difahami mesti diterima sebagai POSSIBLE/IMAGINATIVE, bukan ditolak kerana tidak biasa.
- Jika sebahagian jawapan betul, preserve bahagian itu melalui preserved_parts. Jangan buang semua usaha murid.
- preserved_parts hanya boleh menggunakan: BASE_MEANING, SKILL_TARGET, CREATIVE_IDEA, LANGUAGE_FORM.
- Jika meaning gagal, primary_issue=MEANING walaupun tanda baca/huruf besar juga salah.
- Jika meaning lulus tetapi skill tidak dipenuhi, primary_issue=SKILL_TARGET.
- Jika meaning+skill lulus tetapi kesesuaian benar-benar bermasalah, primary_issue=APPROPRIATENESS.
- Jika semua di atas lulus tetapi ada satu pembetulan bahasa penting, primary_issue=LANGUAGE.
- Jika semuanya lulus, primary_issue=NONE dan result=PASS.
- ODD/UNKNOWN boleh menghasilkan CLARIFY apabila makna mungkin wujud tetapi tidak cukup yakin.
- Jangan ghostwrite. Jangan beri satu ayat jawapan baharu. language_issue/clarification_question mesti pendek dan mesra murid Tahun 1.

OUTPUT WAJIB:
result: PASS, RETRY, atau CLARIFY
meaning_status: PASS, FAIL, atau UNCERTAIN
skill_target_status: MET, NOT_MET, atau UNCERTAIN
appropriateness: NATURAL, POSSIBLE, IMAGINATIVE, ODD, INVALID, atau UNKNOWN
language_status: CLEAN atau MINOR_ISSUE
language_issue: string pendek atau null
primary_issue: MEANING, SKILL_TARGET, APPROPRIATENESS, LANGUAGE, atau NONE
preserved_parts: array daripada BASE_MEANING, SKILL_TARGET, CREATIVE_IDEA, LANGUAGE_FORM
needs_clarification: boolean
clarification_question: string
confidence: 0 hingga 1

KALIBRASI KRITIKAL:
- “Ibu makan nasi di rumah.” => meaning PASS.
- “Saya makan buku di dapur.” => meaning FAIL, RETRY, primary_issue MEANING.
- “Saya membaca nasi di rumah.” => meaning FAIL, RETRY, primary_issue MEANING.
- “Kawan saya belajar nasi di sekolah.” => meaning FAIL kerana “belajar nasi” tidak membentuk hubungan yang sesuai; lokasi “di sekolah” tidak mengubah kegagalan hubungan inti. “Kawan saya belajar tentang nasi di sekolah.” pula boleh dinilai berbeza kerana “tentang nasi” mempunyai hubungan makna yang jelas.
- “Kawan saya bermain nasi di tandas.” => meaning FAIL/UNCERTAIN, tidak boleh PASS hanya kerana ada lokasi.
- “Ayah membaca di langit.” => meaning PASS, appropriateness IMAGINATIVE.
- “Adik bermain di bulan.” => meaning PASS, appropriateness IMAGINATIVE.
- “Bilik saya bersih dan unik.” => jangan gagal hanya kerana “unik” mungkin tiada dalam kamus aplikasi; nilai gabungan makna.
- Jika jawapan bermakna tetapi diminta PLACE dan murid hanya menambah TIME, skill_target_status=NOT_MET.
- Prinsip yang sama mesti digunakan untuk SEMUA sasaran: jika sasaran INTENSITY tetapi murid hanya menambah PLACE/TIME/COMPANION, skill_target_status=NOT_MET. Contoh: asas “Ali gembira.” + jawapan “Ali gembira di sekolah.” => meaning PASS, skill_target_status NOT_MET, primary_issue SKILL_TARGET.
- Untuk DESCRIPTION, semak sama ada sifat/deria yang ditambah benar-benar sesuai dengan benda yang diterangkan. “Bunga itu cantik dengan rasa masin.” tanpa konteks makanan => appropriateness ODD/UNKNOWN, bukan terus PASS.
- Jika sasaran sudah dipenuhi tetapi tambahan lain membentuk gabungan yang pelik seperti “Ali sangat gembira dengan batu marah.”, jangan abaikan kejanggalan itu. meaning boleh PASS jika inti masih jelas, tetapi appropriateness mesti ODD/UNKNOWN dan primary_issue APPROPRIATENESS atau CLARIFY.
- Jangan paksa semua kes pelik ke APPROPRIATENESS. Jika hubungan inti rosak, gunakan MEANING; jika jenis sasaran tidak dipenuhi (contohnya WITH-WHOM tetapi objek bukan teman), gunakan SKILL_TARGET.
- Lokasi imaginatif yang masih boleh difahami seperti “Saya membaca buku di atas bulan.” boleh IMAGINATIVE dan PASS; jangan tandakan salah hanya kerana tidak realistik.
  `.trim();

  const input = `
Ayat asas:
${baseSentence}

Ayat murid:
${studentAnswer}

Nilai sama ada maksud ayat asas dikekalkan dan murid
telah menambah satu maklumat yang bermakna.
  `.trim();

  if (process.env.OPENAI_API_KEY) {
    try {
      return await requestStructuredSemanticJudgment({
        instructions,
        input
      });
    } catch (error) {
      console.warn(
        "[Semantic Judge] OpenAI failed; trying Groq fallback:",
        error?.message || error
      );

      if (!process.env.GROQ_API_KEY) {
        throw error;
      }
    }
  }

  if (process.env.GROQ_API_KEY) {
    return requestGroqSemanticJudgment({
      instructions,
      input
    });
  }

  const error =
    new Error("No AI provider available for semantic judgment.");
  error.status = 503;
  error.publicMessage =
    "Semantic checking is temporarily unavailable.";
  throw error;
}


async function requestStructuredSemanticJudgment({
  instructions,
  input
}) {

  const response =
    await fetch(
      OPENAI_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body:
          JSON.stringify({
            model: DEFAULT_MODEL,
            instructions,
            input,
            text: {
              format: {
                type: "json_schema",
                name: "karangan_semantic_judgment",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    result: { type: "string", enum: ["PASS", "RETRY", "CLARIFY"] },
                    meaning_status: { type: "string", enum: ["PASS", "FAIL", "UNCERTAIN"] },
                    skill_target_status: { type: "string", enum: ["MET", "NOT_MET", "UNCERTAIN"] },
                    appropriateness: { type: "string", enum: ["NATURAL", "POSSIBLE", "IMAGINATIVE", "ODD", "INVALID", "UNKNOWN"] },
                    language_status: { type: "string", enum: ["CLEAN", "MINOR_ISSUE"] },
                    language_issue: { type: ["string", "null"] },
                    primary_issue: { type: "string", enum: ["MEANING", "SKILL_TARGET", "APPROPRIATENESS", "LANGUAGE", "NONE"] },
                    preserved_parts: {
                      type: "array",
                      items: { type: "string", enum: ["BASE_MEANING", "SKILL_TARGET", "CREATIVE_IDEA", "LANGUAGE_FORM"] }
                    },
                    needs_clarification: { type: "boolean" },
                    clarification_question: { type: "string" },
                    confidence: { type: "number", minimum: 0, maximum: 1 }
                  },
                  required: [
                    "result",
                    "meaning_status",
                    "skill_target_status",
                    "appropriateness",
                    "language_status",
                    "language_issue",
                    "primary_issue",
                    "preserved_parts",
                    "needs_clarification",
                    "clarification_question",
                    "confidence"
                  ],
                  additionalProperties: false
                }
              }
            }
          })
      }
    );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "[OpenAI Semantic Judge Error]",
      data
    );

    const error =
      new Error(
        data?.error?.message ||
        "OpenAI semantic judgment failed."
      );

    error.status = response.status;
    error.publicMessage =
      "Semantic checking is temporarily unavailable.";
    throw error;
  }

  const outputText =
    extractResponseText(data);

  if (!outputText) {
    throw new Error(
      "Empty semantic judgment output."
    );
  }

  try {
    return cleanSemanticJudgment(
      JSON.parse(outputText)
    );
  } catch (error) {
    console.error(
      "[Semantic Judge JSON Parse Error]",
      outputText
    );
    throw new Error(
      "Invalid semantic judgment JSON."
    );
  }
}


async function requestGroqSemanticJudgment({
  instructions,
  input
}) {

  const response =
    await fetch(
      GROQ_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`
        },
        body:
          JSON.stringify({
            model:
              await getGroqTranslationModel(),
            temperature: 0,
            response_format: {
              type: "json_object"
            },
            messages: [
              {
                role: "system",
                content:
                  instructions +
                  "\nBalas JSON sahaja. Jangan gunakan markdown."
              },
              {
                role: "user",
                content: input
              }
            ]
          })
      }
    );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "[Groq Semantic Judge Error]",
      data
    );
    const error =
      new Error(
        data?.error?.message ||
        "Groq semantic judgment failed."
      );
    error.status = response.status;
    throw error;
  }

  const output =
    String(
      data?.choices?.[0]?.message?.content || ""
    ).trim();

  if (!output) {
    throw new Error(
      "Empty Groq semantic judgment output."
    );
  }

  try {
    return cleanSemanticJudgment(
      JSON.parse(
        output
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/, "")
      )
    );
  } catch (error) {
    console.error(
      "[Groq Semantic Judge JSON Parse Error]",
      output
    );
    throw new Error(
      "Invalid Groq semantic judgment JSON."
    );
  }
}


function cleanSemanticJudgment(result) {
  const allowedAppropriateness=new Set(["NATURAL","POSSIBLE","IMAGINATIVE","ODD","INVALID","UNKNOWN"]);
  const allowedPrimary=new Set(["MEANING","SKILL_TARGET","APPROPRIATENESS","LANGUAGE","NONE"]);
  const allowedPreserved=new Set(["BASE_MEANING","SKILL_TARGET","CREATIVE_IDEA","LANGUAGE_FORM"]);
  const norm=(v,allowed,fallback)=>{const x=String(v||fallback).toUpperCase();return allowed.has(x)?x:fallback;};
  const resultSet=new Set(["PASS","RETRY","CLARIFY"]), meaningSet=new Set(["PASS","FAIL","UNCERTAIN"]), skillSet=new Set(["MET","NOT_MET","UNCERTAIN"]), languageSet=new Set(["CLEAN","MINOR_ISSUE"]);
  const confidenceRaw=Number(result?.confidence);
  const confidence=Number.isFinite(confidenceRaw)?Math.max(0,Math.min(1,confidenceRaw)):0;
  const meaning_status=norm(result?.meaning_status,meaningSet,"UNCERTAIN");
  const skill_target_status=norm(result?.skill_target_status,skillSet,"UNCERTAIN");
  const appropriateness=norm(result?.appropriateness||result?.semantic_class,allowedAppropriateness,"UNKNOWN");
  const language_status=norm(result?.language_status,languageSet,result?.language_issue?"MINOR_ISSUE":"CLEAN");
  const language_issue=result?.language_issue?String(result.language_issue).trim():null;
  let primary_issue="NONE";
  let finalResult="PASS";

  // Canonical Teaching Engine v2 hierarchy. Lower layers can never override
  // an earlier layer, and model-provided result/primary_issue are normalized
  // into one internally consistent contract.
  if(meaning_status==="UNCERTAIN"){
    finalResult="CLARIFY";
  }
  else if(meaning_status==="FAIL"){
    primary_issue="MEANING";finalResult="RETRY";
  }
  else if(skill_target_status==="UNCERTAIN"){
    finalResult="CLARIFY";
  }
  else if(skill_target_status==="NOT_MET"){
    primary_issue="SKILL_TARGET";finalResult="RETRY";
  }
  else if(["ODD","UNKNOWN"].includes(appropriateness)){
    finalResult="CLARIFY";
  }
  else if(appropriateness==="INVALID"){
    primary_issue="APPROPRIATENESS";finalResult="RETRY";
  }
  else if(language_status==="MINOR_ISSUE"){
    primary_issue="LANGUAGE";finalResult="RETRY";
  }

  const needs_clarification=finalResult==="CLARIFY";
  let clarification_question=String(result?.clarification_question||"").trim();
  if(needs_clarification && !clarification_question){
    clarification_question="Boleh jelaskan maksud ayat kamu sedikit lagi?";
  }
  if(!needs_clarification){
    clarification_question="";
  }

  const preserved=Array.isArray(result?.preserved_parts)?result.preserved_parts.map(x=>String(x).toUpperCase()).filter(x=>allowedPreserved.has(x)):[];
  return {
    result:finalResult,
    meaning_status,
    skill_target_status,
    appropriateness,
    language_status,
    language_issue,
    primary_issue,
    preserved_parts:[...new Set(preserved)],
    needs_clarification,
    clarification_question,
    confidence,
    // Backward-compatible aliases for older clients.
    target_met:skill_target_status==="MET",
    meaning_preserved:meaning_status==="PASS",
    semantic_class:appropriateness,
    information_type:"UNKNOWN",
    engine_version:"AI-NATIVE-V3",
    provider_model:DEFAULT_MODEL
  };
}


/* =========================================================
   STANDARD TEXT AI
   ========================================================= */

async function generateText({

  instructions,

  input

}) {

  const response =
    await fetch(
      OPENAI_URL,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`

        },

        body:
          JSON.stringify({

            model:
              DEFAULT_MODEL,

            instructions,

            input

          })

      }
    );


  const data =
    await response.json();


  if (
    !response.ok
  ) {

    console.error(
      "[OpenAI Text Error]",
      data
    );


    const error =
      new Error(
        data?.error?.message ||
        "OpenAI request failed."
      );


    error.status =
      response.status;


    error.publicMessage =
      data?.error?.message ||
      "AI 暂时无法回应，请稍后再试。";


    throw error;

  }


  const answer =
    extractResponseText(
      data
    );


  if (!answer) {

    return (
      "Maaf, saya tidak dapat menghasilkan jawapan sekarang."
    );

  }


  return answer;

}


/* =========================================================
   RESPONSES API TEXT EXTRACTOR
   ========================================================= */

function extractResponseText(
  data
) {

  if (!data) {

    return "";

  }


  if (
    typeof data.output_text ===
      "string" &&
    data.output_text.trim()
  ) {

    return data.output_text.trim();

  }


  let result = "";


  if (
    Array.isArray(
      data.output
    )
  ) {

    for (
      const item of
      data.output
    ) {

      if (
        !Array.isArray(
          item?.content
        )
      ) {

        continue;

      }


      for (
        const content of
        item.content
      ) {

        if (
          content?.type ===
            "output_text" &&
          typeof content.text ===
            "string"
        ) {

          result +=
            content.text;

        }

      }

    }

  }


  return result.trim();

}


/* =========================================================
   END KARANGAN AI API v4.7.0
   ========================================================= */
