import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import editBlog from "../../helpers/blog/editBlog";
import BlogDataInterface from "../../interfaces/BlogDataInterface";
import BlogResponseErrorInterface from "../../interfaces/BlogResponseErrorInterface";
import UserStateInterface from "../../interfaces/UserStateInterface";
import SuccessElement from "../SuccessElement";
import ContentField from "./ContentField";
import PublishedField from "./PublishedField";
import TitleField from "./TitleField";

const BlogEdit = ({ user }: UserStateInterface) => {
  if (!user) return null;
  const blogDetail = useLoaderData() as BlogDataInterface;

  const [title, setTitle] = useState(blogDetail.title);
  const [content, setContent] = useState(blogDetail.content);
  const [published, setPublished] = useState(blogDetail.published);

  const [titleError, setTitleError] =
    useState<BlogResponseErrorInterface | null>(null);
  const [contentError, setContentError] =
    useState<BlogResponseErrorInterface | null>(null);
  const [publishedError, setPublishedError] =
    useState<BlogResponseErrorInterface | null>(null);

  const [success, setSuccess] = useState(false);

  return success ? (
    <SuccessElement message="Blog updated!" />
  ) : (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Edit Blog</h1>
          <form
            id="editForm"
            onSubmit={(e) => {
              e.preventDefault();
              editBlog(
                title,
                content,
                published,
                // eslint-disable-next-line no-underscore-dangle
                blogDetail._id,
                user,
                setSuccess,
                setTitleError,
                setContentError,
                setPublishedError
              );
            }}
          >
            <TitleField
              title={title}
              setTitle={setTitle}
              titleError={titleError}
            />
            <ContentField
              content={content}
              setContent={setContent}
              contentError={contentError}
            />
            <PublishedField
              published={published}
              setPublished={setPublished}
              publishedError={publishedError}
            />
            <div className="field">
              <input
                className="button is-link is-fullwidth"
                type="submit"
                value="Edit"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogEdit;
