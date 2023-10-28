/////////start the server
const app = require('./app.js')
//方便监听
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})