import React from "react";
import Registation from "./pages/registation";
import ForgotPassword from "./pages/forgotpassword";
import Login from "./pages/login";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import UserList from "./components/UserList";
import Home from "./pages/home";
import Groups from "./pages/group/Groups";

import Message from "./pages/message/Message";
import FriendReq from "./pages/friendReq.js/FriendReq";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registation",
    element: <Registation />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/message",
    element: <Message />,
  },

  {
    path: "/group",
    element: <Groups />,
  },
  {
    path: "/request",
    element: <FriendReq />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
