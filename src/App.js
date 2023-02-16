import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";

import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <AuthPage register={true} />,
  },
  {
    path: "/login",
    element: <AuthPage register={false} />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
