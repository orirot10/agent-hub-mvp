import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from "@/components/Layout";
import type { AgentType } from "@/types/agent";

export default function EditAgentPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ id: '', name: '', purpose: '', prompt: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      fetch(`/api/agents/${id}`)
        .then(res => res.json())
        .then((agent: AgentType) => {
          setForm({
            id: agent.id,
            name: agent.name,
            purpose: agent.purpose,
            prompt: agent.prompt,
          });
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id !== 'string') return;
    await fetch(`/api/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/');
  };

  if (!loaded) return <Layout>Loading...</Layout>;
  if (!form.id) return <Layout>Agent not found.</Layout>;

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="id">ID</label>
          <input
            id="id"
            name="id"
            className="w-full border rounded p-2"
            value={form.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="w-full border rounded p-2"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="purpose">Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            className="w-full border rounded p-2"
            value={form.purpose}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="prompt">Markdown Content</label>
          <textarea
            id="prompt"
            name="prompt"
            className="w-full border rounded p-2 h-48"
            value={form.prompt}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}

