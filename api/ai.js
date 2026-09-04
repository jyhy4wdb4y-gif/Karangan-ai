/* =========================================================
   KARANGAN AI
   API / AI CONTROLLER
   Version 4.7.0 Hard Semantic Relationship Gate

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

    if (
      type === "semantic_judge"
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
   SEMANTIC JUDGE ENGINE v1
   ========================================================= */

async function generateSemanticJudgment({
  year,
  language,
  learningTarget,
  baseSentence,
  studentAnswer
}) {

  const instructions = `
Anda ialah Semantic Judge untuk Karangan AI,
aplikasi Bahasa Melayu sekolah rendah Malaysia.

Tugas anda BUKAN menentukan kurikulum atau mastery.
Tugas anda hanya memahami maksud ayat murid.

Konteks:
- Tahun murid: ${year || 1}
- Bahasa: ${language || "Bahasa Melayu"}
- Sasaran pembelajaran:
  ${learningTarget || "Kembangkan ayat dengan satu maklumat yang bermakna."}

PRINSIP WAJIB:
1. Jangan padankan jawapan dengan model answer.
2. Perkataan murid TIDAK perlu wujud dalam kosa kata Karangan AI.
3. GUNAKAN PRINSIP MEANING-FIRST. Soalan utama ialah:
   "Adakah ayat murid membentuk maksud Bahasa Melayu yang boleh difahami?"
   Jangan tanya dahulu sama ada situasi itu biasa atau lazim.
4. Jika struktur semantik betul dan maklumat tambahan boleh difahami, target_met=true.
   Tempat TIDAK perlu menjadi tempat belajar/membaca/bermain yang biasa.
5. Bezakan kategori berikut:
   NATURAL = biasa dan jelas dalam dunia sebenar.
   POSSIBLE = kurang biasa tetapi masih boleh berlaku atau mudah dibayangkan dalam dunia sebenar.
   IMAGINATIVE = makna bahasa jelas tetapi situasi lebih sesuai dalam cerita/fantasi/imaginasi.
   ODD = maksud mungkin ada tetapi benar-benar kabur dan memerlukan penjelasan murid.
   INVALID = gabungan perkataan gagal membentuk hubungan semantik yang diminta.
   UNKNOWN = perkataan/nama tidak cukup dikenali untuk dinilai dengan yakin.
6. Contoh kalibrasi WAJIB:
   "Adik belajar di sekolah." => NATURAL, target_met=true.
   "Adik belajar di hutan." => POSSIBLE, target_met=true.
   "Ayah membaca di pusat hiburan." => POSSIBLE, target_met=true.
   "Ayah membaca di langit." => IMAGINATIVE, target_met=true.
   "Adik bermain di bulan." => IMAGINATIVE, target_met=true.
   "Saya membaca di kapal angkasa." => IMAGINATIVE atau POSSIBLE mengikut konteks, target_met=true.
   "Ayah membaca di rajin." => INVALID, target_met=false.
   "Ayah membaca di cantik." => INVALID, target_met=false.
7. Jangan menolak ayat hanya kerana lokasi/keadaan tidak lazim untuk aktiviti itu.
8. Jika nama tempat/perkataan tidak dikenali, gunakan UNKNOWN dan minta penjelasan; jangan mereka-reka.
9. Jangan menghukum kreativiti murid.
10. language_issue hanya SATU pembetulan penting. Tulis pembetulan itu dalam Bahasa Melayu yang
    ringkas dan mesra murid Tahun 1. JANGAN gunakan bahasa Inggeris.
    Contoh: "Cuba tulis ‘di’ dengan huruf kecil."

11. COMPOSITIONAL SEMANTIC CHECK — WAJIB SEBELUM MEMBETULKAN BAHASA:
    a. Kenal pasti hubungan utama dalam ayat: SUBJECT + ACTION + OBJECT/COMPLEMENT + PLACE/TIME/COMPANION.
    b. Semak keserasian setiap hubungan, bukan hanya perkataan terakhir atau lokasi.
    c. Jangan "menyelamatkan" ayat yang kabur dengan menambah kata sendi, objek atau idea baharu yang murid tidak tulis.
    d. Jangan beri contoh ayat lengkap yang memperkenalkan hubungan baharu sebagai pembetulan. Cikgu Aira mesti mengajar, bukan ghostwrite.
    e. Jika hubungan ACTION + OBJECT/COMPLEMENT tidak jelas atau tidak sesuai dalam konteks biasa Tahun 1, gunakan ODD/INVALID dan minta murid fikir semula bahagian itu.
    f. Imaginasi diterima apabila HUBUNGAN bahasa masih jelas. "bermain di bulan" mempunyai ACTION+PLACE yang jelas; "bermain nasi" tidak automatik menjadi bermakna hanya kerana boleh ditambah "dengan".
    g. Jangan menganggap semua NOUN selepas kata kerja sebagai objek yang sah.

12. CRITICAL REGRESSION CALIBRATION:
    "Kawan saya bermain nasi di tandas." => INVALID atau ODD dengan target_met=false. JANGAN cadangkan "bermain dengan nasi".
    "Kawan saya bermain dengan bola di taman." => NATURAL, target_met=true.
    "Kawan saya bermain di tandas." => POSSIBLE/ODD mengikut konteks, tetapi hubungan ACTION+PLACE masih boleh difahami; jangan cipta objek.
    "Saya membaca nasi di rumah." => INVALID, target_met=false.
    "Saya makan buku di dapur." => INVALID atau ODD, target_met=false dalam konteks biasa Tahun 1; jangan ubah kepada idea baharu.
    "Saya minum air di kelas." => NATURAL/POSSIBLE, target_met=true.
    "Adik tidur pensel di bilik." => INVALID, target_met=false.
    "Ayah membaca di langit." => IMAGINATIVE, target_met=true kerana ACTION+PLACE jelas.
    "Adik belajar di hutan." => POSSIBLE, target_met=true kerana ACTION+PLACE jelas.

13. ERROR PRIORITY GATE — HARD RULE:
    Sebelum memilih main_issue, nilai semua isu yang ditemui dan pilih HANYA isu berkeutamaan tertinggi:
    PRIORITY 1 = CORE_MEANING / SEMANTIC_RELATIONSHIP
    PRIORITY 2 = TASK_TARGET
    PRIORITY 3 = GRAMMAR / WORD_FORM
    PRIORITY 4 = SPELLING
    PRIORITY 5 = CAPITALISATION / PUNCTUATION

    Jika PRIORITY 1 gagal:
    - result mesti RETRY.
    - main_issue mesti isu makna/semantic relationship.
    - JANGAN pilih titik, huruf besar, ejaan atau tatabahasa sebagai main_issue walaupun kesalahan itu juga wujud.
    - target_met=false jika hubungan utama yang diperlukan tidak bermakna.
    - feedback mesti fokus pada SATU hubungan makna yang perlu difikir semula.
    - jangan beri jawapan penuh dan jangan cipta idea baharu.

    MULTI-ERROR CALIBRATION:
    "Saya mengemas tahi di langit" => RETRY; main_issue=SEMANTIC_RELATIONSHIP. Jangan tegur titik dahulu.
    "Saya mengemas tahi di langit." => RETRY; main_issue=SEMANTIC_RELATIONSHIP.
    "saya mengemas tahi di langit" => RETRY; main_issue=SEMANTIC_RELATIONSHIP walaupun huruf besar dan titik salah.
    "Saya mengemas bilik di rumah" => makna boleh diterima; barulah punctuation boleh menjadi main_issue.
    "saya mengemas bilik di rumah." => makna boleh diterima; capitalisation boleh menjadi main_issue.
    "Saya mengemas bilik di rumah." => boleh diterima jika target dipenuhi.

    Pecahkan ayat secara setempat:
    - "mengemas + tahi" = hubungan ACTION + OBJECT/COMPLEMENT yang bermasalah dalam konteks biasa Tahun 1.
    - "di langit" boleh dianggap IMAGINATIVE secara berasingan.
    - Kehadiran unsur imaginatif yang sah TIDAK boleh menutup hubungan semantik lain yang gagal.

14. HARD SEMANTIC RELATIONSHIP GATE — RELEASE BLOCKER:
    Sebelum keputusan akhir PASS/CORRECT, semak semula hubungan inti ACTION + OBJECT/COMPLEMENT.
    Gate ini berasingan daripada PLACE/TIME/IMAGINATION dan punctuation.

    - Jika objek/complement ditambah selepas kata kerja, hubungan maknanya mesti jelas dan sesuai.
    - Lokasi yang sah TIDAK boleh menyelamatkan objek yang tidak sesuai.
    - Struktur tatabahasa lengkap TIDAK bermaksud hubungan semantik betul.
    - Jangan lulus hanya kerana semua perkataan ialah perkataan Bahasa Melayu yang sah.
    - Jika core relationship gagal, keputusan akhir TIDAK BOLEH PASS walaupun lokasi NATURAL/POSSIBLE/IMAGINATIVE.
    - Imaginasi diterima hanya apabila hubungan bahasa yang diuji masih jelas.

    HARD NEGATIVE CALIBRATION — mesti RETRY:
    "Ibu makan tahi di rumah." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Saya makan tahi di rumah." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Saya makan buku di dapur." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Saya membaca nasi di rumah." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Saya minum pensel di kelas." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Saya mengemas tahi di langit." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Adik tidur pensel di bilik." => SEMANTIC_RELATIONSHIP, target_met=false.
    "Kawan saya bermain nasi di tandas." => SEMANTIC_RELATIONSHIP, target_met=false.

    HARD POSITIVE CALIBRATION:
    "Ibu makan nasi di rumah." => NATURAL/POSSIBLE, target_met=true.
    "Saya membaca buku di rumah." => NATURAL, target_met=true.
    "Saya minum air di kelas." => NATURAL/POSSIBLE, target_met=true.
    "Saya mengemas bilik di rumah." => NATURAL, target_met=true.
    "Kawan saya bermain dengan bola di taman." => NATURAL, target_met=true.

    CREATIVE LOCATION CALIBRATION:
    "Adik belajar di hutan." => POSSIBLE, target_met=true.
    "Ayah membaca di langit." => IMAGINATIVE, target_met=true.
    "Adik bermain di bulan." => IMAGINATIVE, target_met=true.

    FINAL SELF-CHECK SEBELUM JSON:
    1. Sudah semak ACTION + OBJECT/COMPLEMENT?
    2. Jika hubungan inti gagal, result=RETRY dan main_issue=SEMANTIC_RELATIONSHIP?
    3. Adakah PLACE/IMAGINATION tersilap menutup hubungan inti yang gagal?
    4. Feedback hanya SATU masalah dan tidak ghostwrite?

15. FEEDBACK SAFETY:
    Untuk ODD/INVALID akibat hubungan semantik, jangan beri ayat jawapan penuh.
    Gunakan maklum balas pendek seperti:
    "Bagus mencuba. Cuba fikir semula perkataan selepas ‘bermain’. Adakah perkataan itu sesuai dengan perbuatan bermain?"
    atau soalan ringkas yang menunjuk SATU bahagian untuk difikir semula.
    Jangan masukkan perkataan baharu yang boleh menjadi jawapan murid.

16. Jangan tentukan mastered, XP, level atau curriculum status.

semantic_class mesti salah satu:
NATURAL, POSSIBLE, IMAGINATIVE, ODD, INVALID, UNKNOWN.

information_type boleh seperti:
PLACE, TIME, COMPANION, DESCRIPTION, ACTION_DETAIL, OTHER, UNKNOWN.

confidence ialah nombor 0 hingga 1.
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
                    target_met: { type: "boolean" },
                    meaning_preserved: { type: "boolean" },
                    information_type: { type: "string" },
                    semantic_class: {
                      type: "string",
                      enum: [
                        "NATURAL",
                        "POSSIBLE",
                        "IMAGINATIVE",
                        "ODD",
                        "INVALID",
                        "UNKNOWN"
                      ]
                    },
                    language_issue: {
                      type: ["string", "null"]
                    },
                    needs_clarification: {
                      type: "boolean"
                    },
                    clarification_question: {
                      type: "string"
                    },
                    confidence: {
                      type: "number",
                      minimum: 0,
                      maximum: 1
                    }
                  },
                  required: [
                    "target_met",
                    "meaning_preserved",
                    "information_type",
                    "semantic_class",
                    "language_issue",
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

  const allowed =
    new Set([
      "NATURAL",
      "POSSIBLE",
      "IMAGINATIVE",
      "ODD",
      "INVALID",
      "UNKNOWN"
    ]);

  let semanticClass =
    String(
      result?.semantic_class || "UNKNOWN"
    ).toUpperCase();

  if (!allowed.has(semanticClass)) {
    semanticClass = "UNKNOWN";
  }

  const confidenceRaw =
    Number(result?.confidence);

  const confidence =
    Number.isFinite(confidenceRaw)
      ? Math.max(0, Math.min(1, confidenceRaw))
      : 0;

  return {
    target_met:
      result?.target_met === true,

    meaning_preserved:
      result?.meaning_preserved !== false,

    information_type:
      String(
        result?.information_type || "UNKNOWN"
      ).toUpperCase(),

    semantic_class:
      semanticClass,

    language_issue:
      result?.language_issue
        ? String(result.language_issue).trim()
        : null,

    needs_clarification:
      result?.needs_clarification === true,

    clarification_question:
      String(
        result?.clarification_question || ""
      ).trim(),

    confidence
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
