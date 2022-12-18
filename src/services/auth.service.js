import User from "../models/user.model.js";
import { NotFoundError } from "../utils/AppError.js";
export const validatePassword = async (input) => {
  try {
    const user = await User.findOne({ email: input.email }).select("+password");
    if (!user || !(await user.comparePassword(input.password)))
      throw new NotFoundError(`User or password incorrect!`);
    return user;
  } catch (error) {
    throw error;
  }
};
//# sourceMappingURL=auth.service.js.map
