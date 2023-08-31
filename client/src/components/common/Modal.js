import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-20 flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
