import connectMongo from "@/lib/mongoose";
import Student from "@/models/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case "POST":
      try {
        const { name, lastname, tel, email, pdf } = req.body;

        if (!name || !lastname || !tel || !email) {
          return res
            .status(400)
            .json({ success: false, error: "All fields are required." });
        }

        const newstudent = await Student.create({
          name,
          lastname,
          tel,
          email,
          pdf,
        });
        return res.status(201).json({ success: true, data: newstudent });
      } catch {
        return res.status(500).json({ success: false, error: "gh" });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
