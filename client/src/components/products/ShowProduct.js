import React, { memo, useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import NoImg from "assets/logo-image.png";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button, SelectQuantity } from "components";
import { formatMoney } from "ultils/helpers";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const ShowProduct = ({ productData, dispatch }) => {
  const [preview, setPreview] = useState(productData?.thumb || NoImg);
  const [quantity, setQuantity] = useState(1);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    thumb: "",
    images: [],
    price: null,
    quantity: null,
    sold: null,
    color: "",
  });
  // RESET VARRIANT
  const resetVarriant = () =>
    setCurrentProduct({
      thumb: "",
      images: [],
      price: 0,
      quantity: 0,
      sold: 0,
      color: "",
    });
  // QUANTITY
  const handaleQuantity = useCallback(
    (number) => {
      if (Number(number) > 1 && Number(number) <= +productData?.quantity)
        setQuantity(number);
    },
    [quantity]
  );
  // CHARGE QUANTITY
  const handaleChargeQuantity = useCallback(
    (flag) => {
      if (productData?.quantity === 0) return;
      else {
        if (flag === "minus" && quantity === 1) return;
        else if (flag === "plus" && quantity >= productData?.quantity) return;
        else if (flag === "minus") setQuantity((prev) => +prev - 1);
        else if (flag === "plus") setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );
  // RENDER CURRENT PRODUCT VARRIANT
  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        thumb: productData?.varriants?.find((el) => el._id === varriant)?.thumb,
        color: productData?.varriants?.find((el) => el._id === varriant)?.color,
        images: productData?.varriants?.find((el) => el._id === varriant)
          ?.images,
        price: productData?.varriants?.find((el) => el._id === varriant)?.price,
        quantity: productData?.varriants?.find((el) => el._id === varriant)
          ?.quantity,
        sold: productData?.varriants?.find((el) => el._id === varriant)?.sold,
      });
      setPreview(
        productData?.varriants?.find((el) => el._id === varriant)?.thumb ||
          productData?.thumb
      );
    } else {
      resetVarriant();
      setPreview(productData?.thumb);
    }
  }, [varriant]);

  return (
    <div
      className="w-[800px] h-[500px] bg-white flex justify-between gap-3 rounded-md animate-scale-in-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-1/2 grid grid-rows-3 grid-cols-1">
        <div className="py-2 row-span-2 col-span-1">
          <img
            src={preview}
            alt={productData.title}
            className="w-full h-full object-contain"
          />
        </div>
        {productData?.images?.length > 0 && (
          <div className="p-2 row-span-1 col-span-1">
            <Slider {...settings} className="image-slider">
              <div
                className="cursor-pointer px-2"
                onClick={() =>
                  setPreview(currentProduct.thumb || productData?.thumb)
                }
              >
                <img
                  src={currentProduct.thumb || productData?.thumb || NoImg}
                  alt={productData?.title}
                  className="w-[143px] h-[143px] object-contain border p-2"
                />
              </div>
              {!varriant
                ? productData?.images?.map((el, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer px-2"
                      onClick={() => setPreview(el)}
                    >
                      <img
                        src={el}
                        alt={productData?.title}
                        className="w-[143px] h-[143px] object-contain border p-2"
                      />
                    </div>
                  ))
                : currentProduct?.images?.map((el) => (
                    <div
                      key={varriant}
                      className="px-2 cursor-pointer"
                      onClick={() => setPreview(el)}
                    >
                      <img
                        src={el}
                        alt={productData?.title}
                        className="w-[143px] h-[143px] object-contain border p-2"
                      />
                    </div>
                  ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="w-1/2 p-2 grid grid-cols-1 grid-rows-[10] gap-6">
        <div className="col-span-1 row-span-1 flex justify-between">
          <Link
            to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.slug
            }`}
            className="text-2xl font-semibold uppercase hover:text-main transition-all"
            onClick={() =>
              dispatch(
                showModal({
                  isShowModal: false,
                  modalChildren: null,
                })
              )
            }
          >
            {productData?.title}
          </Link>
          <span className="flex flex-col gap2">
            <span className="text-sm text-red-400 whitespace-nowrap">{`Kho: ${
              varriant ? currentProduct?.quantity : productData?.quantity
            }`}</span>
            <span className="text-sm text-red-400 whitespace-nowrap">{`Đã bán: ${
              varriant ? currentProduct?.sold : productData?.sold
            }`}</span>
          </span>
        </div>
        <div className="col-span-1 row-span-5 overflow-y-scroll">
          {productData?.description.length > 1 && (
            <ul className="list-item list-square mx-4">
              {productData?.description?.map((el, index) => (
                <li key={index} className="text-sm">
                  {el}
                </li>
              ))}
            </ul>
          )}
          {productData?.description.length === 1 && (
            <div
              className="text-sm flex flex-col gap-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData?.description[0]),
              }}
            />
          )}
        </div>
        <div className="col-span-1 row-span-1 text-2xl font-semibold">
          {`${formatMoney(productData?.price)} VND`}
        </div>
        <div className="col-span-1 row-span-1 flex gap-2">
          <span className="font-medium">Quantity:</span>
          <SelectQuantity
            quantity={quantity}
            handaleQuantity={handaleQuantity}
            handaleChargeQuantity={handaleChargeQuantity}
            quantityProduct={productData?.quantity}
          />
        </div>
        <div className="col-span-1 row-span-1 flex gap-2">
          {productData?.color && (
            <>
              <span className="font-medium">Color: </span>
              <span
                onClick={() => {
                  setVarriant(null);
                  setQuantity(1);
                }}
                className={`p-2 border ${
                  !varriant ? "border-main text-main" : "border-gray-500"
                } cursor-pointer uppercase`}
              >
                {productData?.color}
              </span>
            </>
          )}
          {productData?.varriants?.map((el) => (
            <span
              key={el._id}
              onClick={() => {
                setVarriant(el._id);
                setQuantity(1);
              }}
              className={`p-2 border ${
                varriant === el._id
                  ? "border-main text-main"
                  : "border-gray-500"
              } cursor-pointer uppercase`}
            >
              {el.color}
            </span>
          ))}
        </div>
        <div className="col-span-1 row-span-1">
          <Button wf name={"Thêm vào giỏ hàng"} />
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(ShowProduct));
