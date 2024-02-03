/////////start the server
const mongoose = require('mongoose')

//创建schema
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"A user must have a name"],
    unique:true
  },
  major:String,
  passWard:String,
  // createTime:{
  //   type:Date,
  //   default:Date.now()
  // }
})

//创建model
const User = mongoose.model('User',userSchema)

module.exports = User