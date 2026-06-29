// ---------------------------------------------------------------------------
// Vercel serverless function — the ONLY place your Google Gemini API key lives.
// It runs on Vercel's servers, never in the browser, so the key is never
// exposed to visitors. The browser calls POST /api/generate; this function
// calls the Gemini API and returns plain JSON.
//
// Setup: in Vercel → Project → Settings → Environment Variables, add
//   GOOGLE_API_KEY = ...   (get one at https://aistudio.google.com/apikey)
// Locally: put the same line in a .env file (already git-ignored) and run
//   `vercel dev` instead of `npm run dev` to exercise this route.
//
// Model: gemini-2.0-flash (fast + low cost). To use a different model, change
// MODEL below (e.g. "gemini-2.5-flash" or "gemini-1.5-flash").
// ---------------------------------------------------------------------------
const MODEL = "gemini-2.0-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    // No key configured — tell the client so it falls back to templates.
    return res.status(503).json({ error: "AI not configured" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  try {
    if (body.kind === "post") {
      return res.status(200).json(await rewritePosts(apiKey, body));
    }
    if (body.kind === "followup") {
      return res.status(200).json(await rewriteFollowUp(apiKey, body));
    }
    return res.status(400).json({ error: "Unknown kind" });
  } catch (err) {
    // Surface a clean message; the client falls back to templates on any error.
    console.error("generate error:", err?.message || err);
    return res.status(500).json({ error: "Generation failed" });
  }
}

// Low-level Gemini call. Asks for JSON back and parses it.
async function callGemini(apiKey, { system, user, maxOutputTokens = 4000 }) {
  const resp = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9,
        maxOutputTokens,
      },
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Gemini ${resp.status}: ${detail.slice(0, 200)}`);
  }

  const data = await resp.json();
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || "")
    .join("");
  return JSON.parse(stripFences(text));
}

// Rewrite each template block in the chosen tone, keeping id + platform fixed.
async function rewritePosts(apiKey, { service = "website", tone = "professional", blocks = [] }) {
  const system =
    "You are a senior social-media copywriter for a freelance web-design business. " +
    "Rewrite each provided post so it is more original, specific and engaging, in the requested tone. " +
    "Keep every block's `id` and `platform` exactly as given. Preserve any hashtags, prices, phone numbers and email addresses that appear. " +
    "Match each platform's norms (captions punchy, LinkedIn professional, Fiverr gig persuasive). Never invent fake testimonials or guarantees. " +
    'Return ONLY valid JSON of the form {"blocks":[{"id":"...","platform":"...","text":"..."}]} with the same ids and platforms as the input.';

  const user =
    `Service: ${service}\nTone: ${tone}\n\n` +
    `Rewrite the text of each block below. Return the same blocks with improved text:\n\n` +
    JSON.stringify({ blocks }, null, 2);

  const result = await callGemini(apiKey, { system, user, maxOutputTokens: 8192 });
  if (!Array.isArray(result.blocks) || !result.blocks.length) {
    throw new Error("Bad shape from model");
  }
  return result;
}

async function rewriteFollowUp(apiKey, { name = "there", service = "website", type = "first", draft = "" }) {
  const system =
    "You write warm, concise WhatsApp follow-up messages for a freelance web designer. " +
    "Keep it personal, under 60 words, friendly but professional. Use the customer's name naturally. " +
    "No spammy language, no fake urgency, at most one emoji. " +
    'Return ONLY valid JSON of the form {"message":"..."}.';

  const user =
    `Customer name: ${name}\nService: ${service}\nFollow-up stage: ${type}\n\n` +
    `Here is a draft to improve (keep the same intent):\n${draft}`;

  const result = await callGemini(apiKey, { system, user, maxOutputTokens: 600 });
  if (typeof result.message !== "string") throw new Error("Bad shape from model");
  return result;
}

// Strip ```json ... ``` fences if the model wraps its JSON (belt-and-suspenders;
// responseMimeType: application/json normally returns raw JSON).
function stripFences(text) {
  return text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
}
