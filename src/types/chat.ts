export type ChatMessage = {
  role: "user" | "agent"
  agentId: string
  content: string
  timestamp: number
}
