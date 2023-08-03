const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const blogController = require("../controllers/blog");

router.post("/", [verifyAccessToken, isAdmin], blogController.createNewBlog);
router.get("/", blogController.getBlogs);
router.put("/like/:bid", [verifyAccessToken], blogController.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], blogController.dislikeBlog);
router.get("/one/:bid", blogController.getBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], blogController.deleteBlog);

module.exports = router;
