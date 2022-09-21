import { Request, Response, Router } from "express";

import { loginPost, logoutPost, signupPost } from "../controllers/auth";

const authRouter = Router();

const placeHolderResponse = (req: Request, res: Response) => {
  res.send("test");
};

authRouter.post("/login", loginPost);

authRouter.post("/logout", logoutPost);

authRouter.post("/signup", signupPost);

export default authRouter;
