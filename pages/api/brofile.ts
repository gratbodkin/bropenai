import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const broNames = ["Chad Thunderlift", "Crypto Kyle", "Max Gains"];
  const quotes = [
    "No pump, no purpose.",
    "Wake up. Lift. Repeat.",
    "Hustle, hydrate, dominate.",
  ];
  const grinds = ["Gym Bro", "Crypto Bro", "Hustle Bro"];

  const brofile = {
    name: broNames[Math.floor(Math.random() * broNames.length)],
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    grind: grinds[Math.floor(Math.random() * grinds.length)],
  };

  return res.status(200).json(brofile);
}
