import type { NextApiRequest, NextApiResponse } from 'next'
import { readConversations } from '@/lib/conversationLogger'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const logs = readConversations()
  res.status(200).json({ logs })
}
