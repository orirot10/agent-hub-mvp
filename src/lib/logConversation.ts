import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import dbConnect from './mongodb'
// @ts-ignore - using CommonJS model
import Conversation from '../../models/Conversation'

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

export type StoredConversation = {
  timestamp: number
  messages: Message[]
}

export async function logConversation(
  conversationId: string,
  messages: Message[],
  _force = false
) {
  try {
    await dbConnect()
    
    // Save to MongoDB
    const lastMessage = messages[messages.length - 1]
    if (lastMessage) {
      await Conversation.create({
        userId: conversationId,
        type: 'log',
        title: `Conversation ${conversationId.slice(0, 8)}`,
        content: JSON.stringify(messages)
      })
    }
    
    // Also save to local file as backup
    ensureDir()
    const filePath = path.join(conversationsDir, `${conversationId}.json`)
    let existing: Message[] = []
    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath, 'utf8')
        const parsed = JSON.parse(data)
        existing = Array.isArray(parsed) ? parsed : parsed.messages || []
      } catch {
        existing = []
      }
    }
    const startIndex = existing.length
    const merged = [...existing, ...messages.slice(startIndex)]
    const payload: StoredConversation = {
      timestamp: Date.now(),
      messages: merged,
    }
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2))
  } catch (error) {
    console.error('Error saving conversation:', error)
    // Fallback to file system only
    ensureDir()
    const filePath = path.join(conversationsDir, `${conversationId}.json`)
    const payload: StoredConversation = {
      timestamp: Date.now(),
      messages,
    }
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2))
  }
}

export function readConversation(
  conversationId: string
): StoredConversation | null {
  const filePath = path.join(conversationsDir, `${conversationId}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) {
      return { timestamp: 0, messages: parsed }
    }
    return parsed
  } catch {
    return null
  }
}

export function readConversations(): Record<string, StoredConversation> {
  ensureDir()
  const entries: [string, StoredConversation][] = []
  for (const file of fs.readdirSync(conversationsDir)) {
    if (!file.endsWith('.json')) continue
    const id = path.basename(file, '.json')
    try {
      const data = fs.readFileSync(path.join(conversationsDir, file), 'utf8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) {
        entries.push([id, { timestamp: 0, messages: parsed }])
      } else {
        entries.push([id, parsed])
      }
    } catch {
      entries.push([id, { timestamp: 0, messages: [] }])
    }
  }
  entries.sort((a, b) => b[1].timestamp - a[1].timestamp)
  return Object.fromEntries(entries)
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


export function readLegacyConversations(): ConversationEntry[] {
  if (!fs.existsSync(legacyLogPath)) return []
  try {
    const data = fs.readFileSync(legacyLogPath, 'utf8')
    const logs = JSON.parse(data)
    return Array.isArray(logs) ? logs : []
  } catch {
    return []
  }
}


