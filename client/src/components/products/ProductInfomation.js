import React, { memo, useCallback, useState } from "react";
import { Sideways } from "ultils/contants";
import { VoteBar, VoteOption, Button, Comment } from "components";
import { renderStarFromNumber } from "ultils/helpers";
import * as apis from "apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "ultils/path";

const ProductInfomation = ({
  description,
  ratings,
  nameProduct,
  totalRating,
  pid,
  rerender,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activedTab, setActivedTab] = useState(1);
  const { isLoggedIn } = useSelector((state) => state.user);
  // CALL API VOTE PRODUCT
  const handleSubmitVoteOption = useCallback(async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      toast.error("Please vote when click submit", { theme: "colored" });
      return;
    }
    const response = await apis.apiRatings({
      star: score,
      comment,
      pid,
      updatedAt: Date.now(),
    });
    if (response.success)
      Swal.fire("Successfully submitted", "Vote thành công", "success").then(
        () => {
          dispatch(
            showModal({
              isShowModal: false,
              modalChildren: null,
            })
          );
          rerender();
        }
      );
    else Swal.fire("Oops!", "Có lỗi gì đó đã phát sing", "error");
  }, []);
  // CHECK VOTE
  const handleVoteNow = () => {
    if (!isLoggedIn)
      Swal.fire({
        text: "Đăng nhập trước khi vote",
        showCancelButton: true,
        cancelButtonColor: "#ee3131",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đăng nhập",
        title: "Oops!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    else
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 relative -bottom-[1px]">
        {Sideways?.map((el) => (
          <span
            key={el.id}
            className={`px-6 py-2 text-[15px] uppercase ${
              activedTab === el.id
                ? "bg-white"
                : "bg-[#f1f1f1] hover:bg-white transition-all"
            } cursor-pointer border border-b-0`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.title}
          </span>
        ))}
        <span
          className={`px-6 py-2 text-[15px] uppercase ${
            activedTab === 5
              ? "bg-white"
              : "bg-[#f1f1f1] hover:bg-white transition-all"
          } cursor-pointer border border-b-0`}
          onClick={() => setActivedTab(5)}
        >
          phản hồi khách hàng
        </span>
      </div>
      <div className="border p-4">
        <div className="w-full">
          {activedTab === 1 && (
            <ul className="list-item list-disc ml-5 text-sm">
              {description?.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          )}
          {Sideways.some((el) => el.id === activedTab) && (
            <div className="w-full flex flex-col gap-5">
              {Sideways.find((el) => el.id === activedTab)?.content.length >
                0 && (
                <h3 className="uppercase text-xl font-semibold">
                  {Sideways.find((el) => el.id === activedTab)?.header}
                </h3>
              )}
              <span>
                {Sideways.find((el) => el.id === activedTab)?.content}
              </span>
            </div>
          )}
          {activedTab === 5 && (
            <div className="w-full flex flex-col gap-5">
              <h3 className="uppercase text-xl font-semibold">
                phản hồi khách hàng
              </h3>
              <div className="flex">
                <div className="flex-4 flex flex-col gap-2 justify-center items-center p-4 border border-r-0 rounded-l-lg">
                  <span className="text-xl font-semibold">{`${totalRating}/5`}</span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    {renderStarFromNumber(totalRating)}
                  </span>
                  <span>{`${ratings?.length} đánh giá và nhận xét`}</span>
                </div>
                <div className="flex-6 p-4 border rounded-r-lg">
                  {Array.from(Array(5).keys())
                    .reverse()
                    .map((el) => (
                      <VoteBar
                        key={el}
                        number={el + 1}
                        ratingTotal={ratings?.length}
                        ratingCount={
                          ratings?.filter((i) => i.star === el + 1)?.length
                        }
                      />
                    ))}
                </div>
              </div>
              <div className="w-[30%] flex flex-col items-center gap-2 mx-auto">
                <span>Bạn đánh giá sao sản phẩm này?</span>
                <Button
                  name={"đánh giá ngay"}
                  handleOnClick={handleVoteNow}
                  wf
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                {ratings
                  ?.filter((el) => el.postedBy !== null)
                  ?.map((el) => (
                    <Comment
                      key={el._id}
                      star={el.star}
                      updatedAt={el.updatedAt}
                      comment={el.comment}
                      name={el.postedBy.firstName + " " + el.postedBy.lastName}
                      image={el.postedBy.avatar}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
