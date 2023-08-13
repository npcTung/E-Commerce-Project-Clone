import axiosConfig from "../axios";

export const apiRegister = (data) =>
  axiosConfig({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axiosConfig({
    url: "/user/login",
    method: "post",
    data,
  });
