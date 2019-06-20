<template>
  <div id="app">
    <back v-show="isshow"/>
      <router-view/>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import back from './components/back'
export default {
  name: 'App',
  data(){
    return {
      isshow:false
    }
  },
  components:{
    back
  },
  mounted(){
    
  },
  watch:{
    $route(to,from){
    }
  },
  created(){
    this.isshow = this._isMobile() ? true : false
  },
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  }
}

</script>

<style>
body{
  margin: 0;
  padding: 0;
}
a{
    text-decoration: none;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
input:focus{
    outline: none;
}
*{
    outline: none;
}
</style>
