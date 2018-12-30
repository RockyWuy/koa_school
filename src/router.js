/**
 * 路由入口文件
 * @author [[rockyWu]]
 * @createDate [[2018/12/20]]
 */
let user = require('./routes/users');

module.exports = (app, router) => {
    user(app, router);
    return router.routes();
}
