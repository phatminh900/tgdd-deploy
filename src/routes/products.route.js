import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import Product from "../models/product.model.js";
import {
  findAllProducts,
  searchProducts,
} from "../controllers/allProduct.controller.js";
const ProductRouter = express.Router();
findAllProducts;
ProductRouter.get("/", findAllProducts);
ProductRouter.get("/search/:key", searchProducts);
ProductRouter.post("/", protect, createProductHandler(Product));
ProductRouter.delete("/:id", deleteProductHandler(Product));
export default ProductRouter;
//# sourceMappingURL=products.route.js.map
