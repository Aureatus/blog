import { Strategy } from "passport-local";
import User from "../models/user";

const loginStrategy = new Strategy(
  { usernameField: "user_name", passwordField: "password" },
  async (userName, password, done) => {
    try {
      const user = await User.findOne({ user_name: userName });

      if (!user) {
        return done(null, "false", { message: "User not found" });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (err) {
      return done(err);
    }
  }
);

export default loginStrategy;
