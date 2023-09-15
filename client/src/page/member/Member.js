import React from "react";
import { MemberSidebar } from "components";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/path";

const Member = () => {
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isLoggedIn || !currentData)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));
  return (
    <div className="w-full flex min-h-screen">
      <MemberSidebar currentData={currentData} />
      <div className="w-[17%]"></div>
      <main className="w-[83%] bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Member;
