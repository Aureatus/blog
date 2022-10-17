import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login/Login";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";
import SignUp from "./components/auth/SignUp/SignUp";
import getBlogList from "./lib/fetch/getBlogList";
import ErrorElement from "./components/ErrorElement";
import getUserInfo from "./lib/fetch/getUserInfo";

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
          <BlogList user={user} />
        </>
      ),
      loader: async () => {
        await queryClient.fetchQuery(["blogs"], getBlogList);
        if (user)
          await queryClient.fetchQuery(["userId"], () => getUserInfo(user));
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
