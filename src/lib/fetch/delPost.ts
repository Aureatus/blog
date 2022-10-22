const delPost = async (postId: string, bearerToken: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/posts/${postId}/delete`,
      options
    );
    if (!response.ok) throw new Error(`${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default delPost;
