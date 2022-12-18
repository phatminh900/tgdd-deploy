import { ForbiddenError } from "../utils/AppError.js";
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ForbiddenError(`You don't have permission to do that.`));
    next();
  };
};
export default restrictTo;
//# sourceMappingURL=restrictTo.middleware.js.map
