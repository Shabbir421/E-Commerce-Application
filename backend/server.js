/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Path from "path";
import connectDB from "./configs/mongodb.js";

// initialize express
const app = express();
const __dirname = Path.resolve();

// connect to db
await connectDB();

// middleware
app.use(cors());

// Routes
app.get("/api", (req, res) => {
  res.send(" API is working fine!");
});

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
  console.log(`Server is running on ${PORT}`);
});
