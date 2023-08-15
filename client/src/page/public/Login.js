import React, { useCallback, useState } from "react";
import { Button, InputField } from "../../components";
import * as apis from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import Logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helpers";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  //SUBMIT
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payLoad;
    const invalids = isRegister
      ? validate(payLoad, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        const response = await apis.apiRegister(payLoad);
        if (response.success)
          Swal.fire("Congratulations", response.mes, "success").then(() => {
            setIsRegister(false);
            resetPayload();
          });
        else Swal.fire("Oops!", response.mes, "error");
      } else {
        const response = await apis.apiLogin(data);
        if (response.success)
          Swal.fire("Congratulations", "Login is successfully", "success").then(
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
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apis.apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
      setIsForgotPassword(false);
      resetPayload();
      setEmail("");
    } else toast.error(response.mes, { theme: "colored" });
  };
  return (
    <div className="w-screen h-screen relative">
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
                  onFocus={() => setInvalidFields([])}
                />
                {invalidFields?.some((el) => el.name === email) && (
                  <small className="text-main px-2 text-[10px] italic">
                    {invalidFields?.find((el) => el.name === email)?.mes}
                  </small>
                )}
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
                  />
                  <InputField
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    value={payLoad.lastName}
                    setValue={setPayLoad}
                    nameKey={"lastName"}
                  />
                </div>
                <InputField
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  value={payLoad.phone}
                  setValue={setPayLoad}
                  nameKey={"phone"}
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
            />
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              type={"password"}
              value={payLoad.password}
              setValue={setPayLoad}
              nameKey={"password"}
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
