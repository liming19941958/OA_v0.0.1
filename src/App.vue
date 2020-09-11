<template>
    <div class="app-container">
        <div class="menuBar">
            <transition name="menu">
              <components :is="tab"></components>
            </transition>
        </div>
        <div class="mainContent">
            <transition>
                <router-view></router-view>
            </transition>
        </div>

    </div>
</template>
<script>
    import pc from './components/tabbar/tab'
    import gif from './components/tabbar/kong'
    export default {
        name: "App",
        data(){
            return{
                tab:'pc'
            }
        },
        created(){
            this.to();
            // 全局监听路由变化，并把末路由地址存入浏览器自带的sessionStorage中，供main.js中全局设置请求头使用
            this.$router.beforeEach((to, from, next) => {
                let r_path =to.path;
                sessionStorage.setItem('Path',r_path );
                next();
            });

        },
        mounted(){
            this.go();
        },
        components:{
           pc,
           gif
        },
        methods:{
            go(){
               this.tab = 'pc';
               console.log('2')
            },
            to(){
                this.tab = 'gif'
                console.log('1')
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-enter{
        transform: translateX(100%);
        opacity: 0;
    }
    .v-leave-to{
        transform: translateX(-100%);
        opacity: 0;
        position: absolute;
    }
    .v-leave-active,
    .v-enter-active{
        transition: all 1s ease;
    }
    .app-container{
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #f3fff1;
        display: flex;
        .menuBar{
            flex: 11;
            height: 100%;
            min-width: 150px;
            float: left;
            .menu-enter{
                transform: translateX(-100%);
                opacity: 0;
            }
            .menu-leave-to{
                transform: translateX(200px);
                opacity: 0;
                position: absolute;
            }
            .menu-leave-active,
            .menu-enter-active{
                transition: all 0.7s ease;
            }
        }
        .mainContent{
            flex:89;
            height: 100%;
            float: left;
            background-color: #73c5ff;
        }
    }
</style>
