import axiosConfig from "axiosConfig";

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

export const apiGetUsers = (params) =>
  axiosConfig({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, uid) =>
  axiosConfig({
    url: "/user/" + uid,
    method: "put",
    data,
  });

export const apiDeleteUser = (uid) =>
  axiosConfig({
    url: "/user/" + uid,
    method: "delete",
  });

export const apiUpdateCurrentUser = (data) =>
  axiosConfig({
    url: "/user/current",
    method: "put",
    data,
  });

export const apiUpdateCart = (data) =>
  axiosConfig({
    url: "/user/cart",
    method: "put",
    data,
  });

export const apiRemoveCart = (pid, color) =>
  axiosConfig({
    url: `/user/remove-cart/${pid}/${color}`,
    method: "delete",
  });
