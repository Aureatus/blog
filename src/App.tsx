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
import PostDetail from "./components/PostDetail/PostDetail";
import BlogHeader from "./components/BlogHeader";
import PostList from "./components/PostList";
import SignUp from "./components/auth/SignUp/SignUp";
import loginLoader from "./lib/loaders/loginLoader";
import signUpLoader from "./lib/loaders/signUpLoader";
import detailLoader from "./lib/loaders/detailLoader";
import listLoader from "./lib/loaders/listLoader";
import RouteErrorElement from "./components/RouteErrorElement";

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

  const router2 = createBrowserRouter(
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
              <BlogHeader user={user} setUser={setUser} />
              <Outlet />
            </>
          }
        >
          <Route
            index
            element={<PostList />}
            loader={() => listLoader(queryClient)}
          />
          <Route
            path=":postId"
            element={<PostDetail user={user} />}
            loader={(request) => detailLoader(request, queryClient)}
          />
        </Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router2} />
    </QueryClientProvider>
  );
};

export default App;
