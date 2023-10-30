const express = require('express');
const tourController = require("../controllers/tourController.js")
const router = express.Router();

//参数中间件 检验参数是否正确
router.param("id",tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.bodyCheck,tourController.createTour);


  router
  .route("/:id")
  .get(tourController.getTourById)
  .post();



module.exports = router;