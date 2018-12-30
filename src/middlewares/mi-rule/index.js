/**
 * 将controller router service 封装至app 可形成类next链式调用
 * @author [[rockyWu]]
 * @createDate [[2018/12/20]]
 */
const fs = require('fs')
const path = require('path')

// 循环文件夹 形成链式调用
function loopFolder( foldPath, content = {} ){
    fs.readdirSync(foldPath).forEach(file => {
        let filePath = path.resolve(foldPath, file);
        let stat = fs.statSync(filePath);
        if(stat.isDirectory()){
            content[file] = loopFolder(filePath);
        } else if( stat.isFile() ){
            let extname = path.extname(filePath);
            if( extname === '.js' ){
                let name = path.basename(filePath, extname);
                content[name] = require(filePath);
            }
        }
    })
    return content;
}

module.exports = ( opts ) => {
    let { app, router, rules = [] } = opts;
    if( !app ) throw new Error('app must be required!');
    app.router = router;   //将router封装至app中
    let appKeys = Object.keys( app ) || [];
    rules.forEach((item) => {
        let { name, folder } = item;
        // 如果app 实例中已经存在传入的属性名, 则抛出错误
        if( appKeys.includes(name) ){
            throw new Error(`the name of ${name} already exists!`)
        }
        app[name] = loopFolder( folder );
    })
}
