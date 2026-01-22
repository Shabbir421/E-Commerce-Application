/** @format */

import { Router } from "express";
import { createPaymentIntent, handleWebhook } from "../controllers/paymentController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const paymentRoute = Router();

paymentRoute.post("/create-intent", protectRoute, createPaymentIntent);

// No auth needed - Stripe validates via signature
paymentRoute.post("/webhook", handleWebhook);

export default paymentRoute;
