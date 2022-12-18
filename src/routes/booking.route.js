import express from "express";
import {
  createBookingCheckout,
  getCheckoutSession,
  getUserBookings,
  getUserBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
const BookingRouter = express.Router();
BookingRouter.get("/", createBookingCheckout, (req, res, next) =>
  res.redirect("/")
);
BookingRouter.get(
  "/create-checkout-session/:productId",
  protect,
  getCheckoutSession
);
BookingRouter.post("/create-checkout-session/", protect, getCheckoutSession);
BookingRouter.get("/my-booking", protect, getUserBookings);
BookingRouter.get("/my-booking/:id", protect, getUserBooking);
export default BookingRouter;
//# sourceMappingURL=booking.route.js.map
