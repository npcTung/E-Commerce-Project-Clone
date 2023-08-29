import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "apis";
import {
  Breadcrumbs,
  Button,
  CustomSlider,
  ProductInfomation,
  SelectQuantity,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { renderStarFromNumber, formatMoney } from "ultils/helpers";
import icons from "ultils/icons";
import { productInfo } from "ultils/contants";

// SETTING SLIDER
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
// ICON
const { BiLogoFacebook, AiOutlineTwitter, BiLogoPinterest } = icons;

const DetailProduct = () => {
  const { pid, category } = useParams();
  const [productData, setProductData] = useState(null);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageBig, setImageBig] = useState("");
  const [update, setUpdate] = useState(false);
  // PRODUCT DETAIL
  const fetchProductData = async () => {
    const response = await apis.apiGetProduct(pid);
    if (response.success) setProductData(response.productData);
  };
  // QUANTITY
  const handaleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else setQuantity(number);
    },
    [quantity]
  );
  // CHARGE QUANTITY
  const handaleChargeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      else if (flag === "minus") setQuantity((prev) => +prev - 1);
      else if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  // PRODUCTS
  const fetchProducts = async () => {
    const response = await apis.apiGetProducts({ category });
    if (response.success) setProducts(response.products);
  };
  // RE-UPDATING DATA
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // USEEFFECT PRODUCT DATA
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [pid]);
  // USEEFFECT RE-UPDATING DATA
  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  return (
    <div className="w-full">
      <div className="bg-red-50 p-4">
        <div className="w-main mx-auto flex flex-col gap-4">
          <h1 className="capitalize text-xl font-semibold">
            {productData?.title}
          </h1>
          <Breadcrumbs title={productData?.title} category={category} />
        </div>
      </div>
      <div className="w-main mx-auto flex gap-4 mt-5">
        <div className="w-[35%] flex flex-col gap-4">
          <div className="border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: productData?.title,
                  isFluidWidth: true,
                  src: imageBig || productData?.thumb,
                },
                largeImage: {
                  src: imageBig || productData?.thumb,
                  width: 1000,
                  height: 1000,
                },
              }}
            />
          </div>
          {productData?.images?.length > 0 && (
            <div className="w-full">
              <Slider className="image-slider" {...settings}>
                {productData?.images?.map((el, index) => (
                  <div
                    key={index}
                    className="w-full px-2 cursor-pointer"
                    onClick={() => setImageBig(el)}
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
        <div className="w-[40%] flex flex-col gap-5 px-5">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">{`${formatMoney(
              productData?.price
            )} VND `}</h1>
            <span className="flex flex-col items-end">
              <span className="text-sm text-red-400">{`Kho: ${productData?.sold}`}</span>
              <span className="text-sm text-red-400">{`Đã bán: ${productData?.quantity}`}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex gap-1 text-yellow-500">
              {renderStarFromNumber(productData?.totalRatings)}
            </span>
            {productData?.totalRatings > 0 && (
              <span className="text-sm text-gray-400">{`${productData?.totalRatings} reviews`}</span>
            )}
          </div>
          <ul className="list-item list-square mx-4">
            {productData?.description?.map((el, index) => (
              <li key={index} className="text-sm">
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <span className="font-medium">Internal</span>
            <span className="font-medium">Color</span>
            <span className="font-medium">Ram</span>
            <div className="flex items-center gap-5">
              <span className="font-medium">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handaleQuantity={handaleQuantity}
                handaleChargeQuantity={handaleChargeQuantity}
              />
            </div>
          </div>
          <Button wf name={"add to cart"} />
          <div className="flex gap-3">
            <span className="text-xl p-2 rounded-full bg-black text-white hover:opacity-60 transition-all cursor-pointer">
              <BiLogoFacebook />
            </span>
            <span className="text-xl p-2 rounded-full bg-black text-white hover:opacity-60 transition-all cursor-pointer">
              <AiOutlineTwitter />
            </span>
            <span className="text-xl p-2 rounded-full bg-black text-white hover:opacity-60 transition-all cursor-pointer">
              <BiLogoPinterest />
            </span>
          </div>
        </div>
        <div className="flex-auto flex flex-col gap-4">
          {productInfo.map((el) => (
            <div key={el.id} className="flex p-2 border items-center gap-4">
              <span className="text-xl p-2 rounded-full bg-black text-white opacity-60">
                {el.icon}
              </span>
              <span className="flex flex-col capitalize">
                <span className="font-medium">{el.detail}</span>
                <span className="text-sm text-gray-400">{el.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-main mx-auto mt-5">
        <ProductInfomation
          description={productData?.description}
          totalRating={productData?.totalRatings}
          ratings={productData?.ratings}
          nameProduct={productData?.title}
          pid={pid}
          rerender={rerender}
        />
      </div>
      <div className="w-main mx-auto mt-5">
        <div className="border-b-2 border-main py-4 flex items-center justify-between">
          <span className="text-xl uppercase font-semibold">
            orther customers also buy:
          </span>
        </div>
        <div className="my-10">
          <CustomSlider product={products} normal={true} />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
