import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let _isMobile = ()=> {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
let mobile = (e)=>{
  return resolve=>require(['../views/'+e], resolve)
}
let web = (e)=>{
  return resolve=>require(['../pc/'+e], resolve)
}
 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:"/view/one"
    },
    {
      path: '/view',
      name: 'view',
      component:  _isMobile() ? mobile("index") : web("index"),
      children:[
        {
          path: 'one',
          name: 'one',
          component:  _isMobile() ? mobile("one") : web("one"),
        },
        {
          path: 'two',
          name: 'two',
          component:  _isMobile() ? mobile("two") : web("two"),
        },
        {
          path: 'three',
          name: 'three',
          component: _isMobile() ? mobile("three") : web("three")
        },
        {
          path: 'fl',
          component: _isMobile() || web("fl"),
          children:[{
            path: '/',
            component:  web("flindex"),
            redirect: _isMobile() ? "/fl" :"",
          },
          {
            path: 'index',
            component:  web("flindex"),
            redirect: _isMobile() ? "/fl" :"",
          }]
        },
      ]
    },
    {
      path: '/fl',
      name:'fl',
      component:  _isMobile() && mobile("fl"),
      redirect: _isMobile() ? "" : "/view/fl"
    },
    {
      path: '/pic',
      name:'pic',
      component:  _isMobile() ? mobile("pic") : web("pic"),
    },
    {
      path: '/search',
      name:'search',
      component:  _isMobile() ? mobile("search") : web("search"),
    },
    {
      path: '/list',
      name:'list',
      component:  _isMobile() ? mobile("list") : web("list"),
    },
    {
      path: '/history',
      name:'history',
      component:  _isMobile() && mobile("history"),
      redirect: _isMobile() ? "" : "/view/three",
    },
    {
      path:"/mydata",
      name:"mydata",
      component:  _isMobile() ? mobile("mydata") : web("mydata"),
    },
    {
      path:"/codelogin",
      name:"codelogin",
      component:  _isMobile() && mobile("codelogin"),
    },
    {
      path:"/register",
      name:"register",
      component:  _isMobile() ? mobile("register") : web("register")
    },
    {
      path:"/login",
      name:"login",
      component:  _isMobile() || web("login"),
      redirect: _isMobile() && "/view"
    },
    {path: "*", redirect: "/"}
  ]
})
export default router