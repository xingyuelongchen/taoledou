import axios from 'axios';
import Config from '@/config';
import { getStore } from './_Storage';
import { Message, MessageBox } from 'element-ui';

// 请求超时时间(毫秒)
axios.defaults.timeout = 60000;
// 配置axios请求的地址
// axios.defaults.baseURL = Config.options.apiUrl;

// 默认请求数据格式
// axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.crossDomain = false;
axios.defaults.withCredentials = true;

// 拦截器
axios.interceptors.request.use(request);
axios.interceptors.response.use(response, resError);
export default axios;

/**
 * 请求拦截
 * @param {Object} config 发送请求前，对请求进行配置
 */
function request(config) {
    // 优化URL字段，剔除掉值为空的参数；
    if (config.params && JSON.stringify(config.params) !== '{}') {
        let params = {};
        Object.keys(config.params).forEach(e => {
            if (!!config.params[e]) {
                params[e] = config.params[e]
            }
        });
        config.params = params;
    }
    return config
}

/**
 * 响应拦截
 * @param {Object} result 响应数据
 */
function response(result) {
    // NProgress.done()

    if (result.config.url.indexOf('/order_status') >= 0) {
        return result
    }
    if (result.data
        && result.data.code == 0
        && (result.config.url.indexOf('/sessionuid') < 0)) {
        // console.log();
        MessageBox(result.data.msg)

    }

    return result
}


/**
 * 响应错误拦截
 * @param {Object} error 错误响应
 */
function resError(error) {
    // NProgress.done();
    let message = error.msg || (error.response.data && error.response.data.msg) || '服务器开小差了，请刷新重试！';
    /**
     * 错误信息汇总提示
     */
    MessageBox(message)
    return error
}