/** @format */

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  updateOrderStatus,
  updateProduct,
} from "../controllers/adminController.js";
import { adminOnly, protectRoute } from "../middlewares/authMiddleware.js";
import { upload } from "../configs/multer.js";

const adminRoute = Router();
//optimize the routes
adminRoute.get("/products", getAllProducts);
adminRoute.use(...protectRoute, adminOnly);
//!product routes
adminRoute.post("/products", upload.array("images", 3), createProduct);
adminRoute.put("/products/:id", upload.array("images", 3), updateProduct);
adminRoute.delete("/products/:id", deleteProduct);
//!order routes
adminRoute.get("/orders", getAllOrders);
adminRoute.patch("/orders/:orderId/status", updateOrderStatus);
//!customer routes
adminRoute.get("/customers", getAllCustomers);
//! stats routes
adminRoute.get("/stats", getDashboardStats);

// put : used to update entire resource
// patch : used to update partial resource

export default adminRoute;
