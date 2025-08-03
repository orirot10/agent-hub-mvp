import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function LogsPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])
  const [conversations, setConversations] = useState<Record<string, { timestamp: number; messages: any[] }>>({})

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(data => {
        const entries = Array.isArray(data.logs) ? data.logs : []
        setLogs(entries)
        setConversations(data.conversations || {})
      })
      .catch(() => {})
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Conversation Logs</h1>
      <ul className="space-y-2">
        {logs.map((log: any, idx: number) => (
          <li key={idx} className="p-2 border rounded">
            <div className="text-xs text-gray-500">{log.timestamp}</div>
            <div className="font-semibold whitespace-pre-wrap">Prompt: {log.prompt}</div>
            <div className="whitespace-pre-wrap">Response: {log.response}</div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-4">Saved Conversations</h2>
      <ul className="space-y-4">
        {Object.entries(conversations).map(([id, convo]) => (
          <li key={id} className="p-2 border rounded space-y-2">
            <div className="flex justify-between items-center gap-2">
              <div className="font-semibold">Conversation {id}</div>
              <div className="text-sm text-gray-500">
                {new Date(convo.timestamp).toLocaleString()}
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => router.push(`/?conversationId=${id}`)}
              >
                Continue
              </button>
            </div>
            {convo.messages.map((msg: any, mIdx: number) => (
              <div key={mIdx} className="whitespace-pre-wrap">
                <span className="font-medium">{msg.role}:</span> {msg.content}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
