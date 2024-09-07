import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    category: z.string().min(1, { message: "Category is required" }).trim(),
    stock: z.number().min(0, { message: "Stock must be at least 0" }),
    brand: z.string().min(1, { message: "Brand is required" }).trim(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .trim(),
    price: z.number().min(0, { message: "Price must be at least 0" }),
    rating: z
      .number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating cannot exceed 5" }),
    image: z.string().min(1, { message: "Image URL is required" }).trim(),
  }),
});

const updateProductValidationSchema =
  createProductValidationSchema.deepPartial();

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
