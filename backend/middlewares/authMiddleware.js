/** @format */

import { clerkClient } from "@clerk/express";

// Middleware (protect admin route)

export const adminOnly = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const response = await clerkClient.users.getUser(clerkId);

    if (response.publicMetadata.role !== "admin") {
      res.json({ success: false, message: "Unauthorized Access!" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
