import { NextApiRequest, NextApiResponse } from 'next'

const OpenAI = require('openai-api')
const openai = new OpenAI(process.env.OPENAI_API_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  try {
    switch (method) {
      case 'POST':
        const { params, prompt } = body
        console.log(`Performing completion`)
        const response = await openai.complete(params)
        const { data } = response
        const { choices } = data

        console.log({ choices })
        if (choices) {
          res.status(200).json({
            data,
          })
        } else {
          res.status(500).json({
            message: 'Error crafting response, no choice was made by openai /completion endpoint.',
          })
        }
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    return res.status(error.response.status).json({ message: error.response.statusText })
  }
}
