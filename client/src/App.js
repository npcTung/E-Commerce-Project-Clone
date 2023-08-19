import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  DetailProduct,
  Blogs,
  Services,
  FAQ,
  FinalRegister,
  ResetPassword,
} from "./page/public";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getCurrent } from "./store/user/asyncActions";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories());
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);
  }, [dispatch, isLoggedIn]);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FAQS} element={<FAQ />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
