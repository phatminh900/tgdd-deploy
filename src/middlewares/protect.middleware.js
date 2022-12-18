import User from "../models/user.model.js";
import { findOne } from "../services/factory.service.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyJwt } from "../utils/jwt.js";
export const protect = catchAsync(async (req, res, next) => {
  // jwt exist
  let token;
  const requestHeaderAuth = req.headers.authorization;
  if (requestHeaderAuth && requestHeaderAuth.startsWith("Bearer")) {
    token = requestHeaderAuth.split(" ")[1];
  }
  if (!token)
    return next(
      new UnAuthorizedError(`You're not login.Please login and try again.`)
    );
  // valid jwt
  // @ts-ignore
  const decoded = await verifyJwt(token);
  // find user still exist
  const user = await findOne(User, decoded.id);
  if (!user)
    return next(
      new NotFoundError(`User belongs to this token no longer exist.`)
    );
  // user change password after token was issued
  if (user.passwordChangeAt && user.isPasswordChangeAfterIssued(decoded.iat)) {
    return next(
      new BadRequestError(`User recently change password.Please login again`)
    );
  }
  // assign user to the next middleware
  req.user = user;
  next();
});
//# sourceMappingURL=protect.middleware.js.map
