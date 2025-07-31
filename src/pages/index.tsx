
import { useEffect, useRef, useState } from "react"
import Layout from "@/components/Layout"
import { agents } from "@/lib/agents"
import { chatCompletion } from "@/lib/openaiClient"
import type { ChatMessage } from "@/types/chat"
import AgentCard from "@/components/AgentCard"

export default function HomePage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = sessionStorage.getItem('chat')
    return saved ? JSON.parse(saved) : []
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sessionStorage.setItem('chat', JSON.stringify(messages))
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [messages])

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
          <div className="grid sm:grid-cols-2 gap-4">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
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
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 border rounded p-2"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message. Mention agents with @agentId"
              />
              <button className="bg-blue-600 text-white px-4 rounded" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
