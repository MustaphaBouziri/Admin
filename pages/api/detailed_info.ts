import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../lib/mongoose";
import Dataa from "@/models/dataa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        const product = await Dataa.find(
          { _id: id },
          {
            name: 1,
            lastname: 1,
            email: 1,
            birth: 1,
            birth_place: 1,
            category: 1,
            pdf: 1,
          }
        );

        if (product.length > 0) {
          res.status(200).json({ success: true, data: product[0] });
        } else {
          res.status(404).json({ success: false, error: "Product not found" });
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        res
          .status(500)
          .json({ success: false, error: "Failed to fetch student" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
