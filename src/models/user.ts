import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";

const UserSchema = new Schema({
  user_name: { type: String, required: true },
  given_name: { type: String, required: true },
  family_name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

UserSchema.pre("save", async function encryptPassword(next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.isValidPassword = async function validatePass(
  password: string
) {
  const passwordValidity = await compare(password, this.password);
  return passwordValidity;
};
const User = model("User", UserSchema);

export default User;
