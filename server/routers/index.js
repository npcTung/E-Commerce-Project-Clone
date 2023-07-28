const userRouter = require("./user");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRouter = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
