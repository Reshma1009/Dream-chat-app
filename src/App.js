import React from "react";
import Message from "./components/Message";
import Registation from "./pages/registation";
import Login from "./pages/login";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import UserList from "./components/UserList";
import Home from "./pages/home";
import Groups from "./components/Groups";
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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
