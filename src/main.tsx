import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import CreateParty from "./pages/create-party/create-party";

const router = createBrowserRouter([
  {
    path: "/create-party",
    element: <CreateParty />,
  },
  {
    path: "/",
    element: <Navigate to="/create-party" />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster richColors />
  </>
);
