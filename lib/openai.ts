export const submitCompletion = async (prompt: string) => {
  try {
    const params = {
      prompt,
      max_tokens: 200,
      temperature: 0.8,
      presence_penalty: 0.8,
      frequency_penalty: 0.8,
    }
    const response = await fetch('/api/openai/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        params,
      }),
    })
    if (!response.ok) {
      console.log(await response.json())
      console.log('Error occurred fetching /api/openai/completion')
    } else {
      const { data } = await response.json()
      return data.choices[0]
    }
  } catch (error) {
    console.log(`Fetching from /api/openai/completion responded with an error`, error)
  }
}
