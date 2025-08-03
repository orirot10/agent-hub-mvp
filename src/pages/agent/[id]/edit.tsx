import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import type { AgentType } from '@/types/agent'

export default function EditAgentPage() {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState({ id: '', name: '', purpose: '', prompt: '' })

  useEffect(() => {
    if (typeof id === 'string') {
      fetch(`/api/agents/${id}`)
        .then(res => res.json())
        .then((agent: AgentType) => {
          setForm({ id: agent.id, name: agent.name, purpose: agent.purpose, prompt: agent.prompt })
        })
        .catch(() => {})
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof id !== 'string') return
    await fetch(`/api/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/')
  }

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">ID</label>
          <input
            value={form.id}
            onChange={updateField('id')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={form.name}
            onChange={updateField('name')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purpose</label>
          <input
            value={form.purpose}
            onChange={updateField('purpose')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Markdown Text</label>
          <textarea
            value={form.prompt}
            onChange={updateField('prompt')}
            className="w-full p-2 border rounded h-60"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  )
}
