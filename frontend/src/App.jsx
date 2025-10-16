import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import FarmerDash from "./components/DashBoards/FarmerDash/UI/FarmerDash";
import CustomerDash from "./components/DashBoards/CustomerDash/UI/CustomerDash";
import AdminDash from "./components/DashBoards/AdminDash/UI/AdminDash";

import AdminLayout from "./components/DashBoards/AdminDash/AdminLayout";
import CustomerLayout from "./components/DashBoards/CustomerDash/CustomerLayout";
import FarmerLayout from "./components/DashBoards/FarmerDash/FarmerLayout";
import FarmerProfile from "./components/DashBoards/FarmerDash/UI/FarmerProfile";
import FarmerProducts from "./components/DashBoards/FarmerDash/UI/FarmerProducts";
import CustomerProducts from "./components/DashBoards/CustomerDash/UI/CustomerProducts";
import CustomerProfile from "./components/DashBoards/CustomerDash/UI/CustomerProfile";
import CustomerOrders from "./components/DashBoards/CustomerDash/UI/CustomerOrders";
import FarmerOrders from "./components/DashBoards/FarmerDash/UI/FarmerOrders";
import AdminOrders from "./components/DashBoards/AdminDash/UI/AdminOrders";
import AdminFarmerDash from "./components/DashBoards/AdminDash/UI/AdminFarmerDash";
import AdminCustomerDash from "./components/DashBoards/AdminDash/UI/AdminCustomerDash";
import AdminProfit from "./components/DashBoards/AdminDash/UI/AdminProfit";
import AdminFarmerProduct from "./components/DashBoards/AdminDash/UI/AdminFarmerProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/farmerDashBoard",
    element: <FarmerLayout />,
    children: [
      {
        index: true,
        element: <FarmerDash />, // this loads by default at /farmerDashBoard
      },
      {
        path: "farmerHome",
        element: <FarmerDash />,
      },
      {
        path: "products",
        element: <FarmerProducts />,
      },
      {
        path: "profile",
        element: <FarmerProfile />,
      },
      {
        path: "orders",
        element: <FarmerOrders />,
      },
    ],
  },
  // In App.js, update the customer routes:
  {
    path: "/customerDashBoard",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <CustomerDash />,
      },
      {
        path: "products",
        element: <CustomerProducts />,
      },
      {
        path: "orders",
        element: <CustomerOrders />,
      },
      {
        path: "profile",
        element: <CustomerProfile />,
      },
    ],
  },
  {
    path: "/adminDashBoard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDash />,
      },
      {
        path: "adminOrders",
        element: <AdminOrders />,
      },
        {
        path: "adminFarmer",
        element: <AdminFarmerDash />,
      },
        {
        path: "adminCustomer",
        element: <AdminCustomerDash />,
      },
        {
        path: "adminProfit",
        element: <AdminProfit />,
      }, {
        path: "adminFarmerProducts",
        element: <AdminFarmerProduct />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
