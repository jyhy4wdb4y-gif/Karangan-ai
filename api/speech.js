/* =========================================================
   KARANGAN AI — NATURAL SPEECH API
   Version 5.1

   Uses OpenAI Text-to-Speech for:
   - story reading
   - single-word pronunciation

   Existing /api/ai.js is NOT changed.
   ========================================================= */

const OPENAI_SPEECH_URL =
  "https://api.openai.com/v1/audio/speech";

const SPEECH_MODEL =
  "gpt-4o-mini-tts";

const SPEECH_VOICE =
  "coral";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured.",
      });
    }

    const body = req.body || {};

    const text = String(
      body.text || ""
    ).trim();

    const mode =
      body.mode === "story"
        ? "story"
        : "word";

    if (!text) {
      return res.status(400).json({
        error: "Speech text is required.",
      });
    }

    /*
      OpenAI speech input has a finite request limit.
      Primary-school stories in Karangan AI should remain
      comfortably below this guardrail.
    */
    if (text.length > 4000) {
      return res.status(400).json({
        error: "Speech text is too long.",
      });
    }

    const instructions =
      mode === "word"
        ? `
Speak only the supplied Bahasa Melayu word or short phrase.
Use natural Malaysian Malay pronunciation.
Sound like a warm, friendly, modern primary-school teacher.
Pronounce clearly and gently, with slightly slower pacing for learning.
Do not add any explanation, translation, greeting, or extra words.
        `.trim()
        : `
Read the supplied Bahasa Melayu Malaysia story naturally.
Sound like a warm, friendly, modern primary-school teacher speaking to children aged 9 to 11.
Use clear Malaysian Malay pronunciation, natural phrasing, gentle expression, and comfortable pacing.
Do not sound robotic, theatrical, overly formal, or like a newsreader.
Do not add, remove, translate, or explain any words.
        `.trim();

    const response = await fetch(
      OPENAI_SPEECH_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: SPEECH_MODEL,
          voice: SPEECH_VOICE,
          input: text,
          instructions,
          response_format: "mp3",
          speed:
            mode === "word"
              ? 0.9
              : 0.97,
        }),
      }
    );

    if (!response.ok) {
      let details = "";

      try {
        const data = await response.json();
        details =
          data?.error?.message || "";
      } catch (_) {}

      console.error(
        "OpenAI Speech API error:",
        response.status,
        details
      );

      return res
        .status(response.status)
        .json({
          error:
            details ||
            "Natural voice is temporarily unavailable.",
        });
    }

    const arrayBuffer =
      await response.arrayBuffer();

    const audioBuffer =
      Buffer.from(arrayBuffer);

    res.setHeader(
      "Content-Type",
      "audio/mpeg"
    );

    res.setHeader(
      "Content-Length",
      audioBuffer.length
    );

    /*
      Short private cache helps repeated taps without making
      pronunciation data permanently stale.
    */
    res.setHeader(
      "Cache-Control",
      "private, max-age=3600"
    );

    return res
      .status(200)
      .send(audioBuffer);

  } catch (error) {
    console.error(
      "Speech server error:",
      error
    );

    return res.status(500).json({
      error:
        "Natural voice is temporarily unavailable.",
    });
  }
}
