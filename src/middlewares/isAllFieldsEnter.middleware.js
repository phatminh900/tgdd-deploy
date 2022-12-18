import { BadRequestError } from "../utils/AppError.js";
const isAllFieldsEnter = (...fields) => {
  return (req, res, next) => {
    if (!fields.every((field) => req.body[field]?.length > 0)) {
      return next(new BadRequestError(`Please fill out all the fields.`));
    }
    next();
  };
};
export default isAllFieldsEnter;
//# sourceMappingURL=isAllFieldsEnter.middleware.js.map
