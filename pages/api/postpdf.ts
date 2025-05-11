import connectMongo from "@/lib/mongoose";
import { Student } from "@/models/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case "PUT":
      console.log("Inside PUT case"); // Debugging
      try {
        const { pdf } = req.body;
        const { email } = req.query;

        console.log("Received ID:", email);
        console.log("Received PDF:", pdf);

        if (!pdf || !email) {
          return res
            .status(400)
            .json({ success: false, error: "Missing data" });
        }

        const updatedStudent = await Student.updateOne(
          { email: email },
          { $set: { pdf } }
        );

        console.log("Update Result:", updatedStudent);

        if (!updatedStudent.matchedCount) {
          return res
            .status(404)
            .json({ success: false, error: "Student not found" });
        }

        return res.status(200).json({ success: true, data: updatedStudent });
      } catch (error) {
        console.error("Error updating student PDF:", error);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

    default:
      console.log("Method Not Allowed:", req.method); // Debugging
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
  }
}
