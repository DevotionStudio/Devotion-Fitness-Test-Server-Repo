// Prompt prototyping harness — runs both prompts against 5 personas.
//
// Usage:
//   1. Add your Anthropic API key to .env.local (ANTHROPIC_API_KEY=sk-ant-...)
//   2. npm run prompts
//
// If no API key is present, the script prints the rendered prompts for inspection
// and exits without making API calls.

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { PERSONAS, type Persona } from "../src/lib/personas";
import {
  PLAN_SYSTEM,
  FEEDBACK_SYSTEM,
  planUserMessage,
  feedbackUserMessage,
} from "../src/lib/prompts";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "prompt-runs");

const MODEL = "claude-opus-4-7";

type Result = {
  persona: string;
  label: string;
  kind: "plan" | "feedback";
  durationMs: number;
  usage: Anthropic.Messages.Usage;
  output: string;
};

async function runOne(
  client: Anthropic,
  persona: Persona,
  kind: "plan" | "feedback",
  system: string,
  userMsg: string,
): Promise<Result> {
  const start = Date.now();
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: userMsg }],
  });

  let text = "";
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      text += event.delta.text;
    }
  }
  const final = await stream.finalMessage();
  const ms = Date.now() - start;

  return {
    persona: persona.id,
    label: persona.label,
    kind,
    durationMs: ms,
    usage: final.usage,
    output: text,
  };
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log("No ANTHROPIC_API_KEY found — printing rendered prompts only.\n");
    for (const p of PERSONAS) {
      console.log(`\n========== ${p.label} ==========`);
      console.log("\n--- PLAN PROMPT ---");
      console.log(`SYSTEM:\n${PLAN_SYSTEM}\n\nUSER:\n${planUserMessage(p)}`);
      console.log("\n--- FEEDBACK PROMPT ---");
      console.log(`SYSTEM:\n${FEEDBACK_SYSTEM}\n\nUSER:\n${feedbackUserMessage(p)}`);
    }
    return;
  }

  const client = new Anthropic({ apiKey });
  const results: Result[] = [];

  for (const persona of PERSONAS) {
    console.log(`\n→ ${persona.label}`);

    process.stdout.write("  plan…");
    const plan = await runOne(client, persona, "plan", PLAN_SYSTEM, planUserMessage(persona));
    console.log(
      ` ${plan.durationMs}ms · in=${plan.usage.input_tokens} out=${plan.usage.output_tokens} cache_read=${plan.usage.cache_read_input_tokens ?? 0}`,
    );
    results.push(plan);

    process.stdout.write("  feedback…");
    const feedback = await runOne(
      client,
      persona,
      "feedback",
      FEEDBACK_SYSTEM,
      feedbackUserMessage(persona),
    );
    console.log(
      ` ${feedback.durationMs}ms · in=${feedback.usage.input_tokens} out=${feedback.usage.output_tokens} cache_read=${feedback.usage.cache_read_input_tokens ?? 0}`,
    );
    results.push(feedback);
  }

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = resolve(outDir, `run-${ts}.json`);
  writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  const mdPath = resolve(outDir, `run-${ts}.md`);
  const md = results
    .map(
      (r) =>
        `## ${r.label} — ${r.kind}\n\n_${r.durationMs}ms · in=${r.usage.input_tokens} out=${r.usage.output_tokens} cache_read=${r.usage.cache_read_input_tokens ?? 0}_\n\n\`\`\`\n${r.output}\n\`\`\`\n`,
    )
    .join("\n");
  writeFileSync(mdPath, md);

  console.log(`\nWrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
