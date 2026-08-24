export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const body = req.body || {};

    const {
      type = "mentor",
      message = "",
      mode = "teacher",
      word = "",
      context = "",
      text = "",
      level = "Primary School",
      language = "Bahasa Melayu",
      instruction = "",
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY 尚未设置。",
      });
    }


    /* =====================================================
       TRANSLATION
       Return structured JSON directly
       ===================================================== */

    if (type === "translate") {
      if (!word || typeof word !== "string") {
        return res.status(400).json({
          error: "Perkataan diperlukan.",
        });
      }

      const response = await fetch(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.OPENAI_API_KEY}`,
          },

          body: JSON.stringify({
            model: "gpt-5.6-luna",

            instructions: `
Anda ialah kamus Bahasa Melayu Malaysia
untuk murid sekolah rendah Tahun 3 hingga Tahun 5.

Terangkan SATU perkataan Bahasa Melayu.

Peraturan:
- Gunakan konteks ayat jika tersedia.
- Gunakan Bahasa Melayu Malaysia.
- Jangan gunakan Bahasa Indonesia.
- Chinese mesti dalam Simplified Chinese.
- English mesti sentiasa diberikan.
- Maksud BM mesti pendek dan mudah.
- Jangan tinggalkan mana-mana medan.
            `.trim(),

            input: `
Perkataan: ${word}

Konteks:
${context || "Tiada konteks."}
            `.trim(),

            text: {
              format: {
                type: "json_schema",

                name: "malay_word_translation",

                strict: true,

                schema: {
                  type: "object",

                  properties: {
                    zh: {
                      type: "string",
                    },

                    en: {
                      type: "string",
                    },

                    meaning: {
                      type: "string",
                    },
                  },

                  required: [
                    "zh",
                    "en",
                    "meaning",
                  ],

                  additionalProperties: false,
                },
              },
            },
          }),
        }
      );

      const data =
        await response.json();


      if (!response.ok) {
        console.error(
          "Translation API error:",
          data
        );

        return res.status(
          response.status
        ).json({
          error:
            data?.error?.message ||
            "Translation unavailable.",
        });
      }


      let outputText = "";


      if (data.output_text) {
        outputText =
          data.output_text;

      } else if (
        Array.isArray(data.output)
      ) {
        for (const item of data.output) {
          if (!Array.isArray(item.content)) {
            continue;
          }

          for (const content of item.content) {
            if (
              content.type === "output_text" &&
              content.text
            ) {
              outputText += content.text;
            }
          }
        }
      }


      try {
        const parsed =
          JSON.parse(outputText);


        return res.status(200).json({
          type: "translate",

          word,

          zh:
            parsed.zh || "",

          en:
            parsed.en || "",

          meaning:
            parsed.meaning || "",

          answer:
            `${parsed.zh} · ${parsed.en}`,
        });

      } catch (error) {
        console.error(
          "Translation JSON parse error:",
          outputText
        );

        return res.status(500).json({
          error:
            "Translation response format invalid.",
        });
      }
    }


    /* =====================================================
       WRITING FEEDBACK
       ===================================================== */

    if (type === "writing-feedback") {
      if (!text || typeof text !== "string") {
        return res.status(400).json({
          error: "Karangan diperlukan.",
        });
      }


      return runTextAI({
        res,

        instructions: `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia.

Tahap:
${level}

Bahasa:
${language}

Berikan maklum balas ringkas dan positif.

Semak:
- isi
- tatabahasa
- ejaan
- kosa kata
- struktur ayat

Jangan tulis semula seluruh karangan.
Jangan gunakan Bahasa Indonesia.

Format:

🌟 Kekuatan:
...

💡 Cuba perbaiki:
...

🧠 Cabaran seterusnya:
...
        `.trim(),

        input: `
Karangan murid:

${text}

${instruction || ""}
        `.trim(),
      });
    }


    /* =====================================================
       MENTOR
       ===================================================== */

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "请输入内容。",
      });
    }


    return runTextAI({
      res,

      instructions: `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia.

Gaya:
- Bahasa Melayu Malaysia.
- Jangan gunakan Bahasa Indonesia.
- Sesuai untuk sekolah rendah.
- Gunakan penerangan ringkas.
- Berikan petunjuk.
- Jangan terus menulis seluruh karangan.
- Jika murid menggunakan Bahasa Cina,
  boleh terangkan secara ringkas dalam Bahasa Cina.

Mode:
${mode}

${instruction || ""}
      `.trim(),

      input:
        message,
    });


  } catch (error) {
    console.error(
      "Server error:",
      error
    );

    return res.status(500).json({
      error:
        "服务器发生错误，请稍后再试。",
    });
  }
}


/* =====================================================
   STANDARD TEXT AI
   ===================================================== */

async function runTextAI({
  res,
  instructions,
  input,
}) {
  const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model:
          "gpt-5.6-luna",

        instructions,

        input,
      }),
    }
  );


  const data =
    await response.json();


  if (!response.ok) {
    console.error(
      "OpenAI API error:",
      data
    );

    return res
      .status(response.status)
      .json({
        error:
          data?.error?.message ||
          "AI 暂时无法回应，请稍后再试。",
      });
  }


  let answer = "";


  if (data.output_text) {
    answer =
      data.output_text;

  } else if (
    Array.isArray(data.output)
  ) {
    for (const item of data.output) {
      if (!Array.isArray(item.content)) {
        continue;
      }

      for (const content of item.content) {
        if (
          content.type === "output_text" &&
          content.text
        ) {
          answer +=
            content.text;
        }
      }
    }
  }


  if (!answer) {
    answer =
      "Maaf, saya tidak dapat menghasilkan jawapan sekarang.";
  }


  return res.status(200).json({
    answer,
  });
}
