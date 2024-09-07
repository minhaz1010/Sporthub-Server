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

export const ProductController = {
  createProduct,
};
