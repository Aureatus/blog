import { useQuery } from "@tanstack/react-query";
import getBlog from "../../lib/fetch/getBlog";

interface DataInterface {
  [index: number]: {
    title: string;
    timestamp: Date;
    author: {
      user_name: string;
      given_name: string;
      family_name: string;
      password: string;
      admin: boolean;
    };
    published: boolean;
    _id: string;
  };
}

const BlogInfo = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, isError, error } = useQuery(["blogs", blogId], () =>
    getBlog(blogId)
  );

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  if (typeof data === "string") return <p>{data}</p>;

  const blogObject = data.reduce((blog: DataInterface) => blog);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, content, timestamp, author, published, _id } = blogObject;

  if (!published) return null;

  return (
    <div key={_id}>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{new Date(timestamp).toDateString()}</p>
      <p>{`${author.given_name} ${author.family_name}`}</p>
    </div>
  );
};

export default BlogInfo;
