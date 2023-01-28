import { Dispatch, SetStateAction } from "react";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";
import postPost from "../../lib/fetch/postPost";
import findErrorObject from "../../lib/general/findErrorObject";

const createPost = async (
  title: string,
  content: string,
  published: boolean,
  bearerToken: string,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  setTitleError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>,
  setContentError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>,
  setPublishedError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>
) => {
  try {
    setSuccess(false);
    await postPost(title, content, published, bearerToken);
    setSuccess(true);
  } catch (err) {
    if (err instanceof Error) {
      const errorArray = JSON.parse(err.message).errors;

      setTitleError(findErrorObject(errorArray, "title"));
      setContentError(findErrorObject(errorArray, "content"));
      setPublishedError(findErrorObject(errorArray, "published"));
    }
  }
};

export default createPost;
