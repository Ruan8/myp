<template>
    <div id="app">
        <div @click="upfun"><img :src="upimg" alt="up" ></div>
        <div @click="starfun"><img :src="starflag?stardoimg:starimg" alt="star" ></div>
        <div @click="downfun"><img :src="downimg" alt="down" ></div>
    </div>
</template>
<script>
import starimg from "../assets/star.png"
import stardoimg from "../assets/stardo.png"
import upimg from "../assets/up.png"
import downimg from "../assets/down.png"
import { MessageBox } from 'mint-ui';
import { star,add_star,del_star } from "../api/index"
export default {
    props:["cartoon_name"],
    data(){
        return{
            upimg:upimg,
            starimg:starimg,
            stardoimg:stardoimg,
            downimg:downimg,
            starflag:false,
            cartoon_name:""
        }
    },
    methods:{
        upfun(){
            window.scrollTo(0,0)
        },
        starfun(){
            if(this.$cookies.isKey("username")){
                if(this.starflag){
                    //已收藏
                    del_star(this.$cookies.get("username"),this.cartoon_name).then(res=>{
                        if(res.data){
                            this.starflag = false
                            this.$emit("comalert",false)
                        }else{
                            Indicator("出错了")
                        }
                    })
                }else{
                    //未收藏
                    add_star(this.$cookies.get("username"),this.cartoon_name).then(res=>{
                        if(res.data){
                            this.starflag = true
                            this.$emit("comalert",true)
                        }else{
                            Indicator("出错了")
                        }
                    })
                }
            }else{
                MessageBox.alert('请先去登陆').then(action => {  
                        this.mask = true
                        this.$router.push("/view/three")
                });
            }
        },
        downfun(){
            window.scrollTo(0,document.body.clientHeight)
        }
    },
    watch:{
        cartoon_name(){
            var that = this
            if(this.$cookies.isKey("username")){
                star(this.$cookies.get("username")).then(res=>{
                    var data = res.data
                    for(var values of data){
                        if(values.name==that.cartoon_name){
                            that.starflag=true
                        }
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
#app{
    height: 7.5rem;
    width: 2.1875rem;
    background: white;
    position: fixed;
    bottom:1.875rem;
    right: .625rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 999
}
img{
    width: 1.875rem;
    height: 1.875rem;
}
</style>
