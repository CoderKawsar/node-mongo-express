const express = require("express");
const toolsController = require("../../controllers/tools.controller");
const { limiter } = require("../../middlewares/limiter");
const viewCount = require("../../middlewares/viewCount");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Tools found");
// });

// router.post("/", (req, res) => {
//   res.send("tool added!");
// });

router
  .route("/")
  /**
   * @api {get} /tools All Tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number{1-}}.........[page-1].....List page
   * @apiParam {Number{1-100}}.........[limit=10] Users per page
   *
   * @apiSuccess {Object[]} all the tools
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Unauthorized 403) Forbidden Only admins can access the data
   */
  .get(toolsController.getAllTools)
  /**
   * @api {post} /tools Save a tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number{1-}}.........[page-1].....List page
   * @apiParam {Number{1-100}}.........[limit=10] Users per page
   *
   * @apiSuccess {Object[]} all the tools
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Unauthorized 403) Forbidden Only admins can access the data
   */
  .post(toolsController.addATool);
router.route("/:id").get(viewCount, limiter, toolsController.getToolDetails);

module.exports = router;
