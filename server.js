/////////start the server
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({
  path: "./config.env"
})

//env要在app前读取 不然app.js中无法使用环境变量
const app = require('./app.js')

//mongodb
const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
//connect to mongo
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(con=>{
  console.log("DB connection successful!");
}).catch(err=>{
  console.log(err);
})


//方便监听
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})


