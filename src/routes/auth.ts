import { Request, Response, Router } from "express";

const authRouter = Router();

const placeHolderResponse = (req: Request, res: Response) => {
  res.send("test");
};

authRouter.post("/login", placeHolderResponse);

authRouter.post("/logout", placeHolderResponse);

authRouter.post("/signup", placeHolderResponse);

export default authRouter;
