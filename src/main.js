import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/index.less'
import './css/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import qs from 'qs'
import VueResource from 'vue-resource'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from './store/index'
Vue.use(Antd);
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(ViewUI);
//定义全局的时间过滤器
//方式一：自己写过滤器
// Vue.filter('dateFormat',function(originVal){
//   const dt = new Date(originVal)
//   //年的时间
//   const y = dt.getFullYear()
//   //月的时间  .padStart 不足两位自动补0  2位长度
//   const m = (dt.getMonth() + 1 + '').padStart(2,'0')
//   //日的时间
//   const d = (dt.getDate() + '').padStart(2,'0')
//
//   //小时
//   const hh = (dt.getHours()+'').padStart(2,'0')
//   //分钟
//   const mm = (dt.getMinutes()+'').padStart(2,'0')
//   //秒数
//   const ss = (dt.getSeconds()+'').padStart(2,'0')
//
//   //将它们拼接成完整的字符串
//   //return 'yyyy-mm-dd hh:mm:ss'  可以改成下面的方法
//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// });
//方式二：用时间过滤器插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
//定义全局的时间格式化函数对象
Vue.prototype.changeDateTime = function (time){//changeData是函数名
  var t1 = new Date();
  t1.setTime(time);
  var date = t1.getFullYear() + '-' + ((t1.getMonth() + 1)<10?'0'+(t1.getMonth() + 1):(t1.getMonth() + 1)) +  '-' + (t1.getDate()<10?'0'+t1.getDate():t1.getDate()) +' '+
      (t1.getHours()<10?'0'+t1.getHours():t1.getHours()) + ':'+ (t1.getMinutes()< 10?'0'+t1.getMinutes():t1.getMinutes())
      + ':' + (t1.getSeconds()< 10?'0'+t1.getSeconds():t1.getSeconds());
  return date;
}
//如果我们通过全局配置了请求数据的接口 根域名，则在每次单独发起
// http 请求的时候，请求的url 路径，应该以相对路径 开头，
// 前面不带 “/”，否则，不会启动根路径做拼接
// Vue.http.options.root = 'http://192.168.1.127:9002/';
Vue.http.options.root = 'http://localhost:9002/';

Vue.http.interceptors.push((request,next)  =>{

  // var lastname = sessionStorage.getItem("token");
  var path = sessionStorage.getItem("Path");
    // request.headers.set('token',lastname);
    request.headers.set('requestPage',path);
  next((response) => {
    return response
  });

});
// 全局配置emulateJSON
Vue.http.options.emulateJSON = true;
new Vue({
  render: h => h(App),
  router,
  store  //将vuex创建的 store 挂载到  VM 实例上，任何组件都可以通过store存取数据
}).$mount('#app');

