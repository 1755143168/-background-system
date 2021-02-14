// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import VueRouter from "vue-router";
import login from '../components/login'
import home from "../components/home";
//安装路由
Vue.use(VueRouter)

//配置导出路由

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:"/",
            redirect:'/login'
        },
        {
            //路由路径
            path:'/login',
            name:'login',
            //跳转组件
            component:login
        },
        {
            //路由路径
            path:'/home',
            name:'home',
            //跳转组件
            component:home
        },
    ]
})

// 挂载路由守卫
router.beforeEach(((to, from, next) => {
    //to 将要访问的路径
    //from 来自哪个路径
    //next是一个函数
    //next() 放行  next('/login') 强制跳转
    if (to.path === '/login') return next()
    const token = window.sessionStorage.getItem("token")
    if(!token) return next('/login')
    next()
}))
export default router

