import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./components/auth/Login";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      index: true,
      element: <Navigate to="/blogs" replace />,
    },
    {
      path: "/blogs",
      element: (
        <>
          <BlogHeader />
          <BlogList />
        </>
      ),
    },
    {
      path: "/blogs/:blogId",
      element: (
        <>
          <BlogHeader />
          <BlogDetail />
        </>
      ),
      loader: ({ params }) => params.blogId,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
