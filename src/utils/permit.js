//许可
import router from '../router/index';
import store from '../store/index';
import { ElMessage } from 'element-plus';

//许可白名单
const whiteList = ['/login', '/404'];
router.beforeEach(async(to) => {
    if (sessionStorage.getItem('token')) {
        if (!store.getters.name) {
            try {
                await store.dispatch('user/getInfo');
            } catch (error) {
                await store.dispatch('user/restToken');
                ElMessage.error(error);
                return `/login?redirect=${to.path}`;
            }
        }
    } else {
        if (!(whiteList.indexOf(to.path) !== -1)) {
            return `/login?redirect=${to.path}`;
        }
    }
})