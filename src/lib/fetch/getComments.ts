const getComments = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/blog/${id}`);
    if (response.status !== 200)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Unknown error";
  }
};

export default getComments;
