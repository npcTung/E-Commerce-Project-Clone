import axiosConfig from "../axios";

export const apiGetCategories = () =>
  axiosConfig({
    url: "/product-category",
    method: "get",
  });
