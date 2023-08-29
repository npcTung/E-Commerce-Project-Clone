import React from "react";
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
    <main className="my-5">
      <Outlet />
    </main>
  );
};

export default Member;
