/** @format */

import { Router } from "express";
import {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const userRoute = Router();

//! Address Routes
userRoute.get("/addresses", getAddresses);
userRoute.post("/addresses", addAddress);
userRoute.put("/addresses/:addressId", updateAddress);
userRoute.delete("/addresses/:addressId", deleteAddress);

//! wishlist Routes
userRoute.get("/wishlist", getWishlist);
userRoute.post("/wishlist", addToWishlist);
userRoute.delete("/wishlist/:productId", removeFromWishlist);

export default userRoute;
