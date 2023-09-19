import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import * as apis from "apis";
import {
  Breadcrumbs,
  Button,
  Cart,
  CustomSlider,
  ProductInfomation,
  SelectQuantity,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { renderStarFromNumber, formatMoney } from "ultils/helpers";
import icons from "ultils/icons";
import { productInfo } from "ultils/contants";
import DOMPurify from "dompurify";
import NoImg from "assets/logo-image.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/asyncActions";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import path from "ultils/path";

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

const DetailProduct = ({ dispatch, navigate, location }) => {
  const { pid, category } = useParams();
  const { currentData } = useSelector((state) => state.user);
  const [productData, setProductData] = useState(null);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageBig, setImageBig] = useState("");
  const [update, setUpdate] = useState(false);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    thumb: "",
    images: [],
    price: null,
    quantity: null,
    sold: null,
    color: "",
  });
  // PRODUCT DETAIL
  const fetchProductData = async () => {
    const response = await apis.apiGetProduct(pid);
    if (response.success) setProductData(response.productData);
  };
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
      if (+productData?.quantity === 0) return;
      else {
        if (flag === "minus" && quantity === 1) return;
        else if (flag === "plus" && quantity >= productData?.quantity) return;
        else if (flag === "minus") setQuantity((prev) => +prev - 1);
        else if (flag === "plus") setQuantity((prev) => +prev + 1);
      }
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
  // ADD TO CART
  const handleAddToCart = async () => {
    if (!currentData)
      Swal.fire({
        text: "Đăng nhập trước khi thực hiện thao tác này",
        title: "Almost...",
        icon: "info",
        cancelButtonText: "Không",
        cancelButtonColor: "#ee3131",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    else {
      const response = await apis.apiUpdateCart({
        pid,
        color: currentProduct.color || productData.color,
        price: currentProduct.price || productData.price,
        thumb: currentProduct.thumb || productData.thumb,
        quantity,
      });
      if (response.success) {
        toast.success("Thêm vào giỏ hành thành công", { theme: "colored" });
        dispatch(getCurrent());
        dispatch(showModal({ isShowModal: true, modalChildren: <Cart /> }));
      } else toast.error(response.mes, { theme: "colored" });
    }
  };
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
      setImageBig(
        productData?.varriants?.find((el) => el._id === varriant)?.thumb ||
          productData?.thumb
      );
    } else {
      setCurrentProduct({
        thumb: productData?.thumb,
        color: productData?.color,
        images: productData?.images || [],
        price: productData?.price,
        quantity: productData?.quantity,
        sold: productData?.sold,
      });
      setImageBig(productData?.thumb);
    }
  }, [varriant]);

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
          <div className="border flex items-center">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: productData?.title,
                  isFluidWidth: true,
                  src: imageBig || currentProduct.thumb || productData?.thumb,
                },
                largeImage: {
                  src: imageBig || currentProduct.thumb || productData?.thumb,
                  width: 1000,
                  height: 1000,
                },
              }}
            />
          </div>
          {productData?.images?.length > 0 && (
            <div className="w-full">
              <Slider className="image-slider" {...settings}>
                <div
                  className="w-full px-2 cursor-pointer"
                  onClick={() =>
                    setImageBig(currentProduct.thumb || productData?.thumb)
                  }
                >
                  <img
                    src={currentProduct.thumb || productData?.thumb || NoImg}
                    alt={productData?.title}
                    className="w-[143px] h-[143px] object-contain border p-2"
                  />
                </div>
                {!varriant
                  ? productData?.images?.map((el, index) => (
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
                    ))
                  : currentProduct?.images?.map((el) => (
                      <div
                        key={varriant}
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
              currentProduct.price || productData?.price
            )} VND `}</h1>
            <span className="flex flex-col items-end">
              <span className="text-sm text-red-400">{`Kho: ${
                varriant ? currentProduct?.quantity : productData?.quantity
              }`}</span>
              <span className="text-sm text-red-400">{`Đã bán: ${
                varriant ? currentProduct?.sold : productData?.sold
              }`}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex gap-1 text-yellow-500">
              {renderStarFromNumber(productData?.totalRatings)}
            </span>
            {productData?.ratings.length > 0 && (
              <span className="text-sm text-gray-400">{`${productData?.ratings.length} reviews`}</span>
            )}
          </div>
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
          <div className="flex flex-col gap-4">
            {productData?.color?.length > 0 && (
              <div className="flex justify-start gap-4">
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
            )}
            <div className="flex items-center gap-5">
              <span className="font-medium">Quantity:</span>
              <SelectQuantity
                quantity={quantity}
                handaleQuantity={handaleQuantity}
                handaleChargeQuantity={handaleChargeQuantity}
                quantityProduct={
                  varriant ? currentProduct.quantity : productData?.quantity
                }
              />
            </div>
          </div>
          <Button
            wf
            name={"thêm vào giỏ hàng"}
            styles={
              ((varriant && currentProduct.quantity === 0) ||
                productData?.quantity === 0) &&
              "btn-disabled"
            }
            handleOnClick={() => handleAddToCart()}
          />
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

export default withBase(DetailProduct);
