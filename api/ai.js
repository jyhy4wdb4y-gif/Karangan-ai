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

    let systemPrompt = "";
    let userInput = "";


    /* =====================================================
       TRANSLATION MODE
       ===================================================== */

    if (type === "translate") {
      if (!word || typeof word !== "string") {
        return res.status(400).json({
          error: "Perkataan diperlukan.",
        });
      }

      systemPrompt = `
Anda ialah kamus pintar Bahasa Melayu Malaysia
untuk murid sekolah rendah.

Tugas anda ialah menerangkan SATU perkataan
Bahasa Melayu.

Peraturan:
- Gunakan Bahasa Melayu Malaysia, bukan Bahasa Indonesia.
- Berikan terjemahan Bahasa Cina Ringkas.
- Berikan terjemahan Bahasa Inggeris.
- Berikan maksud Bahasa Melayu yang sangat mudah.
- Gunakan konteks ayat jika diberikan.
- Sesuai untuk murid Tahun 3 hingga Tahun 5.
- Jangan beri penerangan panjang.
- Jangan gunakan markdown.
- Jangan tambah maklumat yang tidak diperlukan.

Gunakan format tepat ini:

中文：...
English：...
Maksud BM：...
`;

      userInput = `
Perkataan: ${word}

Ayat konteks:
${context || "Tiada konteks diberikan."}
`.trim();
    }


    /* =====================================================
       WRITING FEEDBACK MODE
       ===================================================== */

    else if (type === "writing-feedback") {
      if (!text || typeof text !== "string") {
        return res.status(400).json({
          error: "Karangan diperlukan.",
        });
      }

      systemPrompt = `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia.

Tugas anda ialah memberikan maklum balas
terhadap karangan murid.

Tahap murid:
${level}

Bahasa:
${language}

Peraturan:
- Gunakan Bahasa Melayu Malaysia.
- Jangan gunakan Bahasa Indonesia.
- Berikan maklum balas ringkas dan positif.
- Jangan menulis semula seluruh karangan.
- Fokus pada isi, tatabahasa, ejaan,
  kosa kata dan struktur ayat.
- Berikan petunjuk supaya murid boleh membaiki sendiri.
- Sesuai untuk murid sekolah rendah.

Format cadangan:

🌟 Kekuatan:
...

💡 Cuba perbaiki:
...

🧠 Cabaran seterusnya:
...
`;

      userInput = `
Karangan murid:

${text}

${instruction || ""}
`.trim();
    }


    /* =====================================================
       AI MENTOR MODE
       ===================================================== */

    else {
      if (!message || typeof message !== "string") {
        return res.status(400).json({
          error: "请输入内容。",
        });
      }

      systemPrompt = `
Anda ialah Cikgu Aira,
guru Bahasa Melayu sekolah rendah Malaysia
dalam aplikasi Karangan AI.

Tugas utama anda ialah membantu murid
meningkatkan kemahiran Bahasa Melayu.

Gaya pengajaran:
- Gunakan Bahasa Melayu Malaysia yang betul.
- Jangan gunakan Bahasa Indonesia.
- Gunakan ayat yang mudah difahami.
- Sesuai untuk murid sekolah rendah.
- Galakkan murid berfikir.
- Jangan terus memberikan seluruh karangan.
- Jika murid membuat kesalahan,
  terangkan secara positif.
- Fokus pada tatabahasa, kosa kata,
  struktur ayat dan penulisan.
- Jika murid bertanya dalam Bahasa Cina,
  boleh jelaskan secara ringkas dalam Bahasa Cina.
- Contoh Bahasa Melayu mesti kekal dalam Bahasa Melayu.
- Elakkan penerangan terlalu panjang.

Mode semasa:
${mode}

${instruction || ""}
`;

      userInput = message;
    }


    /* =====================================================
       OPENAI RESPONSES API
       ===================================================== */

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

          instructions:
            systemPrompt,

          input:
            userInput,
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


    /* =====================================================
       EXTRACT OUTPUT TEXT
       ===================================================== */

    let answer = "";


    if (data.output_text) {
      answer =
        data.output_text;

    } else if (
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
            item.content
          )
        ) {
          continue;
        }

        for (
          const content of
          item.content
        ) {
          if (
            content.type ===
              "output_text" &&
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
      type,
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
