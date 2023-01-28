import { redirect } from "react-router-dom";

export default function signUpLoader(user: string | null) {
  if (user) return redirect("/");
  return null;
}
