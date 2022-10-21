const putPost = async (
  title: string,
  content: string,
  published: boolean,
  postId: string,
  bearerToken: string
) => {
  const postDetails = { title, content, published: published.toString() };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
    body: new URLSearchParams(postDetails),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/update`,
      options
    );
    if (!response.ok) throw new Error(`${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default putPost;
