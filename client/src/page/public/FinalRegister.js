import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import path from "ultils/path";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";

const FinalRegister = ({ navigate }) => {
  const { status } = useParams();
  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops!", "Đăng ký không thành công", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire(
        "Congratudation!",
        "Đăng ký thành công. Hãy đăng nhập~",
        "success"
      ).then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, [navigate, status]);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default withBase(FinalRegister);
