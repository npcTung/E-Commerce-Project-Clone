const router = require("express").Router();
const userController = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", verifyAccessToken, userController.getCurrent);
router.post("/refresh-token", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.get("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], userController.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], userController.deleteUser);
router.put("/current", [verifyAccessToken], userController.updateUser);
router.put(
  "/:uid",
  [verifyAccessToken, isAdmin],
  userController.updateUserByAdmin
);

module.exports = router;
