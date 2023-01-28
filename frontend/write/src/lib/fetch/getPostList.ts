const getPostList = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/posts`
    );
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw Error("Unknown error");
  }
};

export default getPostList;
