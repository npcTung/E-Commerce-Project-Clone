import axiosConfig from "../axios";

export const apiRegister = (data) =>
  axiosConfig({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiLogin = (data) =>
  axiosConfig({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axiosConfig({
    url: "/user/forgot-password",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axiosConfig({
    url: "/user/reset-password",
    method: "put",
    data,
  });

export const apiFinalRegister = (token) =>
  axiosConfig({
    url: "/user/finalregister/" + token,
    method: "put",
  });

export const apiGetCurrent = () =>
  axiosConfig({
    url: "/user/current/",
    method: "get",
  });
