const express = require('express')
const router = express.Router()
//导入处理函数模块
const userHandler = require('../router_handler/user')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// const expressJoi = require('joi')

// 导入验证规则对象
const { register_schema, login_schema } = require('../schema/user');

// 注册新用户
router.post('/reguser', expressJoi(register_schema), userHandler.regUser)
//登录
router.post('/login', expressJoi(login_schema), userHandler.login);










module.exports = router