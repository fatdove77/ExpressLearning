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

