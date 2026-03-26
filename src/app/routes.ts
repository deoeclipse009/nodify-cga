import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Build } from "../pages/Build";
import { Contact } from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "build", Component: Build },
      { path: "contact", Component: Contact },
    ],
  },
]);
