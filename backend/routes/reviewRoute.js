/** @format */

import { Router } from "express";
import { createReview, deleteReview } from "../controllers/reviewController.js";


const reviewRouter = Router();

reviewRouter.post("/", createReview);
// we did not implement this function in the mobile app - in the frontend
// but jic if you'd like to see the backend code here it is - i provided
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
