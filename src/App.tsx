import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
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
import RouteErrorElement from "./components/RouteErrorElement";
import getUserInfo from "./lib/fetch/getUserInfo";
import PostEdit from "./components/PostEdit/PostEdit";
import PostDelete from "./components/PostDelete";
import PostCreate from "./components/PostCreate/PostCreate";
import loginLoader from "./lib/loaders/loginLoader";
import signUpLoader from "./lib/loaders/signUpLoader";
import deleteLoader from "./lib/loaders/deleteLoader";
import editLoader from "./lib/loaders/editLoader";
import listLoader from "./lib/loaders/listLoader";

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
      <Route element={<Outlet />} errorElement={<RouteErrorElement />}>
        <Route index element={<Navigate to="posts" replace />} />
        <Route
          path="login"
          element={<Login />}
          loader={() => loginLoader({ user, setUser })}
        />
        <Route
          path="signup"
          element={<SignUp />}
          loader={() => signUpLoader(user)}
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
            loader={() => listLoader(user, queryClient)}
          />
          <Route path="create" element={<PostCreate user={user} />} />
          <Route
            path=":postId/edit"
            element={<PostEdit user={user} />}
            loader={async (request) => editLoader(request, user, queryClient)}
          />
          <Route
            path=":postId/delete"
            element={<PostDelete user={user} />}
            loader={deleteLoader}
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
