const router = require("express").Router();
const productController = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], productController.createProduct);
router.get("/", productController.getProducts);
router.put("/ratings", [verifyAccessToken], productController.ratings);

router.get("/:pid", productController.getProduct);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.updateProduct
);
router.delete(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.deleteProduct
);

module.exports = router;
