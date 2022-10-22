const getPost = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_restBlogAPIprefix}/posts/${id}`
    );
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    return "Unknown error";
  }
};

export default getPost;
