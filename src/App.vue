<template>
    <div class="app-container">
        <div class="menuBar">
            <transition name="menu">
              <components :is="tab"></components>
            </transition>
        </div>
        <div class="mainContent">
            <div class="topbar">
                <div class="menubtn">
                    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed" />
                    <span>首 页</span>
                </div>
                <ul class="btn">
                    <li>
                        <img src="./images/user.png" alt="">
                        <span>{{username}}</span>
                    </li>
                    <li @click="openForm">
                        <img src="./images/password.png" alt="">
                        <span>修改密码</span>
                    </li>
                    <li @click="logout">
                        <img src="./images/logout.png" alt="">
                        <span>退出</span>
                    </li>
                </ul>
                <div>
                    <a-modal
                            v-model="visible"
                    >
                        <a-form-model
                                ref="ruleForm"
                                :model="form"
                                :rules="rules"
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                        >
                            <a-form-model-item ref="name" label="新密码：" prop="password" style="color: #666666">
                                <a-input v-model="form.password" @blur="() => {$refs.name.onFieldBlur();}"/>
                            </a-form-model-item>
                            <a-form-model-item ref="name" label="再次输入：" prop="repeatPassword">
                                <a-input v-model="form.repeatPassword" @blur="() => {$refs.name.onFieldBlur();}"/>
                                <p v-show="isShowMsg" style="color: red">两次输入的密码不一致，请重新输入！</p>
                            </a-form-model-item>
                        </a-form-model>
                        <span  slot="title" >
                            <a-icon type="exclamation-circle" style="color: #ffcf31" />
                            <span>
                                提 示
                            </span>
                        </span>
                        <a-button type="primary" slot="footer" @click="closeForm" class="btn1">关 闭</a-button>
                        <a-button type="primary" slot="footer" @click="saveForm" class="btn1">保 存</a-button>
                    </a-modal>
                </div>
            </div>
            <div class="ContentTable">
                <transition>
                    <router-view></router-view>
                </transition>
            </div>
            <div class="footer">版权所有：惠州市物联微电子有限公司</div>

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
                collapsed:false,
                isShowMsg:false,
                tab:'pc',
                username:'',
                visible:false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                form: {
                    password: '',
                    repeatPassword: '',
                },
                rules: {
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' },
                        { min: 5, max: 255, message: '长度最小5个字符，最大255个字符!', trigger: 'blur' },
                    ],
                    repeatPassword: [{ required: true, message: '请再次输入密码！', trigger: 'blur' },
                        { min: 5, max: 255, message: '长度最小5个字符，最大255个字符！', trigger: 'blur' }],
                },
            }
        },
        created(){
            this.getDisPlayName();
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
           gif,
        },
        watch:{
            '$store.state.user':function (newVal,oldVal) {//监听路由地址变化
                console.log(newVal,oldVal)
                if (newVal !=null){
                    this.username = newVal;
                }else{
                    this.username = oldVal;
                }
            }
        },
        methods:{
            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                this.$store.commit('setCollapsed',this.collapsed)
            },
            changePassword(){
                if (this.form.repeatPassword !== this.form.password) {
                    this.isShowMsg =true;
                    return false;

                }else{
                    this.visible = false;
                    this.isShowMsg =false;
                }
            },
            openForm(){
                this.visible = true;
                this.form.password = '';
                this.form.repeatPassword = '';
                this.isShowMsg =false;
                this.$refs.ruleForm.resetFields();//取消表单验证
            },
            closeForm(){
               this.visible =false;
                this.form.password = '';
                this.form.repeatPassword = '';
                this.$refs.ruleForm.resetFields();//取消表单验证
            },
            saveForm(){

                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.changePassword();
                        this.$http.get('api/Building/UserInfo/UpdatePW',{
                            params:{
                                password:this.form.password
                            }
                        }).then(res=>{
                            console.log(res.body)
                            if (res.body.IsSuc){
                                this.$message({
                                    type:"success",
                                    message:"修改成功，请重新登录！"

                                })
                                this.$router.push('/login')
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            logout(){
                this.$router.push('/login')
            },
            getDisPlayName(){
                this.username = sessionStorage.getItem("user");
            },
            go(){
               this.tab = 'pc';
            },
            to(){
                this.tab = 'gif'
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
        transition: all 2s ease;
    }
    .app-container{
        position: relative;
        width: 100vw;
        height: 100vh;
        /*background-color: #f0f0f0;*/
        display: flex;
        .menuBar{
            /*height: 100%;*/
            /*min-width: 150px;*/
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
            width: 100%;
            height: 100%;
            float: left;
            padding-left: 20px;
            padding-right: 20px;
            /*background-color: #f0f0f0;*/
            display: flex;
            flex-flow: column;
            .topbar{
                flex: 10;
                width: 100%;
                height: 100%;
                min-height: 60px;
                border-bottom:1px solid #d1d1d1;
                .menubtn{
                    font-size: 25px;
                    color: #8e8c92;
                    float: left;
                    /*width: 50px;*/
                    height: 100%;
                    right: 0;
                    display: flex;
                    list-style: none;
                    text-align: center;
                    align-items: center;
                    cursor: auto;
                    box-shadow:none ;
                    span{
                        margin-left: 15px;
                        color: #7f7f7f;
                    }
                }
                .btn{
                    width: 25%;
                    min-width: 380px;
                    height: 100%;
                    float: right;
                    right: 0;
                    display: flex;
                    list-style: none;
                    text-align: center;
                    align-items: center;
                    cursor: auto;
                    box-shadow:none ;
                    li:nth-child(1):hover {
                        cursor: auto;
                        span{
                            cursor: text;
                        }

                    }
                    li:nth-child(2):hover{
                        cursor: pointer;
                        span{
                            color: rgb(81,202,167);
                        }
                    }
                    li:nth-child(3):hover{
                        cursor: pointer;
                        span{
                            color: rgb(81,202,167);
                        }
                    }
                    li{
                        flex: 1;
                        span{
                            margin-left: 5px;
                            color: #666666;
                        }
                    }
                }
            }
            .ContentTable{
                width: 100%;
                flex: 85;
                background-color: #ffffff;
            }
            .footer{
                flex: 5;
                width: 100%;
                justify-content: center;
                align-items: center;
                display: -webkit-flex;
                border-top:1px solid #d1d1d1;
            }
        }
    }
</style>
