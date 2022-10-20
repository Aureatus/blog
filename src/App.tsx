import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login/Login";
import PostDetail from "./components/PostDetail/PostDetail";
import BlogHeader from "./components/BlogHeader";
import PostList from "./components/PostList";
import SignUp from "./components/auth/SignUp/SignUp";
import getPostList from "./lib/fetch/getPostList";
import getPost from "./lib/fetch/getPost";
import getComments from "./lib/fetch/getComments";
import ErrorElement from "./components/ErrorElement";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("bearerToken")
  );

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("bearerToken");
    } else if (localStorage.getItem("bearerToken") !== user) {
      localStorage.setItem("bearerToken", user);
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      index: true,
      element: <Navigate to="/posts" replace />,
    },
    {
      path: "/posts",
      element: (
        <>
          <BlogHeader user={user} setUser={setUser} />
          <PostList />
        </>
      ),
      loader: async () => {
        const data = await queryClient.fetchQuery(["posts"], getPostList);
        return data;
      },
      errorElement: <ErrorElement />,
    },
    {
      path: "/posts/:postId",
      element: (
        <>
          <BlogHeader user={user} setUser={setUser} />
          <PostDetail user={user} />
        </>
      ),
      loader: async ({ params }) => {
        const { postId } = params;
        if (typeof postId !== "string") return null;
        await queryClient.fetchQuery(["posts", postId], () => getPost(postId));
        await queryClient.fetchQuery(["comments", postId], () =>
          getComments(postId)
        );
        return postId;
      },
      errorElement: <ErrorElement />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (user) return redirect("/");
        return setUser;
      },
    },
    {
      path: "/signup",
      element: <SignUp />,
      loader: () => {
        if (user) return redirect("/");
        return null;
      },
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
