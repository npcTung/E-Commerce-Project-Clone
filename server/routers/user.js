const router = require("express").Router();
const userController = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/register", userController.register);
router.post("/mock", userController.createUsers);
router.post("/login", userController.login);
router.get("/current", [verifyAccessToken], userController.getCurrent);
router.post("/refresh-token", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], userController.getUsers);
router.put(
  "/current",
  [verifyAccessToken],
  uploader.single("avatar"),
  userController.updateUser
);
router.put("/address", [verifyAccessToken], userController.updateUserAddress);
router.put("/cart", [verifyAccessToken], userController.updateCart);
router.delete(
  "/remove-cart/:pid/:color",
  [verifyAccessToken],
  userController.removeProductInCart
);
router.put("/finalregister/:token", userController.finalregister);
router.delete("/:uid", [verifyAccessToken, isAdmin], userController.deleteUser);
router.put(
  "/:uid",
  [verifyAccessToken, isAdmin],
  userController.updateUserByAdmin
);

module.exports = router;
