const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes//tourRoutes')
const userRouter = require('./routes//userRoutes')
const app = express(); //创建对象 express app下可以调用express的方法

///////////middleware
//middleware is a function which is to modify request data
app.use(morgan('dev'))
app.use(express.json());
app.use((req,res,next)=>{
  console.log("this is middleware");
  next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})




//////////route
app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/tours",userRouter)

module.exports = app