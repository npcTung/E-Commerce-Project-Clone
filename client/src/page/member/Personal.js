import React, { useEffect, useState } from "react";
import { Button, InputForm, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import Avatar from "assets/user.png";
import icons from "ultils/icons";
import { toast } from "react-toastify";
import { getBase64 } from "ultils/helpers";
import * as apis from "apis";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";
import { getCurrent } from "store/user/asyncActions";
import withBase from "hocs/withBase";

const { ImUpload } = icons;

const Personal = ({ dispatch }) => {
  const { currentData } = useSelector((state) => state.user);
  const [isShowFile, setIsShowFile] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();
  // FORMAT TIME VI
  const formatTime = (createAt) => {
    moment.locale("vi");
    return moment(createAt).fromNow();
  };
  // UPDATE USER
  const handleUpdateUser = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apis.apiUpdateCurrentUser(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success)
      Swal.fire(
        "Successfully",
        "Cập nhật tài khoản thành công",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    else toast.error(response.mes, { theme: "colored" });
  };
  // AVATAR
  const handleAvatar = async (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      toast.warning(
        "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
        { theme: "colored" }
      );
      return;
    } else {
      const base64Thumb = await getBase64(file);
      setAvatar(base64Thumb);
    }
  };
  // LẤY DỮ LIỆU RENDER RA CLIENT
  useEffect(() => {
    reset({
      firstName: currentData?.firstName || "",
      lastName: currentData?.lastName || "",
      email: currentData?.email || "",
      phone: currentData?.phone || "",
    });
  }, [currentData]);
  // RENDER AVATAR
  useEffect(() => {
    if (watch("avatar") instanceof FileList && watch("avatar").length > 0)
      handleAvatar(watch("avatar")[0]);
  }, [watch("avatar")]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">Thông tin tài khoản của bạn</span>
        </h1>
      </div>
      <div className="w-full p-5">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex items-center gap-5">
            <InputForm
              label={"First Name"}
              register={register}
              id={"firstName"}
              errors={errors}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              classInput={"input-bordered"}
            />
            <InputForm
              label={"Last Name"}
              register={register}
              id={"lastName"}
              errors={errors}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              classInput={"input-bordered"}
            />
          </div>
          <InputForm
            label={"Email address"}
            register={register}
            id={"email"}
            errors={errors}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ.",
              },
            }}
            wf
            classInput={"input-bordered"}
          />
          <InputForm
            label={"Phone"}
            register={register}
            id={"phone"}
            errors={errors}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không hợp lệ.",
              },
            }}
            wf
            classInput={"input-bordered"}
          />
          <div className="w-full flex items-center gap-1">
            <label className="label label-text">Địa chỉ:</label>
            <span className={`font-semibold`}>
              {currentData?.address || "Không có"}
            </span>
          </div>
          <div className="w-full flex items-center gap-1">
            <label className="label label-text">Tình trạng tài khoản:</label>
            <span
              className={`font-semibold ${
                currentData?.isBlocked ? "text-main" : "text-green-500"
              }`}
            >
              {currentData?.isBlocked ? "Blocked" : "Actived"}
            </span>
          </div>
          <div className="w-full flex items-center gap-1">
            <label className="label label-text">Vai trò:</label>
            <span className={`font-semibold`}>
              {+currentData?.role === 2002 ? "Admin" : "User"}
            </span>
          </div>
          <div className="w-full flex items-center gap-1">
            <label className="label label-text">Ngày tạo:</label>
            <span className={`font-semibold`}>
              {moment(currentData?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          </div>
          <div className="w-full flex items-center gap-1">
            <label className="label label-text">Ngày cập nhật:</label>
            <span className={`font-semibold`}>
              {formatTime(currentData?.updatedAt)}
            </span>
          </div>
          <div className="w-full flex justify-between gap-1">
            <label className="">Avatar:</label>
            <label
              htmlFor="avatar"
              className="w-[200px] h-[200px] rounded-full relative"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setIsShowFile(true);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setIsShowFile(false);
              }}
            >
              <img
                src={avatar || currentData?.avatar || Avatar}
                alt={`avatar to ${currentData?.firstName} ${currentData?.lastName}`}
                className="w-[200px] h-[200px] rounded-full object-cover"
              />
              {isShowFile && (
                <span
                  title="Đổi avatar mới"
                  className="absolute text-3xl inset-0 bg-[rgba(0,0,0,0.6)] rounded-full flex items-center justify-center text-white cursor-pointer animate-scale-in-center"
                >
                  <ImUpload />
                </span>
              )}
            </label>
            <input type="file" id="avatar" {...register("avatar")} hidden />
            <div></div>
          </div>
          <Button
            name={"Sửa tài khoản"}
            wf
            type={"submit"}
            styles={`mt-5 ${!isDirty && "btn-disabled"}`}
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(Personal);
