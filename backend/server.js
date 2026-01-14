/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Webhook route MUST come BEFORE json middleware
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// Normal middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("API is working fine!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
