Karangan AI Langkah 4 — v17.0.1 TESTED RELEASE CANDIDATE

Frontend: v17.0.1
Backend: API v4.7.0

Offline Release Gate: PASS
- Frontend syntax PASS
- Backend syntax PASS
- 20/20 Langkah 4 tasks routed to a same-skill Stage 3 bank
- Connected Transfer root-cause hotfix present
- iPad/Safari critical Semak handlers retained
- Semantic AI route and OpenAI->Groq failover retained
- Hard semantic relationship gate retained
- 500-case deterministic regression matrix completed
- Teacher + Critic production gate retained
- Deterministic QA verifier aligned with the production action contract
- Root/API backend copies synchronized

Deploy only this paired set:
1) root app.js <- app.js
2) api/ai.js <- ai.js

A short live-device smoke test is still required because the private Vercel/Groq
environment and stochastic LLM output cannot be fully simulated offline.
