
export async function callOpenAI(prompt: string, meta?: Record<string, any>): Promise<string> {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, meta })
  })
  const data = await response.json()
  return data.result
}
