# ExpressLearning



# Init

```js
npm init
npm i express
npm nodemon  //修改start
```



创建express对象，设置好路由和监听

```js
const express = require('express');

const app = express(); //创建对象 express app下可以调用express的方法


//路由  当接收到http的get方法
app.get("/",(req,res) => {
  res.status(200).json({
      message:"hello from the back",
      app:"fatdove"
    })  //返回json对象
})

app.post("/",(req,res)=>{
  res.send("you can post to this endpoint...")
})


//方便监听
const port = 3000;
app.listen(port,()=>{
  console.log(`app running on port ${port}...`);
})
```





# rest-API

- separate API into logical resources

  ```
  resources means information
  ```

- expose structured,resource-based URLs

- use HTTP methods

  ```
  which is means we should use verbs in the endpoint of url
  like: xxx/tours(/1)
  the endpoint name can be same but the route can be different such as get or post 
  get-read
  post-create
  patch/put -update
  delete
  special:
  /getToursByUser->get /user/3/tours
  /deleteToursByUser->delete /user/3/tours/9
  ```

- send data as json

  ```json
  //Jsend
  {
  	"status":"success",
  	"data":{
  		"id":5,
  		"name":"fatdove"
  	}
  }
  ```

- be stateless

  ```
  each requrst must contain all the information necessary to process a certain request.
  get tours/nextPage ❌
  get tour/page/6 ✅
  ```



## json文件数据集

### get

```js
//__dirname是本地根文件  fs读取的文件需要转换成json格式 不然是二进制
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

```

传参(更改路由)：

```js
//__dirname是本地根文件  fs读取的文件需要转换成json格式 不然是二进制
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));
console.log(tours);
//参数可以多加 可选参数后面加？
app.get("/api/v1/tours/:id/:x/:y?",(req,res)=>{
	req.params //拿到传参
})


app.get("/api/v1/tours/:id",(req,res)=>{
	req.params //拿到传参
})
```

重构：把方法定义出来，把路由放在一起，提高可读性

```js
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    total: tours.length,  //用户让用户知道数组的长度 方便
    data: {
      tours: tours
    }
  })
}

app.get("/api/v1/tours",getAllTours )


```



### post

```js
app.post("/api/v1/tours", (req, res) => {
  console.log(req.body); //look request data
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  //想要立即读取就是用writeFile 不然postman无法读取writefileSync
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    //201 means created
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour
      }
    })
  })
  console.log(newTour);
  res.send("done")
})
```





## refactor router

不是链式反应，只是把路由相同的不同方法整合在一起

```
app.route("/api/v1/tours").get(getAllTours).post(createTour);
```





# middleware

❗❗express根据定义顺序执行

### 定义中间件

自定义必须使用next不然会堵塞，express.json()应该是已经封装好了的

```js
funciton MiddleWare = (req,res,next)=>{

}
```

### 注册中间件

```
app.use()
```



```js
app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})

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

app.route("/api/v1/tours").get(getAllTours).post(createTour);

//log  2023-10-23T12:00:12.105Z
```



### morgan

日志中间件

```
npm i morgan
```

```js
app.use(morgan('dev')) 


//after requesting output :GET /api/v1/tours 200 23.548 ms - 275
```





## express.Router()整理route(mounting)

```js
const tourRouter = express.Router();  //新建Router对象
//声明中间件
app.use("/api/v1/tours",tourRouter)  //整合路径一致的所有路由
tourRouter.route("/").get(getAllTours).post(createTour);  //这里route的/就是/api/v1/tours
tourRouter.route("/:id").get(getTour) 
```





## file structure

app.js用来存放middleware

```js
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

module.exports = app;
```



routes/tourRoutes

```js
const express = require('express');
const tourController = require("../controllers/tourController.js")
const router = express.Router();




router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);


module.exports = router;
```





controllers/tourControllers

```js
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

```



server.js

```js
/////////start the server
const app = require('./app.js')
//方便监听
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})
```





发送http请求，中间件（app.js）,路由参数中间件（router），路由返回



## params middleware

一般定义在指定的route文件中，val就是路由参数中id的值

```js
router.param("id",(req,res,next,val)=>{
  console.log("tour id is ",val);
  next()
})

```

用法：

```js

//检查参数
exports.checkId = (req,res,next,value)=>{
  if(value>10){
    return res.status(404).json({
      status:"fail",
      message:"invalid id"
    })
  }
  next();  //可加可不加 因为在参数中间件中已经返回
}


router.param("id",tourController.checkId)


```

post请求，路由中不带参数，我们需要检查res.body的参数，那么我们需要如下这么写中间件

```js
router
  .route("/")
  .get(tourController.getAllTours)
 .post(middleware,tourController.createTour)
```

```js
qie
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
```





# static file

定义根节点

```js
app.use(express.static(`${__dirname}/public`));
```

这样我们直接在网站输入：

```js
http://127.0.0.1:3000/test.html
```

就能打开网页，不需要输入/public...





# environment variables

开发环境和测试环境的切换，需要用到环境变量

```js
console.log(app.get("env"))   //development
```

## 设置环境变量

```shell
npm i dotenv
```

config.env:

```js
NODE_ENV=development
PORT=8000
USER=FATDOVE
PASSWORD=12345
```

server.js：  读取config.env文件然后赋值给环境变量

```js
const dotenv = require('dotenv');
dotenv.config({
  path:"./config.env"
})


console.log(app.get("env")); //打印出我们设置的环境变量
```

测试的时候，指定测试环境的中间件：

```js
if(process.env.NODE_ENV === 'production'){
  app.use(morgan('dev'))
}
```

```js
const port = process.env.port||3000;  //process.env.port存在就返回，不然返回3000
```



package定义 通过这种方式启动两种不同的开发环境，但是config.env也会起作用

```js
"scripts": {
    "start:dev": "nodemon server.js",
    "start:prod": "NODE_ENV=production nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

```js
 npm run start:dev
```





# MongoDB

基本shell指令

https://dotblogs.com.tw/grayyin/2020/06/01/133724

```
mongo 启动数据库
use dbname 切换到对应数据库 
db.tours.insertOne([bson])  给collection添加一个元素，这里直接就相当于创建了集合
db.tours.find()  查看集合下面的所有文件
```



### 查

```js
db.tours.find({name:"zjx"})  //查找包含name=zjx
db.tours.find()  //get all
db.tours.find({age:{$lt:50}})   //小于50  lte小于等于 gt大于
db.tours.find({$or:[{age:{lt:50}},{name:"zjx"}]})  //或
db.tours.find({$or:[{age:{lt:50}},{price:{$lt:500}}]，{name:"zjx"}})  //内部只写范围  外部限定name  
```



### 增

```sql
db.tours.insertOne({name:"zjx"})

db.tours.insertMany([{name:"zjx"},{name:"fatdove"}])
```



### 改

```js
db.tours.updateOne({name :"fatdove"},{$set:{age:22} }) 先查找出来，再进行修改$set


db.tours.replaceOne  //替换
```



### 删

```
 db.tours.deleteMany({age:{$gte:23}})
 db.tours.deleteMany({})  //delete all
```

