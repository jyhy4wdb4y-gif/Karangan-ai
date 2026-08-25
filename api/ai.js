/* =========================================================
   KARANGAN AI
   API / AI CONTROLLER
   Version 4.1

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
      !process.env.OPENAI_API_KEY
    ) {

      return res
        .status(500)
        .json({
          error:
            "OPENAI_API_KEY 尚未设置。",
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

  const baseInstructions = `
Anda ialah kamus pintar Bahasa Melayu Malaysia
untuk murid sekolah rendah Tahun 3 hingga Tahun 5.

Anda mesti menerangkan SATU perkataan Bahasa Melayu.

WAJIB:
- "zh" mesti mempunyai terjemahan Simplified Chinese.
- "en" mesti mempunyai terjemahan English.
- "meaning" mesti mempunyai penerangan ringkas
  dalam Bahasa Melayu Malaysia.
- Ketiga-tiga medan TIDAK BOLEH kosong.
- Gunakan konteks ayat untuk menentukan maksud tepat.
- Jangan gunakan Bahasa Indonesia.
- English mesti sesuai dengan maksud perkataan
  dalam ayat, bukan terjemahan rawak.
- Jika perkataan mempunyai beberapa maksud,
  pilih maksud yang paling sesuai dengan konteks.
- Maksud BM mesti mudah difahami murid sekolah rendah.

Contoh:

Perkataan:
pertandingan

Output:
{
  "zh": "比赛 / 竞赛",
  "en": "competition / contest",
  "meaning": "Aktiviti untuk menentukan peserta atau pasukan yang terbaik."
}

Perkataan:
mengadakan

Output:
{
  "zh": "举办 / 举行",
  "en": "organize / hold",
  "meaning": "Menjalankan atau menganjurkan sesuatu aktiviti."
}
  `.trim();


  const userInput = `
Perkataan:
${word}

Konteks ayat:
${context || "Tiada konteks diberikan."}

Terjemahan Cina sedia ada:
${knownChinese || "Tiada."}

Berikan terjemahan yang lengkap.
  `.trim();


  /*
    Attempt 1
  */

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


  console.warn(
    "[Translation] First response incomplete:",
    word,
    result
  );


  /*
    Attempt 2
    Stronger repair request.
  */

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

Walaupun terjemahan Chinese sudah diketahui,
anda MASIH WAJIB memberikan English.

Setiap nilai mesti mempunyai sekurang-kurangnya
satu perkataan.
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


  console.error(
    "[Translation] Second response incomplete:",
    word,
    result
  );


  /*
    Attempt 3
    Plain Responses API rescue.
    If strict structured output ever fails, do NOT give up on the word.
  */

  const rescue =
    await requestPlainTranslation({
      instructions: `
Anda ialah kamus Bahasa Melayu Malaysia untuk murid sekolah rendah.

Terjemahkan SATU perkataan Bahasa Melayu.

WAJIB pulangkan tepat satu baris:
ZH=<terjemahan Cina ringkas>|||EN=<terjemahan Inggeris ringkas>|||BM=<maksud BM ringkas>

Jangan gunakan Bahasa Indonesia.
Jangan biarkan mana-mana bahagian kosong.
      `.trim(),

      input: `
Perkataan: ${word}
Konteks: ${context || "Tiada konteks diberikan."}
      `.trim()
    });


  if (rescue) {
    const match =
      String(rescue).match(
        /ZH\s*=\s*(.*?)\s*\|\|\|\s*EN\s*=\s*(.*?)\s*\|\|\|\s*BM\s*=\s*(.*)/is
      );

    if (match) {
      const repaired = {
        zh: String(match[1] || "").trim(),
        en: String(match[2] || "").trim(),
        meaning: String(match[3] || "").trim()
      };

      if (isTranslationComplete(repaired)) {
        return cleanTranslation(repaired);
      }
    }
  }


  const error =
    new Error(
      "Translation incomplete after three attempts."
    );


  error.status =
    502;


  error.publicMessage =
    "Terjemahan lengkap tidak dapat dijana. Sila cuba lagi.";


  throw error;

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
   PLAIN TRANSLATION RESCUE
   ========================================================= */

async function requestPlainTranslation({
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

            reasoning: {
              effort:
                "none"
            },

            instructions,
            input
          })
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    console.error(
      "[OpenAI Translation Rescue Error]",
      data
    );

    return "";
  }


  return extractResponseText(
    data
  );

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
   END KARANGAN AI API v4.1
   ========================================================= */
