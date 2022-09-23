import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.jsonWebTokenSecret;

const JWTStrategy = new Strategy(
  {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      return done(error);
    }
  }
);

export default JWTStrategy;
