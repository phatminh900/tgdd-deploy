import express from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  getProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getProductBySlugHandler,
  uploadProductImgs,
  resizingProductImg,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import restrictTo from "../middlewares/restrictTo.middleware.js";
import reviewRouter from "../routes/review.route.js";
import Laptop from "../models/laptop.model.js";
const LaptopRouter = express.Router();
LaptopRouter.route("/").get(getAllProductsHandler(Laptop));
// LaptopRouter.param("id", isValidMongooseID);
// invalid id =>slug || valid id =>get by id
LaptopRouter.get("/:slug", getProductBySlugHandler(Laptop));
LaptopRouter.get("/:id", getProductHandler(Laptop));
// Laptop/id/reviews
// Laptop reviews
// add product name to distinguish reviews
LaptopRouter.use(
  "/:laptopId/reviews",
  (req, res, next) => {
    // @ts-ignore adding review or update to Laptop model
    req.Product = Laptop;
    next();
  },
  reviewRouter
);
// need permission and specific role
LaptopRouter.use(protect, restrictTo("admin"));
LaptopRouter.post("/", createProductHandler(Laptop));
// LaptopRouter.patch("/:id", updateProductHandler(Laptop));
// iProduct store
LaptopRouter.post("/", createProductHandler(Laptop));
LaptopRouter.route("/:id")
  .patch(
    uploadProductImgs,
    resizingProductImg("laptops"),
    updateProductHandler(Laptop)
  )
  .delete(deleteProductHandler(Laptop));
export default LaptopRouter;
//# sourceMappingURL=laptop.route.js.map
