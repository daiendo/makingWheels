import {createApp} from 'vue';
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import router from './router/index';
import store from './store/index'



setTimeout(()=>{
    const app = createApp(App);
    app.use(ElementPlus)
    app.use(router);
    app.use(store);
    app.mount('#app');
},5000)