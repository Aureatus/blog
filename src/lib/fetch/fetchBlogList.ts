const fetchBlogList = async () => {
  try {
    const response = await fetch("http://localhost:3000/blogs");
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Unknown error";
  }
};

export default fetchBlogList;
