import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login/Login";
import PostDetail from "./components/PostDetail/PostDetail";
import BlogHeader from "./components/BlogHeader";
import PostList from "./components/PostList";
import SignUp from "./components/auth/SignUp/SignUp";
import ErrorElement from "./components/ErrorElement";
import loginLoader from "./lib/loaders/loginLoader";
import signUpLoader from "./lib/loaders/signUpLoader";
import detailLoader from "./lib/loaders/detailLoader";
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
      loader: () => listLoader(queryClient),
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
      loader: (request) => detailLoader(request, queryClient),
      errorElement: <ErrorElement />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => loginLoader({ user, setUser }),
    },
    {
      path: "/signup",
      element: <SignUp />,
      loader: () => () => signUpLoader(user),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
