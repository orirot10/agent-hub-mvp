import type { NextApiRequest, NextApiResponse } from 'next'
import { getAgent, updateAgent, deleteAgent } from '@/lib/agents'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (typeof id !== 'string') return res.status(400).end()

  if (req.method === 'GET') {
    const agent = getAgent(id)
    return agent ? res.status(200).json(agent) : res.status(404).end()
  }

  if (req.method === 'PUT') {
    try {
      updateAgent(id, req.body)
      return res.status(200).json({ ok: true })
    } catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }

  if (req.method === 'DELETE') {
    deleteAgent(id)
    return res.status(200).json({ ok: true })
  }

  res.status(405).end()
}

