import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";

// initialize express
const app = express();

// connect to db
await connectDB();
await connectCloudinary();

// middleware
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API is working fine!");
});
app.post("/clerk", express.json(), clerkWebhooks);

//!admin routes
app.use("/api/admin", adminRoute);
// !user routes
app.use("/api/users", userRoute);

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
