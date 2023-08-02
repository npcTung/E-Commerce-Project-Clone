const router = require("express").Router();
const userController = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", verifyAccessToken, userController.getCurrent);
router.post("/refresh-token", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.get("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);

module.exports = router;
