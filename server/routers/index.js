const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/product-category", productCategoryRouter);
  app.use("/api/blog-category", blogCategoryRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
