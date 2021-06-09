import axios from 'e:/vuejs/vue_axios/node_modules/axios';  
import qs from 'qs'; // 是一个增加了一些安全性的查询字符串解析和序列化字符串的库
import { Loading, Notification } from 'e:/vuejs/element ui/node_modules/element-ui';


axios.defaults.timeout = 5000; //请求失效的时间
axios.defaults.baseURL = 'http://8.131.78.129:3000'; //域名 若使用代理跨域无需配置此项
//解决跨域的方式叫做本地代理



//http request 拦截器
var loading = null;
// 请求前调用
axios.interceptors.request.use(
    (config) => {
        config.data = qs.stringify(config.data); //公共参数
        config.headers = {  //配置请求头
            // formData
            'Content-Type': 'application/x-www-form-urlencoded' //请求方式
        }
        loading = Loading.service({
            text: 'Loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
        })
        return config;
    }
);

//响应拦截器即异常处理
//请求后调用
axios.interceptors.response.use(response => {
    // 请求成功调用
    // 可以在这里做一些公共参数的验证
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                Notification.error({
                    title: 'Error',
                    message: `错误请求`
                })
                console.log('错误请求')
                break;
            case 401:
                Notification.error({
                    title: 'Error',
                    message: `未授权，请重新登录`
                })
                console.log('未授权，请重新登录')
                break;
            case 403:
                Notification.error({
                    title: 'Error',
                    message: `拒绝访问`
                })
                console.log('拒绝访问')
                break;
            case 404:
                Notification.error({
                    title: 'Error',
                    message: `请求错误,未找到该资源`
                })
                console.log('请求错误,未找到该资源')
                break;
            case 405:
                Notification.error({
                    title: 'Error',
                    message: `请求方法未允许`
                })
                console.log('请求方法未允许')
                break;
            case 408:
                Notification.error({
                    title: 'Error',
                    message: `请求超时`
                })
                console.log('请求超时')
                break;
            case 500:
                Notification.error({
                    title: 'Error',
                    message: `服务器端出错`
                })
                console.log('服务器端出错')
                break;
            case 501:
                Notification.error({
                    title: 'Error',
                    message: `网络未实现`
                })
                console.log('网络未实现')
                break;
            case 502:
                Notification.error({
                    title: 'Error',
                    message: `网络错误`
                })
                console.log('网络错误')
                break;
            case 503:
                Notification.error({
                    title: 'Error',
                    message: `服务不可用`
                })
                console.log('服务不可用')
                break;
            case 504:
                Notification.error({
                    title: 'Error',
                    message: `网络超时`
                })
                console.log('网络超时')
                break;
            case 505:
                Notification.error({
                    title: 'Error',
                    message: `http版本不支持该请求`
                })
                console.log('http版本不支持该请求')
                break;
            default:
                Notification.error({
                    title: 'Error',
                    message: `连接错误${err.response.status}`
                })
                console.log(`连接错误${err.response.status}`)
        }
    } else {
        Notification.error({
            title: 'Error',
            message: '连接到服务器失败'
        })
    }
    return Promise.resolve(err.response)
})



export default {

    /**
     * 封装get方法
     * @param url
     * @param data
     * @returns {Promise}
     */
    // params = {}默认参数
    get: function(url, params = {}) {
        let publics = { //公共参数
            tokenid: sessionStorage.getItem('token') || "",
            lang: sessionStorage.getItem('language')
        }
        //实例
        //resolve() 成功的返回
        //reject()  失败的返回
        // new Promise((resolve, reject)=> {

        // })

        return new Promise((resolve, reject) => {
            axios.get(url, {// Object.assign()
                params: Object.assign(publics, params),
            })
                .then(response => {
                    loading.close();
                    resolve(response.data);
                })
                .catch(err => {
                    loading.close();
                    reject(err)
                })
        })
    },

    /**
     * 封装post请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    post: function(url, data = {}) {
        let publics = { //公共参数
            tokenid: sessionStorage.getItem('token') || "",
            lang: sessionStorage.getItem('language')
        }
        return new Promise((resolve, reject) => {
            axios.post(url, Object.assign(publics, data))
                .then(response => {
                    loading.close();
                    resolve(response.data);
                }, err => {
                    loading.close();
                    reject(err)
                })
        })
    },

    /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    patch: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, data)
                .then(response => {
                    loading.close();
                    resolve(response.data);
                }, err => {
                    loading.close();
                    reject(err)
                })
        })
    },

    /**
     * 封装put请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    put: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then(response => {
                    loading.close();
                    resolve(response.data);
                }, err => {
                    loading.close();
                    reject(err)
                })
        })
    }
}