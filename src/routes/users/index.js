/**
 * 用户操作 router
 * @author [[rockyWu]]
 * @createDate [[2018/12/20]]
 */
module.exports = (app, router) => {
    let { controller } = app;
    router.get('/', controller.users.index.Register);
}
