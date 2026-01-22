/** @format */

import { requireAuth } from "@clerk/express";
import User from "../models/userModel.js";
import "dotenv/config";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
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

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden - admin access only" });
  }
  next();
};
