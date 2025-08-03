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

export function addAgent(agent: AgentRecord) {

  const agents = readAgents()
  if (agents.some(a => a.id === agent.id)) {
    throw new Error('Agent already exists')
  }
  agents.push(agent)
  writeAgents(agents)
}

export function updateAgent(id: string, data: Partial<AgentRecord> & { prompt?: string }) {

  const agents = readAgents()
  const idx = agents.findIndex(a => a.id === id)
  if (idx === -1) {
    throw new Error('Agent not found')
  }

  const { prompt, ...rest } = data

  if (rest.id && rest.id !== id && agents.some(a => a.id === rest.id)) {
    throw new Error('Agent already exists')
  }

  agents[idx] = { ...agents[idx], ...rest }
  writeAgents(agents)

  if (prompt !== undefined) {
    const filePath = path.join(process.cwd(), agents[idx].mdFile)
    fs.writeFileSync(filePath, prompt)
  }
}

export function deleteAgent(id: string) {
  const agents = readAgents().filter(a => a.id !== id)
  writeAgents(agents)
}

