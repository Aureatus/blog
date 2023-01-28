import { Dispatch, SetStateAction } from "react";

interface UserStateInterface {
  user?: string | null;
  setUser?: Dispatch<SetStateAction<string | null>>;
}

export default UserStateInterface;
