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


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "get by id",
      data: {
        user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateUser = async(req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
      new:true,  //返回一个新的document
      runValidators:true  //验证数据类型
    })
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
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
      status: "fail",
      message: "Invalid data sent"
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      message:"delete successfully!"
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}



