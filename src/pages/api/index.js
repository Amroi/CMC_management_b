// axios 发送网络请求获取数据
// 数据接口：https://cnodejs.org/api   baseURL 基础的URL地址(可能会更新改变)
// 话题接口：https://cnodejs.org/api/v1/topics
import axios from 'axios';

/* 
axios的另外一种使用方式
	一般我们的项目分为：开发模式 development和线上模式 production
	process.env.NODE_ENV node运行的环境(开发模式)
*/
const isDecv = process.env.NODE_ENV === 'development'

// 1. 配置请求文章列表基准地址
const service = axios.create(
    {
        baseURL: isDecv ? 'https://cnodejs.org/api/v1' : 'https://cnodejs.org/api/v1'
    }
)   // 无线上地址

// 配置登录接口基准地址
const service_login = axios.create({
    baseURL: isDecv ? 'http://rap2.taobao.org:38080/app/mock/261737' : 'http://rap2.taobao.org:38080/app/mock/261737'
})

/* 2. 可以使用对象的API进行网络请求的拦截
a. 拦截请求 传递参数token b.拦截响应 做统一的处理 */
// 两个拦截器操作,此为发送请求之前执行
service.interceptors.request.use(config => {
    // config 代表发送给服务器的信息(请求头等等) 后期需要填充数据，自己配置即可
    console.log('请求前的操作', config);

    return config
})

//  请求文章列表的处理(请求返回之后执行)
service.interceptors.response.use(response => {
    console.log('响应的操作', response);
    if (response.status === 200) { // 只要有数据的数组
        return response.data
    } else { // 统一处理错误
        message.error('系统繁忙,请稍后再试')
    }
})

// 登录请求的处理
service_login.interceptors.response.use(response => {
    console.log('响应的操作', response);
    if (response.status === 200) { // 只要有数据的数组
        return response.data
    } else { // 统一处理错误
        message.error('系统繁忙,请稍后再试')
    }
})

// 获取文章列表接口
export const getTopics = (page, limit) => {
    return service.get(`/topics?page=${page}&limit=${limit}`);
}

// 登录接口
export const getLogin = (user) => {
    return service_login.post('/api/v1/login', user)
}

