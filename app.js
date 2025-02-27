//导入express
const express = require('express');
const path = require('path')
//引入websoket实现实时通信





// 创建服务器实例对象
const app = express();
const expressWs = require('express-ws')(app)
//通过langchain对接ollama框架
const { Ollama } = require('@langchain/community/llms/ollama')
// const authMiddleware = require('./middleware/auth');
// app.use(authMiddleware);
//导入定义规则的包
const joi = require('joi');

//导入并配置cors跨域中间件
const cors = require('cors');
app.use(cors());


//handle request entity too large
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//配置解析表单数据中间件，(只能解析x-www-form-urlencoded格式的表单数据)
app.use(express.urlencoded({ extended: false }));

//一定要在路由之前配置 Token 的中间件
// const expressJWT = require('express-jwt');
// const config = require('./schema/config');

// 一定要在路由之前封装res.cc函数
// app.use((req, res, next) => {
//   res.cc = function (err, status) {
//     res.send({
//       status,
//       message: err instanceof Error ? err.message : err
//     })
//   }
//   next()
// })

//一定要在路由之前配置 Token 的中间件
const expressJWT = require('express-jwt');
const config = require('./schema/config');
// app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
//   path: [/^\/api/, /^\/get/,
//     "/", "/index.html", "/studyClass", "../ web_client / html / index.html",
//     "/class", "/search.html",
//     "/login", "/register.html",
//     /^\/pages/,
//     /^\/css/,
//     /^\/fonts/,
//     /^\/images/,
//     /^\/js/,
//     /^\/upload/
//   ]
// }));
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({
  path: [
    /^\/api/,
    /^\/get/,
    "/",
    "/index.html",
    "/studyClass",
    "/class",
    "/search.html",
    "/login",
    "/borrow_book",
    "/register.html",
    "/Description.html",
    "/team",
    "/project",
    "/news",
    "/NewsDescription.html",
    "/projectDes.html",
    "/ccc.html",
    "/bbb.html",
    "/bbbdes.html",
    /^\/iconfont*/,
    "/inconfont.css",
    /^\/pages/,
    /^\/css/,
    /^\/fonts/,
    /^\/images/,
    /^\/js/,
    /^\/upload/,
    /^\/video/,
    /^\/ollama/,
    /^\/ot/
  ]
}));



// 新增部分开始
const multer = require('multer');
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

// 文件上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ code: 400, msg: '未选择文件' });
  }

  res.json({
    code: 200,
    data: {
      url: `/uploads/${req.file.filename}`,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype
    }
  });
});

// 托管上传目录
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// 新增部分结束






// 静态托管
// app.use(express.static(path.join(__dirname, '../web_client')));
app.use(express.static(path.join(__dirname, '../web_client')));
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/index.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/index.html'))
})
app.get('/studyClass', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/studyClass.html'))
})
app.get('/class', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/class.html'))
})
app.get('/search.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/search.html'))
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/login.html'))
})
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/register.html'))
})
app.get('/borrow_book', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/borrow_book.html'))
})
app.get('/ollama', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/ollama.html'))
})
app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html/team.html'))
})
app.get('/Description.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//Description.html'))
})

app.get('/project', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//project.html'))
})
app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//news.html'))
})

app.get('/NewsDescription.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//NewsDescription.html'))
})

app.get('/projectDes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//projectDes.html'))
})
app.get('/ccc.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//ccc.html'))
})
app.get('/bbb.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//bbb.html'))
})
app.get('/bbbdes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../web_client/html//bbbdes.html'))
})
// 导入路由模块

// 导入并注册首页路由模块
const indexRouter = require('./router/index')
app.use('/api', indexRouter)

// // 导入并注册视频模块
const classRouter = require('./router/class')
app.use('/get', classRouter)

// 导入并注册书籍路由模块
const booksRouter = require('./router/bookStore')
app.use('/get', booksRouter)

// 导入并搜索书籍路由模块
const searchRouter = require('./router/search')
app.use('/get', searchRouter)

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// node./ web_server / app.js
// 导入并注册借书还书路由模块
const b_rRouter = require('./router/borrow_return')
app.use('/b_r', b_rRouter)

// 导入并注册其他路由模块
const otherRouter = require('./router/other')
app.use('/ot', otherRouter)


//定义错误级别的中间件
app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message,
    });
  }
  //身份认证失败后的错误
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 1,
      message: '身份认证失败!',
    });
  }
  return res.send({
    status: 1,
    message: err.message,
  });
});



//通过langchain对接ollama框架
// const { Ollama } = require('@langchain/community/llms/ollama')

const model = new Ollama({
  baseUrl: 'http://localhost:11434',//连接本地的ollama服务
  model: 'deepseek-r1'
})

app.ws('/ollama', (ws, req) => {
  console.log('[WebSocket] 新连接建立');

  ws.on('message', async (msg) => {
    console.log('[WebSocket] 收到消息:', msg);
    try {
      const stream = await model.stream(msg);
      for await (const str of stream) {
        ws.send(JSON.stringify({ data: str, isEnd: false }));
      }
      ws.send(JSON.stringify({ data: '', isEnd: true }));
    } catch (err) {
      console.error('[WebSocket] 处理错误:', err);
      ws.close();
    }
  });

  ws.on('close', () => {
    console.log('[WebSocket] 连接关闭');
  });
});









//启动服务器
app.listen(5050, () => {
  console.log('api server running at http://127.0.0.1:5050');
});














