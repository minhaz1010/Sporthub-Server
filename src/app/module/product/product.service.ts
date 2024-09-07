import { IProduct } from "./product.interface";
import slugify from "slugify";
import { Product } from "./product.schema";

const createProductInDatabase = async (payload: Partial<IProduct>) => {
  const slug = slugify(`${payload.name}${payload.category}` as string, "-");
  const updatedProduct = {
    ...payload,
    slug: slug,
  };
  const result = await Product.create(updatedProduct);
  return result;
};

export const ProductService = {
  createProductInDatabase,
};
