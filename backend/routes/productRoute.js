/** @format */

import { Router } from "express";
import { getAllProducts } from "../controllers/adminController.js";
import { getProductById } from "../controllers/productController.js";

const productRoute = Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProductById);

export default productRoute;
