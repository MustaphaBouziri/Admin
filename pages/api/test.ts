import connectMongo from "@/lib/mongoose";
import Student from "@/models/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case "GET":
      try {
        const fetchData = await Student.find(
          { email: "z@gmail.com" },
          { pdf: 1 }
        );
        return res.status(200).json({ success: true, data: fetchData });
      } catch {
        return res
          .status(500)
          .json({ success: false, error: "Failed to fetch data" });
      }

    default:
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed." });
  }
}
