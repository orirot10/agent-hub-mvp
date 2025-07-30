import fs from 'fs'
import path from 'path'

export type ConversationEntry = {
  timestamp: string
  prompt: string
  response: string
  meta?: any
}

const logPath = path.join(process.cwd(), 'data', 'conversations.json')

export function appendConversation(entry: ConversationEntry) {
  let logs: ConversationEntry[] = []
  if (fs.existsSync(logPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'))
      if (!Array.isArray(logs)) logs = []
    } catch {
      logs = []
    }
  }
  logs.push(entry)
  fs.mkdirSync(path.dirname(logPath), { recursive: true })
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2))
}

export function readConversations(): ConversationEntry[] {
  if (!fs.existsSync(logPath)) return []
  try {
    const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'))
    return Array.isArray(logs) ? logs : []
  } catch {
    return []
  }
}
