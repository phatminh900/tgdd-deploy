import express from "express";
import {
  login,
  signup,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import isAllFieldsEnter from "../middlewares/isAllFieldsEnter.middleware.js";
import { protect } from "../middlewares/protect.middleware.js";
import { updateMe } from "../controllers/user.controller.js";
const UserRouter = express.Router();
UserRouter.post("/signup", signup);
UserRouter.post("/login", isAllFieldsEnter("email", "password"), login);
UserRouter.post("/forgotPassword", forgotPassword);
UserRouter.patch("/resetPassword/:token", resetPassword);
UserRouter.patch("/updateMe", protect, updateMe);
export default UserRouter;
//# sourceMappingURL=user.route.js.map
