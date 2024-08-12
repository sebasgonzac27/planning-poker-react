import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import CreateParty from "./pages/create-party/create-party";
import JoinParty from "./pages/join-party/join-party";

const router = createBrowserRouter([
  {
    path: "/create-party",
    element: <CreateParty />,
  },
  {
    path: "/join-party/:id",
    element: <JoinParty />,
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
