<template>
    <div class="app-container">
        <div class="menuBar">
          222
        </div>
        <div class="mainContent">
            <transition>
                <router-view></router-view>
            </transition>
        </div>

    </div>
</template>

<script>
    export default {
        name: "App",
        created(){
            // 全局监听路由变化，并把末路由地址存入浏览器自带的sessionStorage中，供main.js中全局设置请求头使用
            this.$router.beforeEach((to, from, next) => {
                let r_path =to.path;
                sessionStorage.setItem('Path',r_path );
                next();
            });
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .v-enter{
        transform: translateX(100%);
        opacity: 0;
        /*position: absolute;*/
    }
    .v-leave-to{
        transform: translateX(-100%);
        opacity: 0;
        position: absolute;
    }
    .v-leave-active,
    .v-enter-active{
        transition: all 0.08s ease;
    }
    .app-container{
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #f3fff1;
        .menuBar{
            width: 11%;
            height: 100%;
            min-width: 150px;
            float: left;
            background-color: #ebff16;
        }
        .mainContent{
            width: 89%;
            height: 100%;
            float: left;
            background-color: #73c5ff;
        }
    }
</style>
