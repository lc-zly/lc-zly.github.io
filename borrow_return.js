const express = require('express')
const router = express.Router()

// 导入首页路由处理函数模块
const b_rHandler = require("../router_handler/borrow_return");
// 导入需要的验证规则对象
const { update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
  comment_schema } = require('../schema/user');
// 不纯粹的旧做法
// router.get('/', (req, res) => {
//   res.send('../../web_client/html/index')
// })

//借阅或者归还一本书
router.post('/borrowOrReturnOneBook', b_rHandler.borrowOrReturnOneBook);

router.get('/getBooksAndBorrow', b_rHandler.getBooksAndBorrow);

//把你借的书渲染到页面上
router.post('/getMoreBooks', b_rHandler.getMoreBooks);








module.exports = router