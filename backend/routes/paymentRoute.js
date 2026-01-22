/** @format */

import { Router } from "express";
import { createPaymentIntent, handleWebhook } from "../controllers/paymentController.js";

const paymentRoute = Router();

paymentRoute.post("/create-intent",createPaymentIntent);

// No auth needed - Stripe validates via signature
paymentRoute.post("/webhook", handleWebhook);

export default paymentRoute;
