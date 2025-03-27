import connectMongo from "@/lib/mongoose";
import Dataa from "@/models/dataa";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case "DELETE":
      try {
        const { id } = req.query;
        if (!id || typeof id !== "string") {
          return res.status(400).json({ success: false, error: "Invalid ID" });
        }
        const deletedata = await Dataa.findByIdAndDelete(id);
        if (!deletedata) {
          return res
            .status(404)
            .json({ success: false, error: "User request not found" });
        }

        res.status(200).json({ success: true, data: deletedata });
      } catch (error) {
        console.error("Error deleting request:", error);
        res
          .status(500)
          .json({ success: false, error: "Failed to delete request" });
      }
      break;

    case "GET":
      try {
        const fetchData = await Dataa.find(
          {},
          {
            _id: 1,
            name: 1,
            lastname: 1,
            email: 1,
            birth: 1,
            birth_place: 1,
            category: 1,
            pdf: 1, // Include the pdf field here
          }
        );

        return res.status(200).json({ success: true, data: fetchData });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, error: "Failed to fetch data." });
      }

    default:
      return res
        .status(405)
        .json({ success: false, error: "Method not allowed." });
  }
}
