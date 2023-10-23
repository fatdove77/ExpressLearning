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

