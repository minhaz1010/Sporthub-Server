import express from "express";
import { ProductRoute } from "../module/product/product.route";
import { CategoryRoutes } from "../module/category/category.route";
const router = express.Router();

const modularRouter = [
  {
    path: "/products",
    route: ProductRoute,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
];

modularRouter.forEach((route) => router.use(route.path, route.route));
export default router;
