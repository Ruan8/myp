<template>

<el-container class="con">
  <pcheader />
  <el-container>
     <el-menu
     background-color="#000000"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      @mouseover.native="menuover"
      @mouseout.native="menuout"
      text-color="#ffffff"
      :collapse="iscollapse">

      <router-link to="/view/one">
        <el-menu-item index="/view/one">
          <i class="el-icon-s-home"></i>
          <span slot="title">猜你喜欢</span>
        </el-menu-item>
      </router-link>

      <router-link :to="{path:'/view/fl',query:this.$store.flquery}">
        <el-menu-item index="/view/fl">
          <i class="el-icon-menu"></i>
          <span slot="title">分类</span>
        </el-menu-item>
      </router-link>

      <router-link to="/view/two">
        <el-menu-item index="/view/two">
          <i class="el-icon-reading"></i>
          <span slot="title">书架</span>
        </el-menu-item>
      </router-link>

      <router-link to="/view/three">
        <el-menu-item index="/view/three">
          <i class="el-icon-document"></i>
          <span slot="title">浏览记录</span>
        </el-menu-item>
      </router-link>
      <transition name="el-fade-in-linear">
        <div v-show="showla" class="nic" @click="tolamenu">
          <i :class="la"></i>
        </div>
      </transition>
    </el-menu>
    <el-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
  
</template>
<style scoped>
.con{
  display: flex;
  flex-direction: column;
}
.el-container:last-child{
  height: 94vh;
  width: auto;
}
.el-menu{
  height: 94vh;
}
.el-main{
  min-width: 1184px;
  width: 100%;
  height: 94vh;
  margin: 0;
  padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
}
.nic{
  width: 1.25rem;
  height: 3.125rem;
  background: #000000;
  position: absolute;
  top: 50%;
  right: -21px;
  margin-top: -1.5625rem;
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>

<script>
import pcheader from "../components/pcheader"
export default {
  data(){
    return{
      iscollapse:false,
      la:"el-icon-d-arrow-left",
      showla:false,
      timeout:null,
    }
  },
  created(){
    if(localStorage.getItem("history")==null){
        localStorage.setItem("history",[])
      }
  },
  methods: {
    handleSelect(e){
    },
    tolamenu(){
      this.la = this.iscollapse? "el-icon-d-arrow-left" : "el-icon-d-arrow-right"
      this.iscollapse = !this.iscollapse
    },
    menuover(){
      clearTimeout(this.timeout)
      this.showla = true
    },
    menuout(){
      this.timeout = setTimeout(() => {
        this.showla = false
      }, 1000);
    },
    totop(){
      var ele = document.getElementsByClassName("el-main")[0]
        setTimeout(() => {
          ele.scrollTop -= 50
          if(ele.scrollTop>0){
            this.totop()
          }
        }, 1);
    }
  },
  components:{
    pcheader
  },
  watch:{
    $route(e){
      if(e.path=="/view/fl"){
        this.$nextTick(()=>{
          this.totop()
        })
      }
    }
  },
}
</script>