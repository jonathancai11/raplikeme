import { NextApiRequest, NextApiResponse } from 'next'
const axios = require('axios')

const sendRequest = (url, method, opts = {}) => {
  let camelToUnderscore = (key) => {
    let result = key.replace(/([A-Z])/g, ' $1')
    return result.split(' ').join('_').toLowerCase()
  }
  const data = {}
  for (const key in opts) {
    data[camelToUnderscore(key)] = opts[key]
  }
  return axios({
    url,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    method,
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  try {
    switch (method) {
      case 'POST':
        const { params } = body
        console.log(`Performing completion`)
        const url = 'https://api.openai.com/v1/engines/curie/completions'
        const response = await sendRequest(url, 'post', params)
        const { data } = response
        const { choices } = data
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
    console.log(error.response.data)
    return res.status(error.response.status).json({ message: error.response.statusText })
  }
}
