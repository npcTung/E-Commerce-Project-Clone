import React, { useEffect, useState, useCallback } from "react";
import * as apis from "apis";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { EditUserAdmin, InputField, Pagination } from "components";
import useDebounce from "hooks/useDebounce";
import Avatar from "assets/user.png";
import { useForm } from "react-hook-form";
import icons from "ultils/icons";
import Swal from "sweetalert2";
import NoUser from "assets/no-person.png";
import { roles } from "ultils/contants";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";

const {
  LuEdit,
  RiDeleteBin6Line,
  IoMdClose,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
} = icons;

const ManageUser = ({ navigate, location }) => {
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({ q: "" });
  const [editElm, setEditElm] = useState(null);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState(null);
  const [params] = useSearchParams();
  const queriesDebounce = useDebounce(queries.q, 800);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    isBlocked: "",
  });
  // CALL API USERS
  const fetchUsers = async (params) => {
    const response = await apis.apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };
  // CẬP NHẬT TÀI KHOẢN NGƯỜI DÙNG
  const handleUpdate = async (data) => {
    const response = await apis.apiUpdateUser(data, editElm?._id);
    if (response.success)
      Swal.fire(
        "Thành công",
        `Cập nhật tài khoản ${editElm?.firstName} ${editElm?.lastName} thành công`,
        "success"
      ).then(() => {
        setEditElm(null);
        render();
      });
    else toast.error(response.mes, { theme: "colored" });
  };
  // XÓA TÀI KHOẢN NGƯỜI DÙNG
  const handleDelete = (data) => {
    Swal.fire({
      text: `Bạn có chắc muốn xóa tài khoản ${data?.firstName} ${data?.lastName} khỏi hệ thống?`,
      showCancelButton: true,
      cancelButtonColor: "#ee3131",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
      confirmButtonColor: "#2563EB",
      title: "Oops!",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apis.apiDeleteUser(data?._id);
        if (response.success)
          Swal.fire(
            "Success",
            `Xóa thành công tài khoản ${data?.firstName} ${data.lastName}`,
            "success"
          ).then(() => {
            setEditElm(null);
            render();
          });
        else toast.error(response.mes);
      }
    });
  };
  // RENDER CLIENT
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // RENDER CLIENT
  useEffect(() => {
    if (editElm)
      reset({
        email: editElm?.email,
        firstName: editElm?.firstName,
        lastName: editElm?.lastName,
        role: editElm?.role,
        phone: editElm?.phone,
        isBlocked: editElm?.isBlocked,
      });
  }, [editElm]);
  // SORT USERS TO NAVIGATE
  useEffect(() => {
    if (queriesDebounce)
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      });
    else
      navigate({
        pathname: location.pathname,
      });
  }, [queriesDebounce]);
  // RENDER USERS
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort) queries.sort = sort;
    fetchUsers(queries);
    window.scrollTo(0, 0);
  }, [params, update, sort]);

  return (
    <div className="w-full">
      {/* UPDATE USER */}
      {editElm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
          <div className="bg-white flex flex-col gap-4 p-4 items-center justify-center rounded-md relative animate-scale-in-center">
            <span
              onClick={() => setEditElm(null)}
              className="absolute top-1 right-1 text-2xl cursor-pointer"
            >
              <IoMdClose />
            </span>
            <EditUserAdmin
              dataUser={editElm}
              register={register}
              errors={errors}
              isDirty={isDirty}
              handleUpdate={handleUpdate}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">Quản lý tài khoản người dùng</span>
        </h1>
      </div>
      <div className="w-full py-4 px-10">
        <div className="flex justify-between py-4">
          <div className="flex items-center justify-center text-2xl">
            {users?.usersData.length > 0 && (
              <>
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
              </>
            )}
          </div>
          <div className="w-2/5 relative">
            <InputField
              value={queries.q}
              nameKey={"q"}
              setValue={setQueries}
              placeholder={"Tìm kiếm theo tên hoặc email người dùng..."}
              classInput={"input-bordered pr-7"}
              isShowLable
            />
            {queries.q.length > 0 && (
              <span
                className="absolute top-3 right-1 text-2xl cursor-pointer"
                onClick={() => setQueries({ q: "" })}
              >
                <IoMdClose />
              </span>
            )}
          </div>
        </div>
        {users?.usersData.length > 0 && (
          <table className="table table-zebra mb-5 bg-slate-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th>#</th>
                <th>Email address</th>
                <th>Full name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>CreateAt</th>
                <th>UpdatedAt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.usersData?.map((el, idx) => (
                <tr key={el._id}>
                  <td>
                    <span>{idx + 1}</span>
                  </td>
                  <td>
                    <span className="line-clamp-1">{el.email}</span>
                  </td>
                  <td className="flex gap-2 items-center">
                    <img
                      src={el.avatar || Avatar}
                      alt={`${el.firstName}-${el.lastName}-avatar`}
                      className={`w-10 h-10 rounded-full object-contain p-[2px] border ${
                        el.isBlocked ? "border-red-500" : "border-green-500"
                      }`}
                    />
                    <span className="line-clamp-1">{`${el.firstName} ${el.lastName}`}</span>
                  </td>
                  <td>
                    <span>
                      {roles?.find((role) => +role.code === +el.role)?.value}
                    </span>
                  </td>
                  <td>{el.phone}</td>
                  <td
                    className={`${
                      el.isBlocked
                        ? "w-[87px] text-red-500"
                        : "w-[87px] text-green-500"
                    }`}
                  >
                    <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                  </td>
                  <td>
                    <span>
                      {moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td>
                    <span>
                      {moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td className="flex gap-2 capitalize text-blue-500">
                    <span
                      onClick={() => setEditElm(el)}
                      title="Sửa tài khoản"
                      className="hover:underline cursor-pointer text-lg text-yellow-500"
                    >
                      <LuEdit />
                    </span>
                    <span
                      className="hover:underline cursor-pointer text-lg text-main"
                      onClick={() => handleDelete(el)}
                      title="Xóa tài khoản"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {users?.usersData.length <= 0 && (
          <div className="flex flex-col gap-5 justify-center items-center p-20">
            <img
              src={NoUser}
              alt="No Product"
              className="w-[300px] object-contain opacity-60"
            />
            <span className="text-xl font-semibold opacity-60">No User</span>
          </div>
        )}
        {users?.counts > +process.env.REACT_APP_LIMIT && (
          <Pagination totalCount={users?.counts} />
        )}
      </div>
    </div>
  );
};

export default withBase(ManageUser);
