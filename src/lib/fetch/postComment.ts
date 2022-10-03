const postComment = async (
  blogId: string,
  commentText: string,
  bearerToken: string
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearerToken,
    },
    body: new URLSearchParams({ text: commentText }),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${blogId}/create`,
      options
    );
    if (response.status !== 200) throw new Error(` ${await response.text()}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Unknown error";
  }
};

export default postComment;
