const { Configuration, OpenAIApi } = require('openai')
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(config)

async function getMessageSuggestions(objective) {
  const prompt = `Suggest 3 short marketing messages for this objective: ${objective}`
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
    n: 1
  })
  return res.data.choices[0].text.trim().split('\n').filter(Boolean)
}

module.exports = { getMessageSuggestions } 