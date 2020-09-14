import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //可以把state 当成 组件中的data，专门用来存储数据的
        //如果载组件中，想要访问store中的数据，只能通过this.$store.state.xxx  来访问
        token: '傻逼吗',
        user:'',
        collapsed:false,
    },
    mutations: {
        setUser (state,user) {
            state.user = user;
            sessionStorage.setItem('user',user );
        },
        setCollapsed (state,collapsed) {
            state.collapsed = collapsed;
        },
        // delToken (state) {
        //     state.token = '';
        //     localStorage.removeItem("token");
        // }
    }
})

export default store;
