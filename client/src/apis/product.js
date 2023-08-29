import axiosConfig from "axiosConfig";

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

export const apiRatings = (data) =>
  axiosConfig({
    url: "/product/ratings",
    method: "put",
    data,
  });
