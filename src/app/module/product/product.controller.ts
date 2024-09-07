import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.createProductInDatabase(req.body);
  sendResponse(res, {
    success: true,
    message: "Product Created Successfully",
    result,
    statusCode: httpStatus.CREATED,
  });
});

const getAllProduct = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.getAllProductsFromDatabase();
  sendResponse(res, {
    success: true,
    message: "Product Retrieved Successfully",
    result,
    statusCode: httpStatus.OK,
  });
});

const getSingleProductBySlug = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.getSingleProductBySlug(req.params.slug);
  sendResponse(res, {
    success: true,
    message: "Product Retrieved Successfully",
    result,
    statusCode: httpStatus.OK,
  });
});

const updateSingleProductBySlug = catchAsyncErrors(async (req, res) => {
  const result = await ProductService.updateSingleProductBySlug(
    req.params.slug,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: "Product Updated Successfully",
    result,
    statusCode: httpStatus.OK,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProductBySlug,
  updateSingleProductBySlug,
};
