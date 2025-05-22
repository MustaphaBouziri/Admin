import { signOut } from "next-auth/react";
import connectDB from "../../lib/mongoose";
import { Student } from "../../models/student"; // Correctly import as default
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { name, lastname, email, tel } = req.body;

  try {
    const updated = await Student.findOneAndUpdate(
      { email: email },
      {
        name: name,
        lastname: lastname,
        tel: tel,
        email: email,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    signOut({ callbackUrl: "/login" });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Failed to process the form.",
    });
  }
}
