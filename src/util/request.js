import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
    baseURL: "",
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 进度条
    Nprogress.start();
    // token 配置请求头
    // ...
    return config;
});

// 响应拦截器
instance.interceptors.response.use((config) => {
    // 进度条
    Nprogress.done();
    return config;
});

const REQUEST = {
    get: instance.get,
    post: instance.post,
};

export { REQUEST };
