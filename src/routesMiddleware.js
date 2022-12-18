// import path from "path";
// import {
//   userRouter,
//   reviewRouter,
//   phoneRouter,
//   laptopRouter,
//   productRouter,
//   bookingRouter,
// } from "./routes";
// import { errorController } from "./controllers/error.controller";
// import { NotFoundError } from "./utils/AppError";
// const routes = (app) => {
//   // users
//   app.use("/api/v1/users", userRouter);
//   // products
//   // PHONEs
//   // --iphone
//   app.use("/api/v1/phones", phoneRouter);
//   app.use("/api/v1/laptops", laptopRouter);
//   app.use("/api/v1/booking", bookingRouter);
//   app.use("/api/v1/products", productRouter);
//   app.use("/api/v1/reviews", reviewRouter);
//   app.get("*", (req, res, next) => {
//     if (req.originalUrl.startsWith("/api/v1"))
//       return next(new NotFoundError("Not found"));
//     res.sendFile(path.join(__dirname, "./client", "index.html"));
//   });
//   //   global error handler
//   app.all("*", (req, res, next) => {
//     next(new NotFoundError(`${req.originalUrl} not found on this server.`));
//   });
//   // reviews
//   app.use((err, req, res, next) => {
//     errorController(err, req, res);
//   });
// };
// export default routes;
// //# sourceMappingURL=routesMiddleware.js.map
