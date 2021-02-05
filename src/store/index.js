import { createStore } from 'vuex';
import user from './modules/user';
import getters from './getters'
// Create a new store instance.
const store = createStore({
    modules: {
        user
    },
    getters
})

export default store;