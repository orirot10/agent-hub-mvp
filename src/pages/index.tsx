
import { useEffect, useRef, useState } from "react"
import Layout from "@/components/Layout"
import { chatCompletion } from "@/lib/openaiClient"
import type { ChatMessage } from "@/types/chat"
import type { AgentType } from "@/types/agent"
import AgentCard from "@/components/AgentCard"

export default function HomePage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = sessionStorage.getItem('chat')
    return saved ? JSON.parse(saved) : []
  })
  const [agents, setAgents] = useState<AgentType[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sessionStorage.setItem('chat', JSON.stringify(messages))
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(setAgents)
      .catch(() => setAgents([]))
  }, [])

  const extractMentions = (text: string) => {
    const ids = Array.from(new Set(text.match(/@([\w-]+)/g)?.map(m => m.slice(1)) || []))
    return agents.filter(a => ids.includes(a.id))
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = {
      role: 'user',
      agentId: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMsg])
    const targets = extractMentions(input)
    setInput('')

    for (const agent of targets) {
      const history = [...messages, userMsg].map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      }))
      const system = { role: 'system', content: agent.prompt }
      const result = await chatCompletion([system, ...history])
      const agentMsg: ChatMessage = {
        role: 'agent',
        agentId: agent.id,
        content: result,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, agentMsg])
    }
  }

  const addAgent = async () => {
    const id = prompt('Agent ID?')?.trim()
    if (!id) return
    const name = prompt('Name?', id) || id
    const purpose = prompt('Purpose?') || ''
    const mdFile = prompt('Markdown file path?', `data/agents/${id}.md`)?.trim()
    if (!mdFile) return
    const newAgent = { id, name, purpose, inputType: 'text', mdFile }

    await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAgent),
    })
    const created = await fetch(`/api/agents/${id}`).then(res => res.json())
    setAgents(prev => [...prev, created])

  }

  const editAgent = async (agent: AgentType) => {
    const name = prompt('Name?', agent.name)
    if (!name) return
    const purpose = prompt('Purpose?', agent.purpose) || ''
    const mdFile = prompt('Markdown file path?', agent.mdFile || '')?.trim()
    await fetch(`/api/agents/${agent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, purpose, mdFile }),
    })
    const updated = await fetch(`/api/agents/${agent.id}`).then(res => res.json())

    setAgents(prev => prev.map(a => (a.id === agent.id ? updated : a)))
  }

  const deleteAgent = async (id: string) => {
    if (!confirm('Delete agent?')) return
    await fetch(`/api/agents/${id}`, { method: 'DELETE' })
    setAgents(prev => prev.filter(a => a.id !== id))
  }

  const saveConversation = async () => {
    if (messages.length === 0) return
    const conversationId = crypto.randomUUID()
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, messages }),
      })
    } catch {
      // ignore
    }
  }

  const deleteConversation = () => {
    setMessages([])
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chat')
    }
  }

  const nameFor = (id: string) => (id === 'user' ? 'You' : agents.find(a => a.id === id)?.name || id)

  const renderContent = (text: string) =>
    text.split(/(@[\w-]+)/g).map((part, i) =>
      part.startsWith('@') ? (
        <span key={i}>
          @<span className="text-blue-600">{part.slice(1)}</span>
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    )

  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addAgent}
          >
            Add Agent
          </button>
          <div className="grid sm:grid-cols-2 gap-4">
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onEdit={editAgent}
                onDelete={deleteAgent}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="flex flex-col h-[70vh] border rounded p-4">
            <div className="flex-1 overflow-y-auto space-y-2" ref={containerRef}>
              {messages.map((m, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  <span className="font-bold mr-1">{nameFor(m.agentId)}:</span>
                  {renderContent(m.content)}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2 items-end">
              <textarea
                className="flex-1 border rounded p-2 resize-none overflow-hidden"
                value={input}
                rows={1}
                onChange={e => setInput(e.target.value)}
                onInput={e => {
                  e.currentTarget.style.height = 'auto'
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void sendMessage()
                  }
                }}
                placeholder="Type a message. Mention agents with @agentId"
              />
              <button className="bg-blue-600 text-white px-4 rounded h-full" onClick={sendMessage}>
                Send
              </button>
              <button className="bg-green-600 text-white px-4 rounded h-full" onClick={saveConversation}>
                Save
              </button>
              <button className="bg-red-600 text-white px-4 rounded h-full" onClick={deleteConversation}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
