import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsyncErrors(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    success: true,
    message: "Category Successfully Created",
    result,
    statusCode: httpStatus.CREATED,
  });
});
const getAllCategory = catchAsyncErrors(async (req, res) => {
  const result = await CategoryService.getAllCategory();
  sendResponse(res, {
    success: true,
    message: "Category Retrieved Successfully",
    result,
    statusCode: httpStatus.OK,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
