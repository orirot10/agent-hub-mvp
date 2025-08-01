// src/pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { prompt, messages } = req.body

    let chatMessages
    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = messages
    } else if (typeof prompt === 'string') {
      chatMessages = [{ role: 'user', content: prompt }]
    } else {
      return res.status(400).json({ error: 'No prompt or messages provided' })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: chatMessages,
      temperature: 0.7,
    })

    const result = completion.choices[0].message?.content || ''
    res.status(200).json({ result })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
