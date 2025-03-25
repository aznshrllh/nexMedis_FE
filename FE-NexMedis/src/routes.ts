import { createBrowserRouter, redirect } from "react-router";
import React from "react";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import MainPage from "./pages/mainPage";
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MainPage),
    loader: () => {
      if (!localStorage.accessToken) {
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
      if (localStorage.accessToken) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: React.createElement(RegisterPage),
    loader: () => {
      if (localStorage.accessToken) {
        return redirect("/");
      }
      return null;
    },
  },
]);

export default router;
