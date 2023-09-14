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

export const apiCreateProduct = (data) =>
  axiosConfig({
    url: "/product",
    method: "post",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiUpdateProduct = (data, pid) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiAddVarriant = (data, pid) =>
  axiosConfig({
    url: "/product/varriant/" + pid,
    method: "put",
    data,
  });
