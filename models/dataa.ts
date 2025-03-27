import mongoose, { Schema, Document } from "mongoose";

export interface IDataa extends Document {
  name: string;
  lastname: string;
  email: string;
  birth: number;
  birth_place: string;
  category: string;
  pdf: string;
}

const DataaSchema: Schema<IDataa> = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birth: { type: Number, required: true },
  birth_place: { type: String, required: true },
  category: { type: String, required: true },
  pdf: { type: String, required: true },
});

export default mongoose.models.Dataa ||
  mongoose.model<IDataa>("Dataa", DataaSchema);
