import connectMongo from "@/lib/mongoose";
import { Student } from "../../models/student";
import Dataa from "@/models/dataa";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  if (req.method === "POST") {
    try {
      const { name, lastname, email, birth, birth_place, category, pdf } =
        req.body;

      // Check if student with the same email, name, and lastname exists in the Student collection
      const existingStudent = await Student.findOne({ name, lastname, email });

      if (!existingStudent) {
        return res
          .status(400)
          .json({ success: false, error: "No matching student found." });
      }

      // If student exists, save the data to the Dataa collection
      const newDatta = await Dataa.create({
        name,
        lastname,
        email,
        birth,
        birth_place,
        category,
        pdf, // Save the PDF data (base64 string)
      });

      return res.status(201).json({ success: true, data: newDatta });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to process the form." });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed." });
  }
}
