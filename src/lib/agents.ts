import fs from 'fs'
import path from 'path'
import type { AgentType } from '@/types/agent'

const agentsFile = path.join(process.cwd(), 'data', 'agents.json')

function readAgents(): AgentType[] {
  try {
    const data = fs.readFileSync(agentsFile, 'utf8')
    return JSON.parse(data) as AgentType[]
  } catch {
    return []
  }
}

function writeAgents(agents: AgentType[]) {
  fs.mkdirSync(path.dirname(agentsFile), { recursive: true })
  fs.writeFileSync(agentsFile, JSON.stringify(agents, null, 2))
}

export function getAgents() {
  return readAgents()
}

export function getAgent(id: string) {
  return readAgents().find(a => a.id === id)
}

export function addAgent(agent: AgentType) {
  const agents = readAgents()
  if (agents.some(a => a.id === agent.id)) {
    throw new Error('Agent already exists')
  }
  agents.push(agent)
  writeAgents(agents)
}

export function updateAgent(id: string, data: Partial<AgentType>) {
  const agents = readAgents()
  const idx = agents.findIndex(a => a.id === id)
  if (idx === -1) {
    throw new Error('Agent not found')
  }
  agents[idx] = { ...agents[idx], ...data }
  writeAgents(agents)
}

export function deleteAgent(id: string) {
  const agents = readAgents().filter(a => a.id !== id)
  writeAgents(agents)
}

