import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export type Message = {
  role: 'user' | 'agent'
  agentId: string
  content: string
  timestamp: number
}

export type ConversationEntry = {
  timestamp: string
  prompt: string
  response: string
  meta?: any
}

const conversationsDir = path.join(process.cwd(), 'public', 'conversations')
const legacyLogPath = path.join(process.cwd(), 'data', 'conversations.json')

function ensureDir() {
  fs.mkdirSync(conversationsDir, { recursive: true })
}

export function createConversationId(): string {
  return uuidv4()
}

export function logConversation(
  conversationId: string,
  messages: Message[],
  force = false
) {
  ensureDir()
  const filePath = path.join(conversationsDir, `${conversationId}.json`)
  if (!force && fs.existsSync(filePath)) {
    throw new Error('Conversation already exists')
  }
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2))
}

export function readConversation(conversationId: string): Message[] | null {
  const filePath = path.join(conversationsDir, `${conversationId}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function readConversations(): Record<string, Message[]> {
  ensureDir()
  const result: Record<string, Message[]> = {}
  for (const file of fs.readdirSync(conversationsDir)) {
    if (!file.endsWith('.json')) continue
    const id = path.basename(file, '.json')
    try {
      const data = fs.readFileSync(path.join(conversationsDir, file), 'utf8')
      result[id] = JSON.parse(data)
    } catch {
      result[id] = []
    }
  }
  return result
}

export function appendConversation(entry: ConversationEntry) {
  let logs: ConversationEntry[] = []
  if (fs.existsSync(legacyLogPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(legacyLogPath, 'utf8'))
      if (!Array.isArray(logs)) logs = []
    } catch {
      logs = []
    }
  }
  logs.push(entry)
  fs.mkdirSync(path.dirname(legacyLogPath), { recursive: true })
  fs.writeFileSync(legacyLogPath, JSON.stringify(logs, null, 2))
}

