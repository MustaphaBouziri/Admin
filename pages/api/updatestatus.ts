import connectMongo from "../../lib/mongoose";
import { Student } from "../../models/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  if (req.method === "POST") {
    try {
      const { email, status } = req.body;

      if (!email || !status) {
        return res
          .status(400)
          .json({ success: false, error: "Email and status are required." });
      }

      const updatedUser = await Student.findOneAndUpdate(
        { email },
        { status },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, error: "User not found." });
      }

      return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      console.error("Error updating status:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update status." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
