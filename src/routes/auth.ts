import { Router } from "express";

import { loginPost, logoutPost, signupPost } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", loginPost);

authRouter.post("/logout", logoutPost);

authRouter.post("/signup", signupPost);

export default authRouter;
