const getPost = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default getPost;
