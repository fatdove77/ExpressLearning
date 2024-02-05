exports.uploadImg = async (req, res) => {
  console.log(req.body);
  try {
    res.status(201).json({
      status: "success",
      data: {
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "upload failed"
    })
  }
}