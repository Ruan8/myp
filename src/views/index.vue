<template>
<div>
<mt-tab-container  class="tabbar">
  <mt-tab-container-item>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </mt-tab-container-item>
</mt-tab-container>
<mt-tabbar v-model="selected" :fixed=true>
  <mt-tab-item :id="$route.path=='/view'?'/view':'/view/one'" >
    <img slot="icon"  src="../assets/xin.png">
    猜你喜欢
  </mt-tab-item>
  <mt-tab-item id="/view/two" >
    <img slot="icon" src="../assets/shujia.png">
    书架
  </mt-tab-item>
  <mt-tab-item id="/view/three">
    <img slot="icon" src="../assets/wode.png">
    我的
  </mt-tab-item>
</mt-tabbar>
</div>
</template>
<script>
export default {
    name:'bottom',
    data:function(){
      return{
        selected:this.$route.path
      }
    },
    created(){
      if(localStorage.getItem("history")==null){
        localStorage.setItem("history",[])
      }
    },
    watch:{
      selected:function(e){
        this.$router.replace(e)
      }
    },
    methods:{
    },
    components:{
    }
}
</script>
<style scoped>
.tabbar{
  margin-bottom: 3.75rem;
}
</style>
