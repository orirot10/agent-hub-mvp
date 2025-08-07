import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
// @ts-ignore - using CommonJS model outside of src
import Conversation from '../../../models/Conversation'

type ConversationMap = Record<
  string,
  { timestamp: number; messages: { role: 'user'; content: string }[] }
>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    await dbConnect()

    const docs = await Conversation.find({}).lean()

    const conversations: ConversationMap = {}
    for (const doc of docs) {
      const id = doc._id.toString()
      conversations[id] = {
        timestamp: new Date(doc.createdAt).getTime(),
        messages: [{ role: 'user', content: doc.content }],
      }
    }

    res.status(200).json({ logs: [], conversations })
  } catch (err: any) {
    res
      .status(500)
      .json({ error: 'Failed to fetch conversations', details: err.message })
  }
}

