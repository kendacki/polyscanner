import { Client } from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY || '';
const client = new Client({ apiKey });

export async function analyzeMarketWithClaude(marketJson: any) {
  // Build a concise, structured prompt that asks Claude to return strictly JSON matching our schema.
  const system = `You are a pragmatic, data-driven financial and prediction market analyst. Analyze the provided Polymarket JSON and answer strictly with JSON matching this schema:
{
  "market_summary": "A 1-2 sentence neutral summary of the market.",
  "calculated_probability": {
    "implied_by_market": "XX%",
    "ai_assessed_probability": "XX%"
  },
  "opportunity_score": "1-10",
  "actionable_insight": "A concise, 2-3 sentence explanation and recommended position (YES or NO).",
  "key_risk": "One sentence describing the biggest risk."
}

Be objective: base your output only on the JSON given and historical market precedents. Do not mention external news. Always output valid JSON and nothing else.`;

  const userPrompt = `Market JSON:\n${JSON.stringify(marketJson)}`;

  const response = await client.responses.create({
    model: 'claude-2.1',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 500,
  });

  // The SDK may populate text in different fields; coerce to string and parse JSON.
  const raw = (response.output?.[0]?.content?.[0]?.text) || response.outputText || '';

  try {
    const parsed = JSON.parse(raw);
    return { ok: true, result: parsed };
  } catch (err) {
    return { ok: false, error: 'failed to parse assistant output', raw };
  }
}
