'use strict';

const Router = require('koa-router');
const router = new Router();

const User = require('../controllers/user');
const user = new User();

// 用户登陆
router.post('/', user.login.bind(user));

// 发送手机验证码
router.post('/sendValiCode', user.sendValiCode.bind());


module.exports = router