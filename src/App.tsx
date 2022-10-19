import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login/Login";
import PostHeader from "./components/PostHeader";
import PostList from "./components/PostList";
import SignUp from "./components/auth/SignUp/SignUp";
import getPostList from "./lib/fetch/getPostList";
import ErrorElement from "./components/ErrorElement";
import getUserInfo from "./lib/fetch/getUserInfo";
import PostEdit from "./components/PostEdit/PostEdit";
import postEditLoader from "./lib/loaders/PostEditLoader";
import PostDataInterface from "./interfaces/PostDataInterface";
import PostDelete from "./components/PostDelete";

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
          <PostHeader user={user} setUser={setUser} />
          <PostList user={user} />
        </>
      ),
      loader: async () => {
        if (!user) throw Error("Please login or sign up");
        await queryClient.fetchQuery(["posts"], getPostList);
        await queryClient.fetchQuery(["userData"], () => getUserInfo(user));
        return null;
      },
      errorElement: <ErrorElement />,
    },
    {
      path: "/posts/:postId/edit",
      element: (
        <>
          <PostHeader user={user} setUser={setUser} />
          <PostEdit user={user} />
        </>
      ),
      loader: async ({ params }) => {
        const { postId } = params;
        if (typeof postId !== "string") throw Error("Provided id is not valid");
        const postDetail: PostDataInterface = await postEditLoader(
          postId,
          user,
          queryClient
        );
        if (postDetail instanceof Error) throw postDetail;
        return postDetail;
      },
      errorElement: <ErrorElement />,
    },
    {
      path: "/posts/:postId/delete",
      element: (
        <>
          <PostHeader user={user} setUser={setUser} />
          <PostDelete user={user} />
        </>
      ),
      loader: async ({ params }) => {
        const { postId } = params;
        if (typeof postId !== "string") throw Error("Provided id is not valid");
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
