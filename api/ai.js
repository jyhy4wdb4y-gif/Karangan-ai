/* =========================================================
   KARANGAN AI
   API / AI CONTROLLER
   Version 4.3 Auto Groq Model

   Supports:
   - translate
   - writing-feedback
   - mentor

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
   END KARANGAN AI API v4.3
   ========================================================= */
