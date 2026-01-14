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

// Normal middleware
app.use(cors());
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("API is working fine!");
});
// Webhook route
app.post("/clerk", express.json(), clerkWebhooks);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
