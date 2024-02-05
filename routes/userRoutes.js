const express = require('express');
const userController = require("../controllers/userController.js")
const router = express.Router();

//参数中间件 检验参数是否正确
// router.param("id",userController.checkId);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);


router
  .route("/:id")
  .get(userController.getUserById)
  .post()
  .patch(userController.updateUser)
  .delete(userController.deleteUser);



module.exports = router;