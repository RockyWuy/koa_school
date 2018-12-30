/**
 * 入口配置文件
 * @author [[rockyWu]]
 * @createDate [[2018/12/20]]
 */
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')

const mainRouter = require('./router')
const miRule = require('./middlewares/mi-rule')
const app = new Koa();

// 所有请求添加前缀
const router = new Router({
    prefix : '/school'
});

// 配置表单解析中间件
app.use(bodyParser());

// 配置静态资源中间件
app.use(koaStatic(
    path.resolve(__dirname, './public')
))

// 配置规则
miRule({
    app,
    rules : [
        { folder : path.join(__dirname, './controllers'), name : 'controller' },
        { folder : path.join(__dirname, './services'), name : 'service' }
    ]
})

// 配置路由分发
app.use(mainRouter(app, router));

app.listen(3000);
console.log('Server start at port 3000');
