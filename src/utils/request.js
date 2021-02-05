import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import store from '../store/index'


const service = axios.create({
    baseURL: 'http://localhost:8888/api',
    timeout: 5000
})


//请求拦截器
service.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers['Authentication'] = sessionStorage.getItem("token");
    }
    return config;
}, error => {
    return new Promise.reject(error);
})

//响应拦截器
service.interceptors.response.use(response => {
    const data = response.data;
    if (data.code != 200) {
        if (data.code == 500 || data.code == 403 || data.code == 401) {
            ElMessage.error(data.messgage);
        } else if (data.code == 400) {
            ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload();
                })
            })
        }
        return Promise.reject(new Error(data.message || 'Error'));
    } else {
        return response;
    }
}, error => {
    ElMessage.error(error.messgage);
    return Promise.reject(error);
})

export default service;