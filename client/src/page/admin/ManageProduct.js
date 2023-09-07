import React, { useEffect, useState, useCallback } from "react";
import { InputForm, Pagination } from "components";
import * as apis from "apis";
import icons from "ultils/icons";
import moment from "moment";
import { formatMoney } from "ultils/helpers";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import NoProduct from "assets/logo-image.png";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import path from "ultils/path";
import { useForm } from "react-hook-form";

const { LuEdit, RiDeleteBin6Line, FaArrowDownShortWide, FaArrowUpWideShort } =
  icons;

const ManageProduct = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editElm, setEditElm] = useState(null);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const fetchProducts = async (params) => {
    const response = await apis.apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setProduct(response);
  };
  // XÓA SẢN PHẨM
  const handleDelete = (data) => {
    Swal.fire({
      text: `Bạn có chắc muốn xóa sản phẩm '${data?.title}' này?`,
      showCancelButton: true,
      cancelButtonColor: "#ee3131",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
      confirmButtonColor: "#2563EB",
      title: "Oops!",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apis.apiDeleteProduct(data?._id);
        if (response.success)
          Swal.fire(
            "Success",
            `Xóa thành công sản phẩm '${data?.title}'`,
            "success"
          ).then(() => {
            setEditElm(null);
            render();
          });
        else toast.error(response.mes);
      }
    });
  };
  //SEARCH PRODUCT
  const handleSearchProduct = (data) => {
    console.log(data);
  };
  // RENDER CLIENT
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // NAVIGATE SORT
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort) {
      queries.sort = sort;
      delete queries.page;
    } else delete queries.sort;
    navigate({
      pathname: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
      search: createSearchParams(queries).toString(),
    });
  }, [sort]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [params, update]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">Quản lý sản phẩm</span>
        </h1>
      </div>
      <div className="w-full py-4 px-10">
        <div className="flex justify-between py-4">
          <div className="flex items-center justify-center text-2xl">
            {(!sort || sort === "createdAt") && (
              <span
                className="cursor-pointer"
                onClick={() => setSort("-createdAt")}
              >
                <FaArrowDownShortWide />
              </span>
            )}
            {sort === "-createdAt" && (
              <span
                className="cursor-pointer"
                onClick={() => setSort("createdAt")}
              >
                <FaArrowUpWideShort />
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit(handleSearchProduct)} className="w-2/5">
            <InputForm
              id={"q"}
              register={register}
              errors={errors}
              placeholder={"Tìm kiếm sản phẩm theo tên, giá..."}
              classInput={"input-bordered"}
              wf
            />
          </form>
        </div>
        {product?.products?.length > 0 && (
          <table className="table table-zebra mb-5 bg-slate-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th>#</th>
                <th className="w-[150px]">Title</th>
                <th>Brand</th>
                <th>Price(VND)</th>
                <th>Color</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Rating</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product?.products?.map((el) => (
                <tr key={el._id}>
                  <td className="w-[100px] h-[100px]">
                    <img
                      src={el.thumb || NoProduct}
                      alt={el.title}
                      className="w-full h-full object-contain p-[2px]"
                    />
                  </td>
                  <td className="w-[150px] capitalize">
                    {el.title.toLowerCase()}
                  </td>
                  <td className="capitalize">{el.brand.toLowerCase()}</td>
                  <td>{formatMoney(el.price)}</td>
                  <td className="capitalize">{el.color?.toLowerCase()}</td>
                  <td>{el.category}</td>
                  <td>{el.quantity}</td>
                  <td>{el.sold}</td>
                  <td>{el.totalRatings}</td>
                  <td>{moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td className="flex gap-2 capitalize text-blue-500">
                    <span
                      title="Sửa sản phẩm"
                      className="hover:underline cursor-pointer text-lg text-yellow-500"
                    >
                      <LuEdit />
                    </span>
                    <span
                      className="hover:underline cursor-pointer text-lg text-main"
                      title="Xóa sản phẩm"
                      onClick={() => handleDelete(el)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {product?.products.length <= 0 && (
          <div className="flex flex-col gap-5 justify-center items-center p-20">
            <img
              src={NoProduct}
              alt="No Product"
              className="w-[300px] object-contain opacity-60"
            />
            <span className="text-xl font-semibold opacity-60">No Product</span>
          </div>
        )}
        {product?.counts > +process.env.REACT_APP_LIMIT && (
          <Pagination totalCount={product?.counts} />
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
