import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are ChadGPT, an AI that gives hyper-bro, gym-rat, grindset responses." },
        { role: "user", content: message },
      ],
    });

    res.status(200).json({ response: completion.choices[0]?.message?.content || "Bro, I ain't got nothing for you." });
  } catch (error) {
    console.error("ChadGPT Error:", error);
    res.status(500).json({ error: "Failed to generate Chad wisdom" });
  }
}
