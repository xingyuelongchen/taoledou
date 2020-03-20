/**
 * 当前目录下的方法文件规则：
 *      必须是 _ 开头，紧跟一个大写字母的js文件，
 *      必须由 export default 导出
 *      使用时，使用 fn 代替文件名字的 _ ;
 * 
 */
const files = require.context('./', true, /_[A-Z]\w+\.js$/);
const models = {};
files.keys().forEach(key=>{
    const filename = key.replace(/(\.\/|\.js)/g, '').replace(/^_/,'fn');
    models[filename] = files(key)['default'];
});
export default {
    ...models,
    install: Vue => {
        Object.keys(models).forEach(key => {
            Vue.prototype[key] = models[key];
        });
    }
}