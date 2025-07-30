// src/pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { appendConversation } from '@/lib/conversationLogger'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { prompt, meta } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const result = completion.choices[0].message?.content || ''
    appendConversation({ timestamp: new Date().toISOString(), prompt, response: result, meta })
    res.status(200).json({ result })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
