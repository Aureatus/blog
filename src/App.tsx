import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";

const App = () => {
  const queryClient = new QueryClient();

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
    },
    {
      path: "/blogs/:blogId",
      element: (
        <>
          <BlogHeader user={user} setUser={setUser} />
          <BlogDetail user={user} />
        </>
      ),
      loader: ({ params }) => params.blogId,
    },
    {
      path: "/login",
      element: <Login user={user} setUser={setUser} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
