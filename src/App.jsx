import React from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import AuthContext from "./context/AuthContext";
import ModalContext from "./context/ModalContext";
import NoteContext from "./context/NoteContext";

import ProtectedRoutes from"./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  let myrouter = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes>  },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "home", element: <Home /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContext>
      <NoteContext>
        <ModalContext>
        
            <RouterProvider router={myrouter}></RouterProvider>
          
        </ModalContext>
        </NoteContext>
      </AuthContext>
    </>
  );
}

export default App;
