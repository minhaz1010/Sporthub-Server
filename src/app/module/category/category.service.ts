import { ICategory } from "./category.interface";
import { Category } from "./category.schema";

const createCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
};
