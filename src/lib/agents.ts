import fs from 'fs'
import path from 'path'
import type { AgentType } from '@/types/agent'

const agentsFile = path.join(process.cwd(), 'data', 'agents.json')

type AgentRecord = Omit<AgentType, 'prompt'> & { mdFile: string }

function readAgents(): AgentRecord[] {
  try {
    const data = fs.readFileSync(agentsFile, 'utf8')
    return JSON.parse(data) as AgentRecord[]
  } catch {
    return []
  }
}

function writeAgents(agents: AgentRecord[]) {
  fs.mkdirSync(path.dirname(agentsFile), { recursive: true })
  fs.writeFileSync(agentsFile, JSON.stringify(agents, null, 2))
}

function loadPrompt(agent: AgentRecord): AgentType {
  try {
    const filePath = path.join(process.cwd(), agent.mdFile)
    const prompt = fs.readFileSync(filePath, 'utf8')
    return { ...agent, prompt }
  } catch {
    return { ...agent, prompt: '' }
  }
}

export function getAgents(): AgentType[] {
  return readAgents().map(loadPrompt)
}

export function getAgent(id: string): AgentType | undefined {
  const agent = readAgents().find(a => a.id === id)
  return agent ? loadPrompt(agent) : undefined
}

export function addAgent(agent: AgentRecord & { prompt: string }) {
  const agents = readAgents()
  if (agents.some(a => a.id === agent.id)) {
    throw new Error('Agent already exists')
  }
  const { prompt, ...record } = agent
  const filePath = path.join(process.cwd(), record.mdFile)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, prompt, 'utf8')
  agents.push(record)
  writeAgents(agents)
}

export function updateAgent(id: string, data: Partial<AgentRecord> & { prompt?: string }): AgentType {
  const agents = readAgents()
  const idx = agents.findIndex(a => a.id === id)
  if (idx === -1) {
    throw new Error('Agent not found')
  }
  const newId = data.id && data.id !== id ? data.id : id
  if (newId !== id && agents.some(a => a.id === newId)) {
    throw new Error('Agent already exists')
  }
  const { prompt, ...rest } = data
  const updated: AgentRecord = { ...agents[idx], ...rest, id: newId }
  agents[idx] = updated
  writeAgents(agents)
  if (typeof prompt === 'string') {
    const filePath = path.join(process.cwd(), updated.mdFile)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, prompt, 'utf8')
  }
  return loadPrompt(updated)
}

export function deleteAgent(id: string) {
  const agents = readAgents().filter(a => a.id !== id)
  writeAgents(agents)
}

