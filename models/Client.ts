import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  //   clerkId: string; // Clerk user ID for authentication
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model<IClient>("Client", ClientSchema);
