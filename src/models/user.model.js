import mongoose from "mongoose";
import requiredField from "../utils/requiredField.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  name: {
    ...requiredField(String, "User must have name"),
    minlength: 2,
  },
  email: {
    ...requiredField(String, "User must have email"),
    unique: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    ...requiredField(String, "User must have password"),
    minLength: [6, "Password must at least 6 characters"],
    select: false,
  },
  passwordConfirm: {
    ...requiredField(String, "User must have passwordConfirm"),
    minLength: [6, "Password must at least 6 characters"],
    validate: {
      validator: function (value) {
        const user = this;
        return user.password === value;
      },
      message: `password vs password confirm does'not match.`,
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  passwordChangeAt: { type: Date, select: false },
  role: {
    type: String,
    default: "user",
    enums: ["user", "admin"],
  },
});
// pre-save hooks
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  user.passwordConfirm = undefined;
  next();
});
// methods
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(12).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.methods.isPasswordChangeAfterIssued = function (issueAt) {
  const user = this;
  user.passwordChangeAt;
  if (user.passwordChangeAt) {
    // times 1000 to millisecond
    // issueAt <change ===true
    return issueAt * 1000 < new Date(user.passwordChangeAt).getTime();
  }
  return false;
};
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map
