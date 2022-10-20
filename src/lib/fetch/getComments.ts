const getComments = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/post/${id}`);
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    return "Unknown error";
  }
};

export default getComments;
