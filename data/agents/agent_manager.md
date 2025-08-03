# Agent Manager

**ID:** `agent_manager`

## 🎯 Purpose
Oversees and coordinates all agents, routes tasks, ensures quality, and delivers cohesive strategic outputs.

## 🧩 Core Functions
- To be customized per deployment.
- Integrates with other agents via Orchestrator or Agent Manager.
- Handles structured and unstructured queries in its domain.

## 📝 Input Type
Text / Context-specific data

## 📤 Output
Markdown summary, structured data, or action plan

## 🤝 Collaborates With
Other agents as needed based on task flow
other agents:

 {
    "id": "agent_manager",
    "name": "Agent Manager",
    "purpose": "Oversees and coordinates all agents, routes tasks, ensures quality, and delivers cohesive strategic outputs.",
    "inputType": "task or strategy query",
    "mdFile": "data/agents/agent_manager.md"
  },
  {
    "id": "project_manager",
    "name": "Project Manager",
    "purpose": "Manages timelines, milestones, and resource allocation across all agent tasks. Tracks progress and resolves workflow bottlenecks.",
    "inputType": "project plan or strategy directive",
    "mdFile": "data/agents/project_manager.md"
  },
  {
    "id": "creative_specialist",
    "name": "Creative Specialist",
    "purpose": "Enhances visual and brand expression, ensuring storytelling is compelling across design, UI, and content.",
    "inputType": "narrative, brand materials, or design goals",
    "mdFile": "data/agents/creative_specialist.md"
  },
  {
    "id": "ai_infuser",
    "name": "AI Infuser",
    "purpose": "Maps how AI can enhance or automate internal operations and business workflows.",
    "inputType": "business process or workflow description",
    "mdFile": "data/agents/ai_infuser.md"
  },
  {
    "id": "market_signal_miner",
    "name": "Market Signal Miner",
    "purpose": "Surfaces early market signals, unmet needs, and niche opportunities from weak demand signals.",
    "inputType": "raw market data or trend queries",
    "mdFile": "data/agents/market_signal_miner.md"
  },
  {
    "id": "spark_scanner",
    "name": "Spark Scanner",
    "purpose": "Identifies optimal go-to-market (GTM) entry points based on market trends and readiness.",
    "inputType": "product overview and market context",
    "mdFile": "data/agents/spark_scanner.md"
  },
  {
    "id": "geo_matcher",
    "name": "Geo-Matcher",
    "purpose": "Evaluates country-level viability for product launch or expansion.",
    "inputType": "target regions and business category",
    "mdFile": "data/agents/geo_matcher.md"
  },
  {
    "id": "behavioral_economist",
    "name": "Behavioral Economist",
    "purpose": "Models local user and founder psychology to forecast product adoption and behavioral dynamics.",
    "inputType": "user personas and cultural context",
    "mdFile": "data/agents/behavioral_economist.md"
  },
  {
    "id": "aig_deal_evaluator",
    "name": "AIG Deal Evaluator",
    "purpose": "Analyzes business models, strategic fit, and potential exit paths for deals and partnerships.",
    "inputType": "business plans or investment decks",
    "mdFile": "data/agents/aig_deal_evaluator.md"
  },
  {
    "id": "market_scope_analyst",
    "name": "Market Scope Analyst",
    "purpose": "Sizes the TAM, SAM, and SOM to assess market opportunity and growth potential.",
    "inputType": "market data and assumptions",
    "mdFile": "data/agents/market_scope_analyst.md"
  },
  {
    "id": "channel_choreographer",
    "name": "Channel Choreographer",
    "purpose": "Designs user acquisition and retention strategies across various channels.",
    "inputType": "user flows, product funnel data",
    "mdFile": "data/agents/channel_choreographer.md"
  },
  {
    "id": "risk_cartographer",
    "name": "Risk Cartographer",
    "purpose": "Maps political, operational, and reputational risks to guide decision-making.",
    "inputType": "market or region and operational model",
    "mdFile": "data/agents/risk_cartographer.md"
  },
  {
    "id": "venture_forensics",
    "name": "Venture Forensics",
    "purpose": "Builds internal financial models and validates operational assumptions for venture health.",
    "inputType": "financial inputs and assumptions",
    "mdFile": "data/agents/venture_forensics.md"
  },
  {
    "id": "capital_architect",
    "name": "Capital Architect",
    "purpose": "Designs capital stack and funding strategy aligned with growth and risk profile.",
    "inputType": "cap table, funding stage, and targets",
    "mdFile": "data/agents/capital_architect.md"
  },
  {
    "id": "exit_synthesizer",
    "name": "Exit Synthesizer",
    "purpose": "Outlines viable exit strategies, including timing, routes, and value inflection points.",
    "inputType": "growth stage, investor expectations, market trends",
    "mdFile": "data/agents/exit_synthesizer.md"
  },
  {
    "id": "narrative_shaper",
    "name": "Narrative Shaper",
    "purpose": "Crafts compelling strategic narratives for stakeholders, investors, and public-facing materials.",
    "inputType": "insight reports or pitch themes",
    "mdFile": "data/agents/narrative_shaper.md"
  },
  {
    "id": "integrator",
    "name": "Integrator",
    "purpose": "Synthesizes outputs from all agents into unified strategic recommendations and insights.",
    "inputType": "all agent outputs",
    "mdFile": "data/agents/integrator.md"
  }
---
