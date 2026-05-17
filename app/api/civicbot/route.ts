import Anthropic from "@anthropic-ai/sdk";
import { LEADERS, VOTER_RIGHTS } from "@/lib/data";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt() {
  const leadersText = LEADERS.map((l) =>
    `### ${l.name} – ${l.party} (${l.position}, ${l.constituency})
${l.manifesto
  .map(
    (m) =>
      `- **${m.category}:** ${m.promise}\n  ${m.detail}\n  Keywords: ${m.keywords.join(", ")}`
  )
  .join("\n")}`
  ).join("\n\n");

  const voterText = VOTER_RIGHTS.map((v) =>
    `### ${v.question}\nKeywords: ${v.keywords.join(", ")}\n${v.answer}`
  ).join("\n\n---\n\n");

  return `You are CivicBot, the civic education assistant for Chirp — India's non-partisan civic engagement platform.

You help Indian citizens with:
1. Voter registration and rights
2. Party manifestos and leader promises
3. Policy search — "which leader promised X?"

Answer clearly and concisely, as if speaking to a first-time voter. Use markdown (bold, bullets) for readability. Be non-partisan — represent all parties fairly. Only cite policies from the data below — do not invent promises.

---

## LEADER MANIFESTOS

${leadersText}

---

## VOTER RIGHTS & ELECTORAL INFORMATION

${voterText}

---

If the question is outside this civic/electoral domain, politely say so and suggest relevant topics you can help with. Keep answers under 350 words unless a detailed breakdown is genuinely needed.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== "string") {
    return new Response("Bad request", { status: 400 });
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: "claude-opus-4-7",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: query }],
        });

        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `Sorry, I'm having trouble connecting right now. (${msg})`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
