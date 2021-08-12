export const submitCompletion = async (artist: string) => {
  try {
    const prompt = `This is lyrics to new rap song by ${artist}. Most of the lines end with a word that rhymes with the last line.\n[Verse 1: ${artist}]\n`
    const response = await fetch('/api/openai/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        params: {
          engine: 'davinci',
          prompt,
          max_tokens: 200,
          temperature: 0.8,
          top_p: 1,
          presence_penalty: 0.8,
          frequency_penalty: 0.8,
          best_of: 1,
          n: 1,
          stream: false,
          stop: ['\n'],
        },
      }),
    })
    if (!response.ok) {
      console.log(response)
      console.log('Error occurred fetching /api/openai/completion')
    } else {
      const { data } = await response.json()
      console.log('Completion submitted:')
      console.log({ data })
    }
  } catch (error) {
    console.log(`Fetching from /api/openai/completion responded with an error`, error)
  }
}
