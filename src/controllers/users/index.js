/**
 * 用户操作 controller
 * @author [[rockyWu]]
 * @createDate [[2018/12/20]]
 */

module.exports = {
    /**
    * 注册操作
    * @param {[[String name]]} [[登录名]]
    * @param {[[String password]]} [[登录密码]]
    */
    Register : async( ctx ) => {
        let { app } = ctx;
        let result = await app.service.users.index.Register();
        ctx.response.body = 'test success'
    }
}

