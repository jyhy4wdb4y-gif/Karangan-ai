export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text = "", kind = "word" } = req.body || {};
    const input = String(text || "").trim();

    if (!input) return res.status(400).json({ error: "Text is required." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured." });
    }

    const isWord = kind === "word";
    const instructions = isWord
      ? "Speak this Bahasa Melayu Malaysia word clearly and naturally. Warm, youthful female primary-school teacher style. Malaysian Malay pronunciation, not Indonesian. Slightly slower than normal, with crisp articulation. Say only the supplied word."
      : "Read this Bahasa Melayu Malaysia passage naturally. Warm, youthful, friendly female primary-school teacher style. Malaysian Malay pronunciation, not Indonesian. Clear articulation, expressive but not theatrical, comfortable classroom pace.";

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "coral",
        input,
        instructions,
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Speech API error:", response.status, errorText);
      return res.status(response.status).json({ error: "AI voice unavailable." });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.status(200).send(audio);
  } catch (error) {
    console.error("Speech server error:", error);
    return res.status(500).json({ error: "Speech generation failed." });
  }
}
