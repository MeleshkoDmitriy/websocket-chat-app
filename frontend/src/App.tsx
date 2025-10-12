import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "@/components";
import { HomePage, ChatPage } from "@/pages";
import { ROUTES } from "@/constants";

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: ROUTES.CHAT, element: <ChatPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
