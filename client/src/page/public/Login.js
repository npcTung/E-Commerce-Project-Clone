import React, { useCallback, useState } from "react";
import { Button, InputField } from "../../components";
import * as apis from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

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

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payLoad;
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
              register({
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
  }, [payLoad, isRegister]);
  return (
    <div className="w-screen h-screen relative">
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
                    value={payLoad.firstName}
                    setValue={setPayLoad}
                    nameKey={"firstName"}
                  />
                  <InputField
                    value={payLoad.lastName}
                    setValue={setPayLoad}
                    nameKey={"lastName"}
                  />
                </div>
                <InputField
                  value={payLoad.phone}
                  setValue={setPayLoad}
                  nameKey={"phone"}
                />
              </>
            )}
            <InputField
              type={"email"}
              value={payLoad.email}
              setValue={setPayLoad}
              nameKey={"email"}
            />
            <InputField
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
                    }}
                  >
                    Click here
                  </span>{" "}
                  to login
                </span>
              ) : (
                <>
                  <span className="hover:text-main transition-all cursor-pointer">
                    Forgot your password ?
                  </span>
                  <span
                    className="hover:text-main transition-all cursor-pointer"
                    onClick={() => {
                      setIsRegister(true);
                      resetPayload();
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
