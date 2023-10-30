/////////start the server
const dotenv = require('dotenv');
dotenv.config({
  path:"./config.env"
})

//env要在app前读取 不然app.js中无法使用环境变量
const app = require('./app.js')

//方便监听
const port = process.env.port||3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})