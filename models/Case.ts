import mongoose, { Schema, Document } from "mongoose";

export interface IHearing {
  date: Date;
  description: string;
  status: "Previous" | "Upcoming";
}

export interface ICase extends Document {
  title: string;
  description: string;
  clientId: mongoose.Types.ObjectId;
  status: string;
  hearing: IHearing[];
  createdAt: Date;
  updatedAt: Date;
}

const CaseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    hearings: [
      {
        date: { type: Date, required: true },
        description: { type: String, required: true },
        status: {
          type: String,
          enum: ["Previous", "Upcoming"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Case ||
  mongoose.model<ICase>("Case", CaseSchema);
