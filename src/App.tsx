import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
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
import PostCreate from "./components/PostCreate/PostCreate";
import authLoader from "./lib/loaders/authLoader";

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <div>
            <Outlet />
          </div>
        }
      >
        <Route index element={<Navigate to="posts" replace />} />
        <Route
          path="login"
          element={<Login />}
          loader={() => {
            if (user) return redirect("/");
            return setUser;
          }}
        />
        <Route
          path="signup"
          element={<SignUp />}
          loader={() => {
            if (user) return redirect("/");
            return null;
          }}
        />
        <Route
          path="posts"
          element={
            <>
              <PostHeader user={user} setUser={setUser} />
              <Outlet />
            </>
          }
        >
          <Route
            index
            element={<PostList user={user} />}
            loader={async () => {
              if (!user) throw Error("Please login or sign up");
              await queryClient.prefetchQuery(["posts"], getPostList);
              await queryClient.prefetchQuery(["userData"], () =>
                getUserInfo(user)
              );
              return null;
            }}
            errorElement={<ErrorElement providedError={null} />}
          />
          <Route
            path="create"
            element={<PostCreate user={user} />}
            errorElement={<ErrorElement providedError={null} />}
          />
          <Route
            path=":postId/edit"
            element={<PostEdit user={user} />}
            loader={async ({ params }) => {
              const { postId } = params;
              if (typeof postId !== "string")
                throw Error("Provided id is not valid");
              const postDetail: PostDataInterface = await postEditLoader(
                postId,
                user,
                queryClient
              );
              if (postDetail instanceof Error) throw postDetail;
              return postDetail;
            }}
            errorElement={<ErrorElement providedError={null} />}
          />
          <Route
            path=":postId/delete"
            element={<PostDelete user={user} />}
            loader={async ({ params }) => {
              const { postId } = params;
              if (typeof postId !== "string")
                throw Error("Provided id is not valid");
              return postId;
            }}
            errorElement={<ErrorElement providedError={null} />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
