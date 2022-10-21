import { QueryClient } from "@tanstack/react-query";
import getPost from "../fetch/getPost";
import getUserInfo from "../fetch/getUserInfo";

const postEditLoader = async (
  postId: string,
  user: string | null,
  queryClient: QueryClient
) => {
  try {
    if (!user) throw Error("Please login or sign up");
    if (typeof postId !== "string") return null;
    const userInfo = await queryClient.fetchQuery(["userId"], () =>
      getUserInfo(user)
    );
    const postData = await queryClient.fetchQuery(["posts", postId], () =>
      getPost(postId)
    );
    // eslint-disable-next-line no-underscore-dangle
    if (userInfo._id !== postData.author._id)
      throw new Error("This isn't your post.");

    return postData;
  } catch (err) {
    return err;
  }
};

export default postEditLoader;
