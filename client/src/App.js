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
} from "page/public";
import {
  Admin,
  CreateProduct,
  DashBoard,
  ManageOrder,
  ManageProduct,
  ManageUser,
} from "page/admin";
import { History, Member, MyCart, Personal, WishList } from "page/member";
import path from "ultils/path";
import { getCategories } from "store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { Modal } from "components";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isShowModal, modalChildren } = useSelector((state) => state.app);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(getCategories());
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);
    return () => clearTimeout(setTimeoutId);
  }, [isLoggedIn]);

  return (
    <div className="font-main">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        {/* PUBLIC */}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.ALL} element={<Home />} />
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
        {/* LOGIN/REGISTER */}
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        {/* ADMIN */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.DASH_BOARD} element={<DashBoard />} />
          <Route path={path.MANAGER_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGER_USER} element={<ManageUser />} />
          <Route path={path.MANAGER_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        {/* MEMBER */}
        <Route path={path.MEMBER} element={<Member />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<WishList />} />
        </Route>
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
