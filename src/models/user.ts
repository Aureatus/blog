import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  user_name: { type: String, required: true },
  given_name: { type: String, required: true },
  family_name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

const User = model("User", UserSchema);

export default User;
