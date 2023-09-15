import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import path from "ultils/path";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";

const FinalRegister = (props) => {
  const { status } = useParams();
  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops!", "Đăng ký không thành công", "error").then(() => {
        props.navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire(
        "Congratudation!",
        "Đăng ký thành công. Hãy đăng nhập~",
        "success"
      ).then(() => {
        props.navigate(`/${path.LOGIN}`);
      });
  }, [props.navigate, status]);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default withBase(FinalRegister);
