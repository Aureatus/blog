const putBlog = async (
  title: string,
  content: string,
  published: boolean,
  blogId: string,
  bearerToken: string
) => {
  const blogDetails = { title, content, published: published.toString() };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
    body: new URLSearchParams(blogDetails),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/blogs/${blogId}/update`,
      options
    );
    if (!response.ok) throw new Error(`${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) return err;
    return new Error("Unknown error");
  }
};

export default putBlog;
