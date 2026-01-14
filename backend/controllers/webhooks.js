/** @format */

import { Webhook } from "svix";
import User from "../models/userModel.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString("utf8");

    wh.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(payload);

    switch (type) {
      case "user.created": {
        await User.create({
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imgUrl: data.image_url || "",
        });
        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        console.log("Unhandled Clerk event:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false });
  }
};
