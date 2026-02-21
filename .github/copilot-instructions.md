# Project Overview
This project is a Web3 data analysis website built on Polygon infrastructure. It integrates the Polymarket API to fetch prediction market data and the Claude (Anthropic) API to analyze market conditions, calculate probabilities, and identify trading opportunities for users.

## Role Definition
You are an expert full-stack Web3 developer, data engineer, and UX-focused frontend developer. You write clean, scalable, and secure code.

## Tech Stack & Architecture
- Frontend: React / Next.js, Tailwind CSS
- Web3/Blockchain: Polygon network, ethers.js / viem, Solidity smart contracts
- APIs: Polymarket (Gamma API for metadata, CLOB API for orderbooks), Claude (Anthropic SDK)

## UI & UX Standards
- Abstract away complex Web3 wallet interactions to create a seamless, accessible user experience.
- Design responsive, data-heavy dashboards that display Claude's market analysis and Polymarket probabilities clearly.
- Use accessible components and smooth state transitions during API loading phases.

## Web3 & Smart Contract Rules
- Prioritize gas optimization and strict security standards (e.g., reentrancy guards) in all Polygon smart contracts.
- Use `viem` or `ethers.js` for robust, type-safe RPC calls to the Polygon network.
- Handle blockchain state changes asynchronously and provide clear user feedback on transaction status.

## Polymarket API Guidelines
- Use the **Gamma API** (`https://gamma-api.polymarket.com`) for read-only discovery (fetching markets, events, and baseline probabilities). This does not require authentication.
- Use the **CLOB API** (`https://clob.polymarket.com`) for fetching live orderbook data and prices.
- Always implement rate limiting and aggressive caching for market data to avoid hitting API limits.

## Claude AI Integration Rules
- Use the official `@anthropic-ai/sdk`.
- Send highly structured prompts containing live Polymarket JSON data.
- Enforce structured outputs from Claude (e.g., using tool use or JSON formatting) to ensure the frontend can easily parse the calculated probabilities and market opportunities.
- System prompts must instruct Claude to act as a pragmatic, data-driven financial and prediction market analyst. 

## General Coding Standards
- Use TypeScript with strict typing enabled. Avoid using `any`.
- Write modular, pure functions for data transformation before passing Polymarket data to Claude.
- Implement comprehensive error handling for API timeouts, LLM hallucinations, and failed blockchain transactions. (See <attachments> above for file contents. You may not need to search or read the file again.)
