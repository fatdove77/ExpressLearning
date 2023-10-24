const express = require('express');
const tourController = require("../controllers/tourController.js")
const router = express.Router();




router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);


module.exports = router;