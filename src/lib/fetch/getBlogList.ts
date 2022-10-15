const getBlogList = async () => {
  try {
    const response = await fetch("http://localhost:3000/blogs");
    if (response.status !== 200)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Unknown error";
  }
};

export default getBlogList;
