import { OpenAIStream, StreamingTextResponse } from 'ai'
import axios from 'axios'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const res = await axios.post('http://127.0.0.1:8000/ask', {
      query: messages[0].content
    })

    if (res.status !== 200) {
      throw new Error(`Failed to fetch from API: ${res.statusText}`)
    }

    return new StreamingTextResponse(res.data.response)
  } catch (error) {
    console.error('Error handling request:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
