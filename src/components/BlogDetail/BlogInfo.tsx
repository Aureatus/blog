import { useQuery } from "@tanstack/react-query";
import BlogDataInterface from "../../interfaces/BlogDataInterface";
import getBlog from "../../lib/fetch/getBlog";

const BlogInfo = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, isError, error } = useQuery(["blogs", blogId], () =>
    getBlog(blogId)
  );

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  const blogObject = data.reduce((blog: BlogDataInterface) => blog);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, content, timestamp, author, published, _id } = blogObject;

  if (!published) return null;

  return (
    <div key={_id} className="section box">
      <div className="level">
        <div>
          <h1 className="title is-2">{title}</h1>
          <h3 className="subtitle is-4">{`By ${author.given_name} ${author.family_name}`}</h3>
        </div>
        <h4 className="is-size-5 is-italic">
          Published {new Date(timestamp).toDateString()}
        </h4>
      </div>
      <p className="is-size-5 has-text-justified">{content}</p>
    </div>
  );
};

export default BlogInfo;
