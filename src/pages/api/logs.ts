import type { NextApiRequest, NextApiResponse } from 'next'
import { readLegacyConversations } from '@/lib/logConversation'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const logs = readLegacyConversations()
  res.status(200).json({ logs })
}
