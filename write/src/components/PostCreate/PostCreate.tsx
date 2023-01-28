import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import createPost from "../../helpers/posts/createPost";
import PostResponseErrorInterface from "../../interfaces/PostResponseErrorInterface";
import UserStateInterface from "../../interfaces/UserStateInterface";
import SuccessElement from "../SuccessElement";
import ContentField from "./ContentField";
import PublishedField from "./PublishedField";
import TitleField from "./TitleField";

const PostCreate = ({ user }: UserStateInterface) => {
  if (!user) return null;

  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [titleError, setTitleError] =
    useState<PostResponseErrorInterface | null>(null);
  const [contentError, setContentError] =
    useState<PostResponseErrorInterface | null>(null);
  const [publishedError, setPublishedError] =
    useState<PostResponseErrorInterface | null>(null);

  const [success, setSuccess] = useState(false);

  return success ? (
    <SuccessElement message="Post Created!" />
  ) : (
    <div className="container is-max-desktop">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 has-text-centered	">Create Post</h1>
          <form
            id="editForm"
            onSubmit={(e) => {
              e.preventDefault();
              createPost(
                title,
                content,
                published,
                user,
                setSuccess,
                setTitleError,
                setContentError,
                setPublishedError
              ).then(() => queryClient.invalidateQueries(["posts"]));
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
                value="Create"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PostCreate;
