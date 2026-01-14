/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Path from "path";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/webhooks.js";

// initialize express
const app = express();
const __dirname = Path.resolve();

// middleware
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/api", (req, res) => {
  res.send(" API is working fine!");
});

//!Routes
app.post("/clerk", express.json(), clerkWebhooks);

// production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(Path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(Path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server is running on ${PORT}`);
});
