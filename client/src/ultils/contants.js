import path from "./path";
import icons from "./icons";

const { FaShieldAlt, MdLocalShipping, FaGift, GiReturnArrow, FaBlenderPhone } =
  icons;

export const navigation = [
  {
    id: 1,
    value: "home",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "products",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "blogs",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "our services",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "faqs",
    path: `/${path.FAQS}`,
  },
];

export const productInfo = [
  {
    id: 1,
    detail: "guarantee",
    sub: "quality checked",
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    detail: "free shipping",
    sub: "free on all products",
    icon: <MdLocalShipping />,
  },
  {
    id: 3,
    detail: "special gift cards",
    sub: "special gift cards",
    icon: <FaGift />,
  },
  {
    id: 4,
    detail: "free return",
    sub: "within 7 days",
    icon: <GiReturnArrow />,
  },
  {
    id: 5,
    detail: "consultancy",
    sub: "lifetime 24/7/356",
    icon: <FaBlenderPhone />,
  },
];
