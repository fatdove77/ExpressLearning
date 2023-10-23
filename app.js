const express = require('express');
const fs = require('fs');
const app = express(); //创建对象 express app下可以调用express的方法


//路由  当接收到http的get方法
// app.get("/",(req,res) => {
//   res.status(200).json({
//       message:"hello from the back",
//       app:"fatdove"
//     })  //返回json对象
// })

// app.post("/",(req,res)=>{
//   res.send("you can post to this endpoint...")
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));
console.log(tours);

app.get("/api/v1/tours",(req,res)=>{
  res.status(200).json({
    status:"success",
    total:tours.length,  //用户让用户知道数组的长度 方便
    data:{
      tours:tours
    }
  })

})

//方便监听
const port = 3000;
app.listen(port,()=>{
  console.log(`app running on port ${port}...`);
})