import Stripe from "stripe";
import dotenv from "dotenv";
import catchAsync from "../utils/catchAsync.js";
import Booking from "../models/booking.model.js";
import { NotFoundError } from "../utils/AppError.js";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-08-01",
});
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // get product (phone first)
  const { cart, discount, userAddress, userId } = req.body;
  // create checkout session
  // const bought product
  const products = cart.map((product) => product.id);
  const prices = cart.map((product) => product.price);
  const quantities = cart.map((product) => product.quantity);
  const currentColors = cart.map((product) => encodeURI(product.currentColor));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.URL}?products=${products.join(
      "&products="
    )}&quantities=${quantities.join("&quantities=")}&prices=${prices.join(
      "&prices="
    )}&userAddress=${encodeURI(
      userAddress
    )}&user=${userId}&colors=${currentColors.join("&colors=")}`,
    mode: "payment",
    cancel_url: `${process.env.URL}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.productId,
    //
    line_items: cart.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: { name: item.title, images: [item.imgCover] },
        unit_amount: item.price - (item.price * discount) / 100,
      },
      quantity: item.quantity,
    })),
  });
  res.status(200).json({
    status: "success",
    session,
  });
});
export const createBookingCheckout = catchAsync(async (req, res, next) => {
  const { products, prices, colors, userAddress, user, quantities } = req.query;
  // product can either arr or single
  if (
    !products ||
    (!products.length && !prices) ||
    (!prices?.length && !userAddress && !user)
  )
    return next();
  await Booking.create({
    products,
    colors,
    prices,
    userAddress,
    user,
    quantities,
  });
  next();
});
export const getUserBookings = catchAsync(async (req, res, next) => {
  // find user
  const bookings = await Booking.find({ user: req.user.id });
  // O(n2)
  const userBookings = bookings.map((booking) => {
    return {
      products: booking.products.map((product, i) => ({
        title: product.title,
        imgCover: product.imgCover,
        quantity: booking.quantities[i],
        currentColor: booking.colors[i],
      })),
      _id: booking._id,
      total: booking.prices.reduce(
        (total, price, i) => total + price * booking.quantities[i],
        0
      ),
      userAddress: booking.userAddress,
      createdAt: booking.createdAt,
    };
  });
  // const prices=
  res.status(200).json({
    status: "success",
    data: userBookings,
  });
  // const productsIds=userBooking.ma
  // const { product, price, color, userAddress, user } = req.query;
  // // product can either arr or single
  // if (
  //   !product ||
  //   (!product.length && !price) ||
  //   (!price?.length && !userAddress && !user)
  // )
  //   return next();
  // await Booking.create({ product, color, price, userAddress, user });
  // next();
});
export const getUserBooking = catchAsync(async (req, res, next) => {
  // find user
  const booking = await Booking.findOne({
    user: req.user.id,
    _id: req.params.id,
  });
  if (!booking) return next(new NotFoundError("Cant find this booking"));
  const userBooking = {
    products: booking.products.map((product, i) => ({
      title: product.title,
      imgCover: product.imgCover,
      quantity: booking.quantities[i],
      currentColor: booking.colors[i],
      price: product.price,
      slug: product.slug,
      category: product.category,
    })),
    _id: booking._id,
    total: booking.prices.reduce(
      (total, price, i) => total + price * booking.quantities[i],
      0
    ),
    userAddress: booking.userAddress,
    createdAt: booking.createdAt,
  };
  // const prices=
  res.status(200).json({
    status: "success",
    data: userBooking,
  });
  // const productsIds=userBooking.ma
  // const { product, price, color, userAddress, user } = req.query;
  // // product can either arr or single
  // if (
  //   !product ||
  //   (!product.length && !price) ||
  //   (!price?.length && !userAddress && !user)
  // )
  //   return next();
  // await Booking.create({ product, color, price, userAddress, user });
  // next();
});
//# sourceMappingURL=booking.controller.js.map
