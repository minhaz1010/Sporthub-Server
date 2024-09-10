import express from "express";
import { CategoryController } from "./category.controller";
const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategory);

export const CategoryRoutes = router;
