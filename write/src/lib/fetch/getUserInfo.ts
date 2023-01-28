const getUserInfo = async (bearerToken: string) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/user/info`,
      options
    );
    if (!response.ok) throw new Error(` ${await response.text()}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default getUserInfo;
