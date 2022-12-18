import mongoose from "mongoose";
import Product from "./product.model.js";
const { Schema } = mongoose;
const bookingSchema = new mongoose.Schema({
  products: {
    type: [Schema.Types.ObjectId],
    ref: Product,
    required: [true, "A booking must belong to a product"],
  },
  colors: {
    type: [String],
    required: [true, "A booking must have color"],
  },
  quantities: {
    type: [Number],
    required: [true, "A booking must have quantity"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A booking must belong to a user"],
  },
  userAddress: {
    type: String,
    required: [true, "A booking must have user address"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  prices: {
    type: [Number],
    required: [true, "A booking must have a price"],
  },
});
bookingSchema.pre(/^find/, function () {
  this.populate({
    path: "products",
    select: "title imgCover price category slug",
  });
  this.populate({
    path: "user",
    select: "name email",
  });
});
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
//# sourceMappingURL=booking.model.js.map
