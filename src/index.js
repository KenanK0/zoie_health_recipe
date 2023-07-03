

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppProvider from "./context/ContextProvider";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

import Account from "./pages/Account";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe/:recipe_details" element={<RecipeDetails />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
