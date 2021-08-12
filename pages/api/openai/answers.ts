import { NextApiRequest, NextApiResponse } from 'next'

const OpenAI = require('openai-api')
const openai = new OpenAI(process.env.OPENAI_API_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  try {
    switch (method) {
      case 'POST':
        const { params } = body
        console.log(`Performing answer`)
        const response = await openai.answers(params)
        const { data } = response
        res.status(200).json({
          data,
        })
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    const errorData = error.response.data.error
    return res.status(error.response.status).json({ message: error.response.statusText, errorData })
  }
}
