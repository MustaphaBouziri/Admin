// api/update-student-status.ts

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
        const { email, status } = req.body;

        if (!email || !status) {
          return res
            .status(400)
            .json({ success: false, error: "Email and status are required." });
        }

        // Find the student by email and update their status
        const updatedStudent = await Student.findOneAndUpdate(
          { email },
          { status },
          { new: true } // Return the updated document
        );

        if (!updatedStudent) {
          return res
            .status(404)
            .json({ success: false, error: "Student not found." });
        }

        res.status(200).json({ success: true, data: updatedStudent });
      } catch (error) {
        console.error("Error updating student status:", error);
        res
          .status(500)
          .json({ success: false, error: "Failed to update student status" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
