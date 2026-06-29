// ---------------------------------------------------------------------------
// Vercel serverless function — the ONLY place your Anthropic API key lives.
// It runs on Vercel's servers, never in the browser, so the key is never
// exposed to visitors. The browser calls POST /api/generate; this function
// calls Claude and returns plain JSON.
//
// Setup: in Vercel → Project → Settings → Environment Variables, add
//   ANTHROPIC_API_KEY = sk-ant-...   (get one at https://console.anthropic.com)
// Locally: put the same line in a .env file (already git-ignored) and run
//   `vercel dev` instead of `npm run dev` to exercise this route.
//
// Cost note: this uses Claude Opus 4.8 (the most capable model). To spend less
// per generation, change MODEL below to "claude-haiku-4-5" (~5x cheaper).
// ---------------------------------------------------------------------------
import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-opus-4-8";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — tell the client so it falls back to templates.
    return res.status(503).json({ error: "AI not configured" });
  }

  // Vercel parses JSON bodies automatically, but guard for raw strings too.
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const client = new Anthropic({ apiKey });

  try {
    if (body.kind === "post") {
      const result = await rewritePosts(client, body);
      return res.status(200).json(result);
    }
    if (body.kind === "followup") {
      const result = await rewriteFollowUp(client, body);
      return res.status(200).json(result);
    }
    return res.status(400).json({ error: "Unknown kind" });
  } catch (err) {
    // Surface a clean message; the client falls back to templates on any error.
    console.error("generate error:", err?.message || err);
    const status = err?.status === 429 ? 429 : 500;
    return res.status(status).json({ error: "Generation failed" });
  }
}

// Rewrite each template block in the chosen tone, keeping id + platform fixed.
async function rewritePosts(client, { service = "website", tone = "professional", blocks = [] }) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["blocks"],
    properties: {
      blocks: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "platform", "text"],
          properties: {
            id: { type: "string" },
            platform: { type: "string" },
            text: { type: "string" },
          },
        },
      },
    },
  };

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    system:
      "You are a senior social-media copywriter for a freelance web-design business. " +
      "Rewrite each provided post so it is more original, specific and engaging, in the requested tone. " +
      "Keep every block's `id` and `platform` exactly as given. Preserve any hashtags, prices, phone numbers and email addresses that appear. " +
      "Match each platform's norms (captions punchy, LinkedIn professional, Fiverr gig persuasive). Never invent fake testimonials or guarantees.",
    messages: [
      {
        role: "user",
        content:
          `Service: ${service}\nTone: ${tone}\n\n` +
          `Rewrite the text of each block below. Return the same blocks with improved text:\n\n` +
          JSON.stringify({ blocks }, null, 2),
      },
    ],
    output_config: { format: { type: "json_schema", schema } },
  });

  return extractJson(message);
}

async function rewriteFollowUp(client, { name = "there", service = "website", type = "first", draft = "" }) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["message"],
    properties: { message: { type: "string" } },
  };

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    system:
      "You write warm, concise WhatsApp follow-up messages for a freelance web designer. " +
      "Keep it personal, under 60 words, friendly but professional. Use the customer's name naturally. " +
      "No spammy language, no fake urgency, at most one emoji.",
    messages: [
      {
        role: "user",
        content:
          `Customer name: ${name}\nService: ${service}\nFollow-up stage: ${type}\n\n` +
          `Here is a draft to improve (keep the same intent):\n${draft}`,
      },
    ],
    output_config: { format: { type: "json_schema", schema } },
  });

  return extractJson(message);
}

// Pull the JSON text block out of the response and parse it.
function extractJson(message) {
  const textBlock = message.content.find((b) => b.type === "text");
  return JSON.parse(textBlock.text);
}
