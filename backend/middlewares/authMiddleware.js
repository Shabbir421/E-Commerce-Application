/** @format */

import { clerkClient } from "@clerk/express";

export const adminOnly = async (req, res, next) => {
  try {
    // ✅ NEW Clerk API (no deprecation warning)
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // ✅ Only admins reach here
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};
