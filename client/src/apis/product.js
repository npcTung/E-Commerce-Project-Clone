import axiosConfig from "../axios";

export const apiGetProducts = (params) =>
  axiosConfig({
    url: "/product",
    method: "get",
    params,
  });
