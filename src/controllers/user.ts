import { Request, Response } from "express";

const userInfoGet = async (req: Request, res: Response) => {
  res.send(req.user);
};

export default userInfoGet;
