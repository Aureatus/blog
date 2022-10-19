import { Dispatch, SetStateAction } from "react";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";
import putPost from "../../lib/fetch/putPost";
import findErrorObject from "../../lib/general/findErrorObject";

const editPost = async (
  title: string,
  content: string,
  published: boolean,
  postId: string,
  bearerToken: string,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  setTitleError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>,
  setContentError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>,
  setPublishedError: Dispatch<SetStateAction<PostResponseErrorInterface | null>>
) => {
  try {
    setSuccess(false);
    const editResponse = await putPost(
      title,
      content,
      published,
      postId,
      bearerToken
    );
    if (editResponse instanceof Error) throw editResponse;
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

export default editPost;
