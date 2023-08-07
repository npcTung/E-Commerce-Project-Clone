const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const blogController = require("../controllers/blog");
const uploader = require("../config/cloudinary.config");

router.post("/", [verifyAccessToken, isAdmin], blogController.createNewBlog);
router.get("/", blogController.getBlogs);
router.put("/like/:bid", [verifyAccessToken], blogController.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], blogController.dislikeBlog);
router.get("/one/:bid", blogController.getBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], blogController.deleteBlog);
router.put(
  "/upload-image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  blogController.uploadImageBlog
);

module.exports = router;
