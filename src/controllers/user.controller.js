import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
export const updateMe = catchAsync(async (req, res, next) => {
  // @ts-ignore
  // only can update name
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: "success", data: user });
});
//# sourceMappingURL=user.controller.js.map
