const postSignUp = async (
  user_name: string,
  given_name: string,
  family_name: string,
  password: string,
  confirm_password: string
) => {
  const signUpDetails = {
    user_name,
    given_name,
    family_name,
    password,
    confirm_password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(signUpDetails),
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/signup`,
      options
    );
    if (!response.ok) throw new Error(` ${await response.text()}`);
    return response.status;
  } catch (err) {
    if (err instanceof Error) throw err;
    return "Unknown error";
  }
};

export default postSignUp;
