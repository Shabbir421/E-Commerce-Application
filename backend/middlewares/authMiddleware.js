/** @format */

import { requireAuth } from "@clerk/express";
import User from "../models/userModel.js";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  try {
    await requireAuth()(req, res, async () => {
      const clerkId = req.auth?.userId;

      if (!clerkId) {
        return res.status(401).json({
          message: "Unauthorized - invalid token",
        });
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("protectRoute error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no user ID",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    console.error("adminOnly error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
