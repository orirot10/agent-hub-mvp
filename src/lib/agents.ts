
import { AgentType } from "@/types/agent";

export const agents: AgentType[] = [
  {
    id: "aig_deal_evaluator",
    name: "AIG Deal Evaluator",
    purpose: "Assess strategic model and exit options",
    inputType: "text",
    prompt: `You are a venture analyst. Given the business summary below...`,
  },
];
