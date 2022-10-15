const postLogin = async (username: string, password: string) => {
  const loginDetails = { user_name: username, password };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(loginDetails),
  };
  try {
    const response = await fetch(`http://localhost:3000/login`, options);
    if (response.status !== 200) throw new Error(`${await response.text()}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err;
    return new Error("Unknown error");
  }
};

export default postLogin;
