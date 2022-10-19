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
      `http://localhost:3000/posts/${postId}/delete`,
      options
    );
    if (!response.ok) throw new Error(`${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) return err;
    return new Error("Unknown error");
  }
};

export default delPost;
