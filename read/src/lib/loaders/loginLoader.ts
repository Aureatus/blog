import { redirect } from "react-router-dom";
import UserStateInterface from "../../interfaces/UserStateInterface";

export default function loginLoader({ user, setUser }: UserStateInterface) {
  if (user) return redirect("/");
  return setUser;
}
