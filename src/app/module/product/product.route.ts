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

router.get("/", ProductController.getAllProduct);

router.get("/:slug", ProductController.getSingleProductBySlug);

router.delete("/:id", ProductController.deleteSingleProduct);

router.patch(
  "/:id",
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateSingleProduct,
);

export const ProductRoute = router;
