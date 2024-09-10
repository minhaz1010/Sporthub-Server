import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
  },
  {
    timestamps: true,
  },
);

export const Category = model<ICategory>("Category", CategorySchema);
