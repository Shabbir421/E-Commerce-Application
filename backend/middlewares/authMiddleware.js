/** @format */

import { requireAuth } from "@clerk/express";
import User from "../models/userModel.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized! invalid token" });
      }
      const user = await User.findOne({ clerkId: clerkId });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized! User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
];

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! User not found" });
    }
    if (req.user.role !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden! Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
