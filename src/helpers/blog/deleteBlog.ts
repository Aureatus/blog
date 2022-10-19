import { Dispatch, SetStateAction } from "react";
import delBlog from "../../lib/fetch/delBlog";

const deleteBlog = async (
  blogId: string,
  bearerToken: string,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<Error | null>>
) => {
  try {
    setSuccess(false);
    const editResponse = await delBlog(blogId, bearerToken);
    if (editResponse instanceof Error) throw editResponse;
    setSuccess(true);
    setError(null);
  } catch (err) {
    if (err instanceof Error) {
      setError(err);
    }
  }
};

export default deleteBlog;
