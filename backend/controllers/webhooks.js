// /** @format */

// import { Webhook } from "svix";
// import User from "../models/userModel.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const payload = JSON.stringify(req.body);

//     await whook.verify(payload, {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     const { data, type } = req.body;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses?.[0]?.email_address || "",
//           name: (data.first_name || "") + " " + (data.last_name || ""),
//           imageUrl: data.image_url || "",
//         };
//         await User.create(userData);
//         return res.json({});
//       }

//       case "user.deleted": {
//         await User.findOneAndDelete({ clerkId: data.id });
//         return res.json({});
//       }

//       default:
//         return res
//           .status(400)
//           .json({ success: false, message: "Unhandled event type" });
//     }
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

import { Webhook } from "svix";
import User from "../models/userModel.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ RAW body as string
    const payload = req.body.toString("utf8");

    // ✅ Verify signature
    wh.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // ✅ Parse AFTER verification
    const { data, type } = JSON.parse(payload);

    if (type === "user.created") {
      await User.create({
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        imageUrl: data.image_url || "",
      });
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    // ✅ MUST return 200
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

