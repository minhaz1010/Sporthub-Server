import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
const router = express.Router();

router.post(
  "/create-product",
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

export const ProductRoute = router;
