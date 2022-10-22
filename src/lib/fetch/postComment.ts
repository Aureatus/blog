const postComment = async (
  postId: string,
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
      `http://localhost:3000/comments/${postId}/create`,
      options
    );
    if (!response.ok) throw Error(` ${await response.text()}`);
    return await response.text();
  } catch (err) {
    if (err instanceof Error) throw err;
    return "Unknown error";
  }
};

export default postComment;
