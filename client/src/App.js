import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

//pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Register from "./pages/Register"
import Write from "./pages/Write";
import "./style.scss"

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      },
    ],
    
  },      
  {
    path: "/register",
    element: <Register/>
  },      
  {
    path: "/login",
    element: <Login/>
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
