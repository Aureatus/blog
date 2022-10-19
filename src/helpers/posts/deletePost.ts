import { Dispatch, SetStateAction } from "react";
import delPost from "../../lib/fetch/delPost";

const deletePost = async (
  postId: string,
  bearerToken: string,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<Error | null>>
) => {
  try {
    setSuccess(false);
    const editResponse = await delPost(postId, bearerToken);
    if (editResponse instanceof Error) throw editResponse;
    setSuccess(true);
    setError(null);
  } catch (err) {
    if (err instanceof Error) {
      setError(err);
    }
  }
};

export default deletePost;
