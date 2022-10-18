import { Dispatch, SetStateAction } from "react";
import BlogResponseErrorInterface from "../../interfaces/BlogResponseErrorInterface";
import putBlog from "../../lib/fetch/putBlog";
import findErrorObject from "../../lib/general/findErrorObject";

const editBlog = async (
  title: string,
  content: string,
  published: boolean,
  blogId: string,
  bearerToken: string,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  setTitleError: Dispatch<SetStateAction<BlogResponseErrorInterface | null>>,
  setContentError: Dispatch<SetStateAction<BlogResponseErrorInterface | null>>,
  setPublishedError: Dispatch<SetStateAction<BlogResponseErrorInterface | null>>
) => {
  try {
    setSuccess(false);
    const editResponse = await putBlog(
      title,
      content,
      published,
      blogId,
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

export default editBlog;
