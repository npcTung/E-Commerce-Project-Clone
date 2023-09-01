import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/path";
import { AdminSidebar } from "components";

const Admin = () => {
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isLoggedIn || !currentData)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));
  if (+currentData?.role !== 2002)
    Swal.fire(
      "Oops!",
      "Bạn cần có quyền admin để thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.HOME}`));
  return (
    <div className="w-full flex min-h-screen">
      <AdminSidebar />
      <div className="w-[327px]"></div>
      <main className="flex-auto bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
