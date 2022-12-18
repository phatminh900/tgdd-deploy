import crypto from "crypto";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import lodash from "lodash";
import { createOne } from "../services/factory.service.js";
import { validatePassword } from "../services/auth.service.js";
import { signJwt } from "../utils/jwt.js";
import { BadRequestError, NotFoundError } from "../utils/AppError.js";
import Email from "../utils/email.js";
const { omit } = lodash;
export const signup = catchAsync(async (req, res, next) => {
  const { role, ...body } = req.body;
  const user = await createOne(User, body);
  await new Email(user, "thegioididong").sendWelcome();
  res.status(201).json({
    status: "success",
    data: {
      ...omit(user.toJSON(), "password"),
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
  const user = await validatePassword(req.body);
  const token = signJwt(user.id);
  res.cookie(process.env.JWT_NAME, token, { httpOnly: false });
  res.status(200).json({
    status: "success",
    data: {
      ...omit(
        user.toJSON(),
        "password",
        "passwordChangeAt",
        "passwordResetToken",
        "passwordResetTokenExpires"
      ),
    },
    token,
  });
});
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new NotFoundError("Cant find this email."));
  //  create reset token
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });
  try {
    // send to email
    // dev
    // const resetLink = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/users/resetPassword/${resetToken}`;
    // TODO: RESET PASSWORD
    const resetLink = `${process.env.URL}/resetPassword/${resetToken}`;
    await new Email(user, resetLink).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Open your email to reset password",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      status: "error",
      message: "something went wrong.",
    });
  }
});
export const resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user)
    return next(new BadRequestError("Token invalid or expires try again."));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = req.body.passwordResetToken;
  user.passwordResetTokenExpires = req.body.passwordResetTokenExpires;
  user.passwordChangeAt = Date.now();
  await user.save({ validateBeforeSave: true });
  res.status(200).json({
    status: "success",
    message: "change password successfully",
  });
});
//# sourceMappingURL=auth.controller.js.map
