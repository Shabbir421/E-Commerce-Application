/** @format */

import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { createOrder, getUserOrders } from "../controllers/orderController.js";


const orderRoute = Router();

//! order routes
orderRoute.get("/", getUserOrders);
orderRoute.post("/", createOrder);

export default orderRoute;
