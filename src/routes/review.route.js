import express from "express";
import {
  createReviewHandler,
  getAllReviewsHandler,
  getReviewHandler,
  deleteReviewHandler,
  updateReviewHandler,
  setUserId,
  setProductId,
  uploadReviewImg,
  resizeImg,
  getReviewBySlugHandler,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import restrictTo from "../middlewares/restrictTo.middleware.js";
import Phone from "../models/phone.model.js";
import Laptop from "../models/laptop.model.js";
const ReviewRouter = express.Router({ mergeParams: true });
// /:productID/reviews
ReviewRouter.route("/").get(getAllReviewsHandler);
// reviews on product
ReviewRouter.get("/phones/:slug", getReviewBySlugHandler(Phone));
ReviewRouter.get("/laptops/:slug", getReviewBySlugHandler(Laptop));
// ReviewRouter.get("/phones/:slug", getReviewBySlugHandler(Phone));
ReviewRouter.get("/:id", getReviewHandler);
// Review/id/reviews
// ReviewRouter.use(protect);
ReviewRouter.route("/:id")
  .patch(updateReviewHandler)
  .delete(deleteReviewHandler);
// productId/reviews
ReviewRouter.post(
  "/",
  setProductId,
  setUserId,
  uploadReviewImg,
  resizeImg,
  createReviewHandler
);
ReviewRouter.patch("/:reviewId", updateReviewHandler);
// ReviewRouter.post("/:id/reviews", setProductIdAndUserId, createReviewHandler);
// need permission and specific role
// specify for admin
ReviewRouter.use(protect, restrictTo("admin"));
ReviewRouter.post("/", createReviewHandler);
ReviewRouter.route("/:id")
  .patch(updateReviewHandler)
  .delete(deleteReviewHandler);
export default ReviewRouter;
//# sourceMappingURL=review.route.js.map
