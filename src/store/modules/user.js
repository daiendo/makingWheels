import { login, getInfo, logout } from '../../api/user.js';

//定义状态
const state = () => {
    return {
        token: sessionStorage.getItem("token"),
        name: '',
        avatar: ''
    }
}

//定义mutations【修改state】

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setName(state, name) {
        state.name = name
    },
    setAvatar(state, avatar) {
        state.avatar = avatar
    },
}
//定义异步actions 【异步修改state】
const actions = {
    //用户登录
    login(context, loginFrom) {
        return new Promise((resolve, reject) => {
            login(loginFrom).then(response => {
                context.commit('setToken', response.token);
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    //请求用户info
    getInfo(context) {
        return new Promise((resolve, reject) => {
            getInfo(state.state).then(response => {
                context.commit('setName', response.name);
                context.commit('setAvatar', response.avatar);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    //退出登录
    logout(context) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(response => {
                context.commit('setToken', '');
                context.commit('setName', '');
                context.commit('setAvatar', '');
                // resetRouter();

                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            sessionStorage.removeItem("token");
            commit('RESET_STATE')
            resolve()
        })
    }
}
export default {
    state,
    mutations,
    actions
}