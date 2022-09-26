const getBlog = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/blogs/${id}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Unknown error";
  }
};

export default getBlog;
