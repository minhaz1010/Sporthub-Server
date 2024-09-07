import { IProduct } from "./product.interface";
import slugify from "slugify";
import { Product } from "./product.schema";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createProductInDatabase = async (payload: Partial<IProduct>) => {
  const slug = slugify(`${payload.name}${payload.category}` as string, "-");
  const updatedProduct = {
    ...payload,
    slug: slug,
  };
  const result = await Product.create(updatedProduct);
  return result;
};

const getAllProductsFromDatabase = async () => {
  const result = await Product.find();
  if (result.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, " No Product Found");
  }
  return result;
};

const getSingleProductBySlug = async (slug: string) => {
  const result = await Product.findOne({ slug: slug });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, " No Product Found");
  }
  return result;
};

const updateSingleProductBySlug = async (
  id: string,
  payload: Partial<IProduct>,
) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const ProductService = {
  createProductInDatabase,
  getAllProductsFromDatabase,
  getSingleProductBySlug,
  updateSingleProductBySlug,
};
