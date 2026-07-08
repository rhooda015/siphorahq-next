const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Using Gemini Key:", apiKey ? apiKey.substring(0, 10) + "..." : "undefined");
  
  const model = 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello, respond in 5 words.' }] }],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Success:", data.candidates?.[0]?.content?.parts?.[0]?.text);
    } else {
      console.error("Gemini API Error:", data);
    }
  } catch (err) {
    console.error("Network / Connection error:", err);
  }
}
test();
