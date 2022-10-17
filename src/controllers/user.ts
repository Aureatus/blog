import { Request, Response } from "express";

interface IUser {
  user_name: string;
  given_name: string;
  family_name: string;
  password?: string;
  admin: boolean;
}

const userInfoGet = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  delete user.password;
  res.send(user);
};

export default userInfoGet;
