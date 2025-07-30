import { useEffect, useState } from 'react'

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([])



  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())

      .then(data => {
        const entries = Array.isArray(data.logs) ? data.logs : []
        setLogs(entries)
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
    </div>
  )
}
