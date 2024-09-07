import { IProduct } from "./product.interface";
import slugify from "slugify";
import { Product } from "./product.schema";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

const createProductInDatabase = async (payload: Partial<IProduct>) => {
  const slug = slugify(`${payload.name}${payload.category}` as string, "-");
  const updatedProduct = {
    ...payload,
    slug: slug,
  };
  const result = await Product.create(updatedProduct);
  return result;
};

const getAllProductsFromDatabase = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
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

const updateSingleProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleProduct = async (id: string) => {
  await Product.findByIdAndDelete(id);
  return null;
};

export const ProductService = {
  createProductInDatabase,
  getAllProductsFromDatabase,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct,
};
