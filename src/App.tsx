import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login/Login";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";
import SignUp from "./components/auth/SignUp/SignUp";
import getBlogList from "./lib/fetch/getBlogList";
import getBlog from "./lib/fetch/getBlog";
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
      element: <Navigate to="/blogs" replace />,
    },
    {
      path: "/blogs",
      element: (
        <>
          <BlogHeader user={user} setUser={setUser} />
          <BlogList />
        </>
      ),
      loader: async () => {
        const data = await queryClient.fetchQuery(["blogs"], getBlogList, {
          staleTime: 10000,
        });
        return data;
      },
      errorElement: <ErrorElement />,
    },
    {
      path: "/blogs/:blogId",
      element: (
        <>
          <BlogHeader user={user} setUser={setUser} />
          <BlogDetail user={user} />
        </>
      ),
      loader: async ({ params }) => {
        const { blogId } = params;
        if (typeof blogId !== "string") return null;
        await queryClient.prefetchQuery(
          ["blogs", blogId],
          () => getBlog(blogId),
          {
            staleTime: 10000,
          }
        );
        await queryClient.prefetchQuery(
          ["comments", blogId],
          () => getComments(blogId),
          {
            staleTime: 10000,
          }
        );
        return blogId;
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
