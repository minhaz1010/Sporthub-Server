import { IProduct } from "./product.interface";
import slugify from "slugify";
import { Product } from "./product.schema";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Category } from "../category/category.schema";
import { ICategory } from "../category/category.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interface";

const createProductInDatabase = async (payload: Partial<IProduct>) => {
  const slug = slugify(`${payload.name}${payload.category}` as string, "-");
  const updatedProduct = {
    ...payload,
    slug: slug,
  };
  const checkCategoryExistOrNot = await Category.findOne({
    name: payload.category,
  });
  const categoryDataFromPayload: ICategory = {
    name: payload.category as string,
  };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const productData = await Product.create([updatedProduct], { session });
    if (productData.length === 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went wrong to create product",
      );
    }
    if (!checkCategoryExistOrNot) {
      const categoryData = await Category.create([categoryDataFromPayload], {
        session,
      });
      if (categoryData.length === 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Something went wrong to create category",
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return productData[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Something went wrong to create product and category",
    );
  }
};

const getAllProductsFromDatabase = async (query: Record<string, unknown>) => {
  const totalItem = await Product.find().countDocuments();
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
  return {
    totalItem,
    result,
  };
};

const getAllProductsFromDatabaseWithQuery = async (query: IQueryParams) => {
  const {
    rating,
    minPrice,
    maxPrice,
    brand,
    category,
    page = 1,
    limit = 10,
    search,
    sort = "price",
  } = query;

  let productQuery = Product.find();

  if (search) {
    const searchRegex = new RegExp(search, "i");
    productQuery = productQuery.or([
      { name: searchRegex },
      { description: searchRegex },
      { brand: searchRegex },
    ]);
  }

  if (category) {
    productQuery = productQuery.where("category").equals(category);
  }

  if (rating) {
    if (rating == 1) {
      productQuery = productQuery.where("rating").gte(rating).lte(2);
    }
    if (rating == 2) {
      productQuery = productQuery.where("rating").gte(rating).lte(3);
    }
    if (rating == 3) {
      productQuery = productQuery.where("rating").gte(rating).lte(4);
    }
    if (rating == 4) {
      productQuery = productQuery.where("rating").gte(rating).lte(5);
    }
  }
  if (minPrice) {
    productQuery = productQuery.where("price").gte(minPrice);
  }
  if (maxPrice) {
    productQuery = productQuery.where("price").lte(maxPrice);
  }
  if (brand) {
    productQuery = productQuery.where("brand").equals(brand);
  }

  if (category) {
    productQuery = productQuery.where("category").equals(category);
  }

  const total = await Product.countDocuments();

  const products = await productQuery
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return { products, total };
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
  getAllProductsFromDatabaseWithQuery,
};
