
export async function callOpenAI(prompt: string): Promise<string> {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })
  const data = await response.json()
  return data.result
}

export async function chatCompletion(
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  })
  const data = await response.json()
  return data.result
}
