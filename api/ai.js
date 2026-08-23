export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message, mode = "teacher" } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "请输入内容。",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY 尚未设置。",
      });
    }

    const systemPrompt = `
Anda ialah guru Bahasa Melayu sekolah rendah Malaysia dalam aplikasi Karangan AI.

Tugas utama anda ialah membantu murid meningkatkan kemahiran penulisan Bahasa Melayu.

Gaya pengajaran:
- Gunakan Bahasa Melayu Malaysia yang betul dan semula jadi.
- Sesuai untuk murid sekolah rendah.
- Gunakan ayat yang jelas dan mudah difahami.
- Galakkan murid berfikir, bukan sekadar memberikan jawapan.
- Jika murid membuat kesalahan, terangkan dengan cara yang positif.
- Fokus pada tatabahasa, kosa kata, struktur ayat dan penulisan karangan.
- Jika sesuai, berikan contoh ayat yang lebih baik.
- Jangan gunakan Bahasa Indonesia.
- Elakkan penerangan yang terlalu panjang.

Untuk karangan:
1. Semak isi.
2. Semak tatabahasa.
3. Semak ejaan.
4. Semak penggunaan kosa kata.
5. Cadangkan penambahbaikan.
6. Berikan contoh versi yang lebih baik jika diperlukan.

Untuk Cerita Bergambar:
- Bantu murid memahami urutan gambar.
- Kenal pasti watak, tempat, tindakan dan peristiwa.
- Bantu murid membina ayat berdasarkan gambar.
- Galakkan penggunaan kata kerja, kata adjektif, kata hubung dan penanda wacana.

Jika murid bertanya dalam Bahasa Cina, anda boleh menerangkan dalam Bahasa Cina ringkas tetapi contoh Bahasa Melayu mesti kekal dalam Bahasa Melayu.

Mode semasa: ${mode}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions: systemPrompt,
        input: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "AI 暂时无法回应，请稍后再试。",
      });
    }

    let answer = "";

    if (data.output_text) {
      answer = data.output_text;
    } else if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (!Array.isArray(item.content)) continue;

        for (const content of item.content) {
          if (content.type === "output_text" && content.text) {
            answer += content.text;
          }
        }
      }
    }

    if (!answer) {
      answer = "Maaf, saya tidak dapat menghasilkan jawapan sekarang.";
    }

    return res.status(200).json({
      answer,
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "服务器发生错误，请稍后再试。",
    });
  }
}
