import type { NextApiRequest, NextApiResponse } from 'next'
import { getAgents, addAgent } from '@/lib/agents'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(getAgents())
  }

  if (req.method === 'POST') {
    try {
      addAgent(req.body)
      return res.status(201).json({ ok: true })
    } catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }

  res.status(405).end()
}

