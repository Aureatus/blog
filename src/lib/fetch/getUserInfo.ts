const getUserInfo = async (bearerToken: string) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
  };
  try {
    const response = await fetch(`http://localhost:3000/user/info`, options);
    if (response.status !== 200) throw new Error(` ${await response.text()}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err;
    return "Unknown error";
  }
};

export default getUserInfo;
