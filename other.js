const express = require('express')
const router = express.Router()

// 导入首页路由处理函数模块
const otherHandler = require("../router_handler/other");

// 不纯粹的旧做法
// router.get('/', (req, res) => {
//   res.send('../../web_client/html/index')
// })

// 获取首页内容
router.get('/getteam', otherHandler.getteam);

// 获取研究人员详情
router.post('/getdes', otherHandler.getdes);

// 获取科研项目列表
router.get('/getnews', otherHandler.getnews);
// 获取科研项目详情
router.post('/getprojectdes', otherHandler.getprojectdes);

// 获取新闻列表数量
router.get('/getnewsNum', otherHandler.getnewsNum);

// 获取新闻详情
router.post('/getns', otherHandler.getns);

// 获取新闻详情
router.post('/getness', otherHandler.getness);

// 获取小组例会详情
router.get('/getxzlh', otherHandler.getxzlh);
// 获取最新技术详情
router.get('/getmaxnew', otherHandler.getmaxnew);
// 获取最新技术详情
router.post('/getmaxnewdes', otherHandler.getmaxnewdes);

module.exports = router