const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    total: tours.length,  //用户让用户知道数组的长度 方便
    data: {
      tours: tours
    }
  })
}


//检查创建的参数正确性 req.body
exports.bodyCheck = (req, res, next) => {
  console.log("检查body");
  if (!req.body.name) {
    return res.status(400).json({
      status: "fail",
      message: "missing name"
    })
  }
  next();
}


exports.createTour = (req, res) => {
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

exports.getTourById = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    message: "get by id"
  })

}


//检查参数
exports.checkId = (req, res, next, value) => {
  if (value > 10) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id"
    })
  }
  next();
}

