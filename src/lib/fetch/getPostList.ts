const getPostList = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts");
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    return "Unknown error";
  }
};

export default getPostList;
