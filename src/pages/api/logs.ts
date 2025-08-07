import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '@/lib/mongodb'
// @ts-ignore - using CommonJS model
import Conversation from '../../../models/Conversation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  try {
    await dbConnect()
    const docs = await Conversation.find().lean()
    const conversations = docs.reduce(
      (
        acc: Record<
          string,
          { timestamp: number; messages: { role: string; content: string }[] }
        >,
        doc: any
      ) => {
        acc[doc._id.toString()] = {
          timestamp: new Date(doc.createdAt).getTime(),
          messages: [
            {
              role: 'user',
              content: doc.content,
            },
          ],
        }
        return acc
      },
      {} as Record<
        string,
        { timestamp: number; messages: { role: string; content: string }[] }
      >
    )

    res.status(200).json({ logs: [], conversations })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
