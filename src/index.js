
// Primary color: Warm Red (#FF6B6B) - This can serve as your primary color, giving a warm and appetizing feel to your design.

// Secondary color: Pastel Green (#8FCB9B) - This can serve as a contrast to your primary color and bring a sense of freshness and health.

// Accent color 1: Egg Yolk Yellow (#FFC107) - This can be used for calls to action or to draw attention to certain elements.

// Accent color 2: Creamy White (#FFFDD0) - This can be used for backgrounds, giving a soft and clean look to your design.

// Neutral color: Dark Charcoal (#263238) - This can be used for text and other elements where contrast is needed.


import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import AppProvider from "./context/ContextProvider";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
