import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import editPost from "../../helpers/posts/editPost";
import PostDataInterface from "../../interfaces/PostDataInterface";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";
import UserStateInterface from "../../interfaces/UserStateInterface";
import SuccessElement from "../SuccessElement";
import ContentField from "./ContentField";
import PublishedField from "./PublishedField";
import TitleField from "./TitleField";

const PostEdit = ({ user }: UserStateInterface) => {
  if (!user) return null;
  const postDetail = useLoaderData() as PostDataInterface;

  const [title, setTitle] = useState(postDetail.title);
  const [content, setContent] = useState(postDetail.content);
  const [published, setPublished] = useState(postDetail.published);

  const [titleError, setTitleError] =
    useState<PostResponseErrorInterface | null>(null);
  const [contentError, setContentError] =
    useState<PostResponseErrorInterface | null>(null);
  const [publishedError, setPublishedError] =
    useState<PostResponseErrorInterface | null>(null);

  const [success, setSuccess] = useState(false);

  return success ? (
    <SuccessElement message="Post updated!" />
  ) : (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Edit Post</h1>
          <form
            id="editForm"
            onSubmit={(e) => {
              e.preventDefault();
              editPost(
                title,
                content,
                published,
                // eslint-disable-next-line no-underscore-dangle
                postDetail._id,
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

export default PostEdit;
