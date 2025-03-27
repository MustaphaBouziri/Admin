import connectMongo from "@/lib/mongoose";
import Dataa from "@/models/dataa";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { value } = req.query;

    if (!value) {
      return res
        .status(400)
        .json({ success: false, error: "Search query is required" });
    }

    // Search by name, lastname, or email (case-insensitive)
    const fetchData = await Dataa.find(
      {
        $or: [
          { name: { $regex: value, $options: "i" } },
          { lastname: { $regex: value, $options: "i" } },
          { email: { $regex: value, $options: "i" } },
        ],
      },
      {
        _id: 1,
        name: 1,
        lastname: 1,
        email: 1,
        birth: 1,
        birth_place: 1,
        category: 1,
      }
    );

    res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, error: "Failed to fetch data" });
  }
}
