/** @format */

import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const cartRoute = Router();

cartRoute.use(protectRoute);

cartRoute.get("/", getCart);
cartRoute.post("/", addToCart);
cartRoute.put("/:productId", updateCartItem);
cartRoute.delete("/:productId", removeFromCart);
cartRoute.delete("/", clearCart);

export default cartRoute;
