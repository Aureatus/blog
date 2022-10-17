import { Router } from "express";
import passport from "passport";
import userInfoGet from "../controllers/user";

const userRouter = Router();

const protectedRoute = passport.authenticate("jwt", { session: false });

userRouter.get("/info", protectedRoute, userInfoGet);

export default userRouter;
