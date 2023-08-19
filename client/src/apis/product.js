import axiosConfig from "../axios";

export const apiGetProducts = (params) =>
  axiosConfig({
    url: "/product",
    method: "get",
    params,
  });

export const apiGetProduct = (pid) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "get",
  });
