const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express(); //创建对象 express app下可以调用express的方法

///////////middleware
//middleware is a function which is to modify request data
app.use(express.json());
app.use((req,res,next)=>{
  console.log("this is middleware");
  next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})



//////route handlers
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    total: tours.length,  //用户让用户知道数组的长度 方便
    data: {
      tours: tours
    }
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    //201 means created
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour
      }
    })
  })
}




//////////route
app.route("/api/v1/tours").get(getAllTours).post(createTour);

/////////start the server
//方便监听
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})