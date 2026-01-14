/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/webhooks.js";

// initialize express
const app = express();

// middleware
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send(" API is working fine!");
});

//!Routes
app.post("/clerk", express.json(), clerkWebhooks);

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server is running on ${PORT}`);
});
