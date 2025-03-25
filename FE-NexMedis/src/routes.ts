import { createBrowserRouter, redirect } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import MainPage from "./pages/mainPage";
import HomePage from "./pages/homePage";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(RootLayout),
    children: [
      {
        path: "/",
        element: React.createElement(MainPage),
        loader: () => {
          if (!localStorage.getItem("accessToken")) {
            return redirect("/login");
          }
          return null;
        },
        children: [
          {
            path: "",
            element: React.createElement(HomePage),
          },
        ],
      },
      {
        path: "/login",
        element: React.createElement(LoginPage),
        loader: () => {
          if (localStorage.getItem("accessToken")) {
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/register",
        element: React.createElement(RegisterPage),
        loader: () => {
          if (localStorage.getItem("accessToken")) {
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
