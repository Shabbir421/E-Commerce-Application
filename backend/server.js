/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

//* initialize express
const app = express();

//* connect to db
await connectDB();

//!payment routes
// special handling: Stripe webhook needs raw body BEFORE any body parsing middleware
// apply raw body parser conditionally only to webhook endpoint
app.use(
  "/api/payment",
  (req, res, next) => {
    if (req.originalUrl === "/api/payment/webhook") {
      express.raw({ type: "application/json" })(req, res, next);
    } else {
      express.json()(req, res, next); // parse json for non-webhook routes
    }
  },
  paymentRoute,
);

//! middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-application-frontend-adm.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(clerkMiddleware());

//! Routes
app.get("/api/check", (req, res) => {
  res.send("API is working fine!");
});
app.post("/clerk", express.json(), clerkWebhooks);

//!admin routes
app.use("/api/admin", adminRoute);
// !user routes
app.use("/api/users", userRoute);
//! order routes
app.use("/api/orders", orderRoute);
//! review routes
app.use("/api/reviews", reviewRoute);
//! product routes
app.use("/api/products", productRoute);
//! cart routes
app.use("/api/cart", cartRoutes);

//! port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
