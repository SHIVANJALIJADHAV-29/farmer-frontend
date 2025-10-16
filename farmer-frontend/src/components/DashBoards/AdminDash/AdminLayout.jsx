import React from "react";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
