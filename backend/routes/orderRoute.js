/** @format */

import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";


const orderRoute = Router();

//! order routes
orderRoute.get("/", getUserOrders);
orderRoute.post("/", createOrder);

export default orderRoute;
