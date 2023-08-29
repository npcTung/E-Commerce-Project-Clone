import axiosConfig from "axiosConfig";

export const apiGetCategories = () =>
  axiosConfig({
    url: "/product-category",
    method: "get",
  });
