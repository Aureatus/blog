import { QueryClient } from "@tanstack/react-query";
import BlogDataInterface from "../../interfaces/BlogDataInterface";
import getBlog from "../fetch/getBlog";
import getUserInfo from "../fetch/getUserInfo";

const blogEditLoader = async (
  blogId: string,
  user: string | null,
  queryClient: QueryClient
) => {
  try {
    if (!user) throw Error("Please login or sign up");
    if (typeof blogId !== "string") return null;
    const userInfo = await queryClient.fetchQuery(["userId"], () =>
      getUserInfo(user)
    );
    const blogData = await queryClient.fetchQuery(["blogs", blogId], () =>
      getBlog(blogId)
    );
    const blogDetail = blogData.reduce((blog: BlogDataInterface) => blog);

    // eslint-disable-next-line no-underscore-dangle
    if (userInfo._id !== blogDetail.author._id)
      throw new Error("This isn't your blog.");

    return blogDetail;
  } catch (err) {
    return err;
  }
};

export default blogEditLoader;
