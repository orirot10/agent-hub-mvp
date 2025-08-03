import type { NextApiRequest, NextApiResponse } from 'next'
import { readConversation } from '@/lib/logConversation'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' })
  }
  const convo = readConversation(id)
  if (!convo) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.status(200).json({ id, ...convo })
}
