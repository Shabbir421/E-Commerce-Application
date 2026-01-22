/** @format */

import { requireAuth } from "@clerk/express";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    await requireAuth()(req, res, async () => {
      const clerkId = req.auth?.userId;

      if (!clerkId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - invalid token",
        });
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("protectRoute error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized - user not found",
    });
  }

  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Forbidden - admin access only",
    });
  }

  next();
};
