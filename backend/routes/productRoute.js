/** @format */

import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getAllProducts } from "../controllers/adminController.js";
import { getProductById } from "../controllers/productController.js";

const productRoute = Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProductById);

export default productRoute;
