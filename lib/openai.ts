import OpenAI from 'openai'

// Pull the OpenAI API key from the environment variable or set it to a placeholder if process.env.CI is true
const apiKey = process.env.OPENAI_API_KEY
  ? process.env.OPENAI_API_KEY
  : process.env.CI
    ? '<test>'
    : (() => {
        throw new Error('Missing OPENAI_API_KEY')
      })()

export const openai = new OpenAI({apiKey})
