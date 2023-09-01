import React, { useCallback, useState } from "react";
import { Button, InputField, Loading } from "components";
import * as apis from "apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "ultils/path";
import { login } from "store/user/userSlice";
import { useDispatch } from "react-redux";
import Logo from "assets/logo.png";
import { toast } from "react-toastify";
import { validate } from "ultils/helpers";
import icons from "ultils/icons";
import { showModal } from "store/app/appSlice";

const { IoMdClose } = icons;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [payLoad, setPayLoad] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const resetPayload = () => {
    setPayLoad({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };
  //SUBMIT LOGIN/REGISTER
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payLoad;
    const invalids = isRegister
      ? validate(payLoad, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apis.apiRegister(payLoad);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) setIsVerifiedEmail(true);
        else Swal.fire("Oops!", response.mes, "error");
      } else {
        const response = await apis.apiLogin(data);
        if (response.success)
          Swal.fire("Congratulations", "Đăng nhập thành công", "success").then(
            () => {
              dispatch(
                login({
                  isLoggedIn: true,
                  token: response.accessToken,
                  userData: response.userData,
                })
              );
              navigate(`/${path.HOME}`);
            }
          );
        else Swal.fire("Oops!", response.mes, "error");
      }
    }
  }, [payLoad, isRegister, dispatch, navigate]);
  //SUBMIT FORGOT PASSWORD
  const handleForgotPassword = async () => {
    const response = await apis.apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
      setIsForgotPassword(false);
      resetPayload();
      setEmail("");
    } else toast.error(response.mes, { theme: "colored" });
  };
  //SUBMIT FINAL REGISTER
  const finalregister = async () => {
    const response = await apis.apiFinalRegister(code);
    if (response.success)
      Swal.fire("Congratulations", response.mes, "success").then(() => {
        setIsRegister(false);
        resetPayload();
        setIsVerifiedEmail(false);
        setCode("");
      });
    else Swal.fire("Oop!", response.mes, "error");
  };
  // EVENT ONBLUR
  const eventOnBlur = () => {
    const { firstName, lastName, phone, ...data } = payLoad;
    isRegister
      ? validate(payLoad, setInvalidFields)
      : validate(data, setInvalidFields);
  };
  return (
    <div className="w-screen h-screen relative">
      {/* {FINAL REGISTER} */}
      {isVerifiedEmail && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-[rgba(0,0,0,0.5)] z-10">
          <div className="w-[500px] mx-auto bg-white rounded-md">
            <h1 className="uppercase p-4 bg-main text-white rounded-t-md font-medium flex justify-between">
              <span></span>
              <span>mã xác nhận</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setIsVerifiedEmail(false);
                  setCode("");
                }}
              >
                <IoMdClose size={20} />
              </span>
            </h1>
            <div className="p-10 flex flex-col gap-10">
              <span className="text-gray-400">
                Chúng tôi đã gửi một mã đến email của bạn. Vui lòng kiểm tra
                email của bạn và nhập mã của bạn.
                <br />
                <strong className="font-medium text-blue-400 line-through">
                  {payLoad.email}
                </strong>
              </span>
              <input
                type="text"
                name="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Mã xác nhận"
                className="input input-bordered bg-gray-100 w-full"
              />
              <Button name={"gửi"} wf handleOnClick={finalregister} />
            </div>
          </div>
        </div>
      )}
      {/* FORGOT PASSWORD */}
      {isForgotPassword && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-50 flex justify-center py-8 z-10">
          <div className="w-[900px] my-auto">
            <div className="flex justify-between mb-10">
              <img
                src={Logo}
                alt="Logo"
                className="w-[234px] object-contain cursor-pointer"
                onClick={() => {
                  navigate(`/${path.HOME}`);
                }}
              />
              <span
                className="text-blue-500 capitalize hover:text-main transition-all cursor-pointer"
                onClick={() => {
                  setIsForgotPassword(false);
                  setEmail("");
                  setInvalidFields([]);
                }}
              >
                quay lại trang đăng nhập
              </span>
            </div>
            <div className="border rounded-md bg-white pb-20">
              <h1 className="p-4 uppercase text-xl text-center bg-main text-white rounded-t-md">
                quên mật khẩu
              </h1>
              <div className="flex flex-col gap-10 p-4 w-3/5 mx-auto">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Nhập email người dùng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered bg-gray-100 w-full mt-20"
                />
                <Button
                  name="Gửi"
                  wf
                  handleOnClick={handleForgotPassword}
                  styles="shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* LOGIN/REGISTER */}
      <img
        src="https://img.freepik.com/premium-photo/shopping-cart-icon-discounts_116441-26066.jpg"
        alt={`${isRegister ? "register" : "login"}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 bottom-0 right-1/2 flex items-center justify-center ">
        <div className="p-8 bg-white rounded-md min-w-[500px]">
          <h1 className="text-3xl font-semibold uppercase text-center text-main mb-10">
            {isRegister ? "register" : "login"}
          </h1>
          <div className="w-full flex flex-col gap-5">
            {isRegister && (
              <>
                <div className="flex items-center gap-4">
                  <InputField
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    value={payLoad.firstName}
                    setValue={setPayLoad}
                    nameKey={"firstName"}
                    handleEnter={handleSubmit}
                    eventOnBlur={eventOnBlur}
                    wf
                  />
                  <InputField
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    value={payLoad.lastName}
                    setValue={setPayLoad}
                    nameKey={"lastName"}
                    handleEnter={handleSubmit}
                    eventOnBlur={eventOnBlur}
                    wf
                  />
                </div>
                <InputField
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  value={payLoad.phone}
                  setValue={setPayLoad}
                  nameKey={"phone"}
                  handleEnter={handleSubmit}
                  eventOnBlur={eventOnBlur}
                  wf
                />
              </>
            )}
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              type={"email"}
              value={payLoad.email}
              setValue={setPayLoad}
              nameKey={"email"}
              handleEnter={handleSubmit}
              eventOnBlur={eventOnBlur}
              wf
            />
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              type={"password"}
              value={payLoad.password}
              setValue={setPayLoad}
              nameKey={"password"}
              handleEnter={handleSubmit}
              eventOnBlur={eventOnBlur}
              wf
            />
            <Button
              name={isRegister ? "sign up" : "sign in"}
              handleOnClick={handleSubmit}
              wf
            />
            <span className="flex items-center justify-between text-sm">
              {isRegister ? (
                <span>
                  Are you already have an account?{" "}
                  <span
                    className="text-blue-500 hover:text-main transition-all cursor-pointer"
                    onClick={() => {
                      setIsRegister(false);
                      resetPayload();
                      setInvalidFields([]);
                    }}
                  >
                    Click here
                  </span>{" "}
                  to login
                </span>
              ) : (
                <>
                  <span
                    className="hover:text-main transition-all cursor-pointer"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setInvalidFields([]);
                    }}
                  >
                    Forgot your password ?
                  </span>
                  <span
                    className="hover:text-main transition-all cursor-pointer"
                    onClick={() => {
                      setIsRegister(true);
                      resetPayload();
                      setInvalidFields([]);
                    }}
                  >
                    Create Account
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
