import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';
import Login from '../views/login.vue';


const routes = [
    {
        path: '/',
        name: 'index',
        component: Layout
    },
    {
        path: '/login',
        name: "login",
        component: Login
    },
]




const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;