import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BlogList from "./components/BlogList";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/blogs" replace />,
  },
  {
    path: "/blogs",
    element: <BlogList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
