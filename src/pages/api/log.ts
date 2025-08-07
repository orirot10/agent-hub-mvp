import type { NextApiRequest, NextApiResponse } from 'next'
import { logConversation, Message } from '@/lib/logConversation'
import dbConnect from '@/lib/mongodb'
// @ts-ignore - using CommonJS model
import ConversationLog from '../../../models/ConversationLog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { conversationId, messages, force } = req.body
    if (!conversationId || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid payload' })
    }
    logConversation(conversationId, messages as Message[], force)

    await dbConnect()
    await ConversationLog.updateOne(
      { conversationId },
      { $set: { timestamp: Date.now(), messages } },
      { upsert: true }
    )

    res.status(200).json({ ok: true })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
