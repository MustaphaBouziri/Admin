import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  lastname: string;
  tel: string;
  email: string;
  status: string;
  pdf: string;
  role: string;
}

const StudentSchema: Schema<IStudent> = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pdf: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  role: { type: String, default: "studient" },
});

export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
