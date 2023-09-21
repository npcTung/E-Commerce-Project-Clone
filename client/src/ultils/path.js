const path = {
  // PUBLIC
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  CHECKOUT: "check-out",
  // ADMIN
  ADMIN: "admin",
  DASH_BOARD: "dash-board",
  MANAGER_USER: "manager-user",
  MANAGER_PRODUCT: "manager-product",
  MANAGER_ORDER: "manager-order",
  CREATE_PRODUCT: "create-product",
  // MEMBER
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISHLIST: "wishlist",
};

export default path;
