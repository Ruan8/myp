<template>
    <div id="app">
            <div class="div" @click="upfun"><img :src="upimg" alt="up" ></div>
            <div class="div" @click="starfun"><img :src="starflag?stardoimg:starimg" alt="star" ></div>
    </div>
</template>
<script>
import starimg from "../assets/star.png"
import stardoimg from "../assets/stardo.png"
import upimg from "../assets/up.png"
import { MessageBox } from 'mint-ui';
import { star,add_star,del_star } from "../api/index"
export default {
    props:["cartoon_name"],
    data(){
        return{
            upimg:upimg,
            starimg:starimg,
            stardoimg:stardoimg,
            starflag:false,
            cartoon_name:""
        }
    },
    methods:{
        upfun(){
            var height = document.documentElement.scrollTop
            setTimeout(() => {
                height-=100
                window.scrollTo(0,height)
                if(height>0){
                    this.upfun()
                }
            }, 1);
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
    height: 5rem;
    width: 2.1875rem;
    position: fixed;
    bottom:1.875rem;
    right: .625rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 999
}
#app .div{
    background: white;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    border-radius: 50%;
}
#app .div img{
    padding: .3125rem;
    width: 1.25rem;
    height: 1.25rem;
}

</style>
