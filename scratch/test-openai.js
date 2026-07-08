const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function test() {
  try {
    console.log("Using key:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 20) + "..." : "undefined");
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say hello' }],
    });
    console.log("Success:", completion.choices[0].message.content);
  } catch (err) {
    console.error("OpenAI failed error:", err);
  }
}
test();
