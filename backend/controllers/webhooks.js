import { Webhook } from "svix";
import User from "../models/userModel.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Buffer → string
    const payload = req.body.toString("utf8");

    // Verify signature
    wh.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // ✅ MUST parse payload
    const { data, type } = JSON.parse(payload);

    if (type === "user.created") {
      await User.create({
        clerkId: data.id, // user_38G6K5gkWjYFD6NznNrolu0K4PD
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        imgUrl: data.image_url || "",
      });
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk Webhook Error:", error.message);
    return res.status(400).json({ success: false });
  }
};
