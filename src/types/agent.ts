
export type AgentType = {
  id: string;
  name: string;
  purpose: string;
  inputType: 'text';
  prompt: string;
};

export type ScoreType = {
  category: string;
  value: number;
  comment?: string;
};

export type PromptPayload = {
  input: string;
  agentId: string;
};
