import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    const { prompt, messages } = req.body
    console.log('OpenAI API request:', { prompt: !!prompt, messagesCount: messages?.length })

    let chatMessages
    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = messages
    } else if (typeof prompt === 'string') {
      chatMessages = [{ role: 'user', content: prompt }]
    } else {
      return res.status(400).json({ error: 'No prompt or messages provided' })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const result = completion.choices[0].message?.content || ''
    console.log('OpenAI API response received, length:', result.length)
    res.status(200).json({ result })
  } catch (error: any) {
    console.error('OpenAI API error:', error.message, error.code)
    res.status(500).json({ error: error.message });
  }
}
