import path from "./path";
import icons from "./icons";

// ICONS
const {
  FaShieldAlt,
  MdLocalShipping,
  FaGift,
  GiReturnArrow,
  FaBlenderPhone,
  BsStarFill,
  BsStar,
  AiOutlineDashboard,
  MdGroups,
  TbBrandProducthunt,
  RiBillLine,
  MdOutlineCreate,
  GiSmartphone,
  AiOutlineLaptop,
  SlEarphones,
  LiaCameraRetroSolid,
  SlScreenDesktop,
  CiSpeaker,
  TfiPrinter,
  TfiTablet,
} = icons;

// NAVIGATION
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
// PRODUCT INFO
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
// SIDEWAYS
export const Sideways = [
  {
    id: 1,
    title: "miêu tả",
    header: "miêu tả",
    content: [],
  },
  {
    id: 2,
    title: "bảo hành",
    header: "thông tin bảo hành",
    content: [
      "limited warranties",
      "Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:",
      "Frames Used In Upholstered and Leather Products",
      "Limited Lifetime Warranty",
      "A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.",
    ],
  },
  {
    id: 3,
    title: "vận chuyển",
    header: "mua hàng và giao hàng",
    content: [
      "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.",
      "Picking up at the store",
      "Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.",
      "Delivery",
      "Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.",
      "In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
    ],
  },
  {
    id: 4,
    title: "thanh toán",
    header: "mua hàng và giao hàng",
    content: [
      "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.",
      "Picking up at the store",
      "Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.",
      "Delivery",
      "Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.",
      "In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
    ],
  },
];
// COLORS
export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];
// SORTS
export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "price",
    text: "Price, low to high",
  },
  {
    id: 5,
    value: "-price",
    text: "Price, high to low",
  },
  {
    id: 6,
    value: "createdAt",
    text: "Date, old to new",
  },
  {
    id: 7,
    value: "-createdAt",
    text: "Date, new to old",
  },
];
// RATINGS
export const ratings = [
  {
    id: 1,
    title: "Rất tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 2,
    title: "Tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 3,
    title: "Bình thường",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 4,
    title: "Tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 5,
    title: "Rất tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
];
// ADMIN SIDEBAR
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Bảng điều khiển",
    path: `/${path.ADMIN}/${path.DASH_BOARD}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Quản lý tài khoản người dùng",
    path: `/${path.ADMIN}/${path.MANAGER_USER}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "PAREMT",
    text: "Quản lý sản phẩm",
    icon: <TbBrandProducthunt />,
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
        subIcon: <MdOutlineCreate />,
      },
      {
        text: "Quản lý sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
        subIcon: <TbBrandProducthunt />,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Quản lý đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGER_ORDER}`,
    icon: <RiBillLine />,
  },
];
// ROLES
export const roles = [
  {
    code: "2002",
    value: "Admin",
  },
  {
    code: "2023",
    value: "User",
  },
];
// BLOCK STATUS
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
// SIDER BAR
export const siderBar = [
  {
    id: 1,
    title: "Smartphone",
    icons: <GiSmartphone />,
  },
  {
    id: 2,
    title: "Laptop",
    icons: <AiOutlineLaptop />,
  },
  {
    id: 3,
    title: "Accessories",
    icons: <SlEarphones />,
  },
  {
    id: 4,
    title: "Camera",
    icons: <LiaCameraRetroSolid />,
  },
  {
    id: 5,
    title: "Television",
    icons: <SlScreenDesktop />,
  },
  {
    id: 6,
    title: "Speaker",
    icons: <CiSpeaker />,
  },
  {
    id: 7,
    title: "Printer",
    icons: <TfiPrinter />,
  },
  {
    id: 8,
    title: "Tablet",
    icons: <TfiTablet />,
  },
];
