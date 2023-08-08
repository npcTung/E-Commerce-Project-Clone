const router = require("express").Router();
const insertController = require("../controllers/insertData");

router.post("/product", insertController.insertProduct);
router.post("/category", insertController.insertCategory);

module.exports = router;
