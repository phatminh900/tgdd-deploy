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
import Phone from "../models/phone.model.js";
const PhoneRouter = express.Router();
PhoneRouter.route("/").get(getAllProductsHandler(Phone));
// PhoneRouter.param("id", isValidMongooseID);
// invalid id =>slug || valid id =>get by id
PhoneRouter.get("/:slug", getProductBySlugHandler(Phone));
PhoneRouter.get("/:id", getProductHandler(Phone));
// Phone/id/reviews
// Phone reviews
// add product name to distinguish reviews
PhoneRouter.use(
  "/:phoneId/reviews",
  (req, res, next) => {
    // @ts-ignore adding review or update to Phone model (ADD MODEL)
    req.Product = Phone;
    next();
  },
  reviewRouter
);
// need permission and specific role
PhoneRouter.use(protect, restrictTo("admin"));
PhoneRouter.post("/", createProductHandler(Phone));
// iphone store
PhoneRouter.post("/iphone", createProductHandler(Phone));
PhoneRouter.route("/:id")
  .patch(
    uploadProductImgs,
    resizingProductImg("phones"),
    updateProductHandler(Phone)
  )
  .delete(deleteProductHandler(Phone));
export default PhoneRouter;
//# sourceMappingURL=phone.route.js.map
