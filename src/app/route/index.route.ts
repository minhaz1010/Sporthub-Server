import express from "express"
import { ProductRoute } from "../module/product/product.route";
const router = express.Router();

const modularRouter = [
  {
    path:"/products",
    route:ProductRoute
  }
]

modularRouter.forEach((route)=>router.use(route.path,route.route));
export default router;
