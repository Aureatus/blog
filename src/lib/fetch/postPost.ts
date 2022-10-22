const postPost = async (
  title: string,
  content: string,
  published: boolean,
  bearerToken: string
) => {
  const postDetails = { title, content, published: published.toString() };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
    body: new URLSearchParams(postDetails),
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/posts/create`,
      options
    );
    if (!response.ok) throw new Error(`${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default postPost;
