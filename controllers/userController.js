const User = require("../models/userModel")

//中间件
//检查创建的参数正确性 req.body
// exports.bodyCheck = (req, res, next) => {
//   console.log("检查body");
//   if (!req.body.name) {
//     return res.status(400).json({
//       status: "fail",
//       message: "missing name"
//     })
//   }
//   next();
// }


exports.getAllUsers = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
  })
}

exports.createUser = async (req, res) => {
  try {
    //创建document的两种方法 
    //1
    // const newUser = new Tour({});
    // newUser.save();
    //2.
    const newUser = await User.create(req.body)
    res.status(201).json({
      status: "success",
      data: {
        user: newUser
      }
    })
  } catch (error) {
    res.status(400).json({
      status:"fail",
      message: "Invalid data sent"
    })
  }


}

exports.getUserById = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    message: "get by id"
  })

}


