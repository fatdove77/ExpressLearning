const express = require('express');
const uploadImgController = require("../controllers/uploadImgController.js")
const router = express.Router();

router
  .route("/")
  .post(uploadImgController.uploadImg)




module.exports = router;