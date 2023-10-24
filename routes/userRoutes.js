
const express = require('express');
const fs = require('fs');
const router = express.Router();


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

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




router
  .route("/")
  .get(getAllTours)
  .post(createTour);


module.exports = router;