<template>
    <div>
        <com-alert :isshow="isshow" :text="text"/>
        <div class="top" @click="top"></div>
        <div class="center" @click="center"></div>
        <div class="bottom" @click="bottom"></div>
        <img  v-for="v in img_url" v-lazy="v" alt="img" :key="v" >
        <div class="btngrup" v-show="btn">
            <mt-button @click="up()" :disabled="up_url.indexOf('javascript:void(0)')!=-1" class="button" type="primary">
                上一话
            </mt-button>
            <mt-button @click="next()" :disabled="next_url.indexOf('javascript:void(0)')!=-1"  class="button" type="primary">
                下一话
            </mt-button>
        </div>
        <topstarbottom :cartoon_name="cartoon_name" v-show="toshow" @comalert = "comalert" />
        
    </div>
</template>
<script>
import { getpic } from "../api/index"
import topstarbottom from "../components/topstarbottom"
import comAlert from "../components/alert"
export default {
    name:"pic",
    data(){
        return{
            img_url:[],
            url:"",
            next_url:"",
            up_url:"",
            btn:false,
            height:0,
            orderheight:0,
            isheight:0,
            toshow:false,
            isshow:false,
            text:""
        }
    },
    created(){
        var url = this.$route.query.url
        this.url = url
        this.index(this.url)
        this.orderheight = window.screen.height
        window.addEventListener('scroll',this.Scroll)
        

    },
    methods:{
        Scroll(e){
            this.isheight = e.pageY || document.body.scrollTop
        },
        index(url){
            getpic(url).then((res)=>{
                let data = res.data
                this.img_url = data.img_url
                this.next_url = data.next_url
                this.up_url = data.up_url
                this.cartoon_name = data.cartoon_name
                this.btn = true
                this.history(data.cartoon_name)
            })
        },
        up(){
            this.$router.push({path:"/pic",query:{ url:this.up_url }})
        },
        next(){
            this.$router.push({path:"/pic",query:{ url:this.next_url }})
        },
        center(){
            this.toshow = !this.toshow
            
        },
        history(cartoon_name){
            var history = localStorage.getItem("history")
            var historyArr = history.split(",")
            if(historyArr.includes(cartoon_name)){
                var index = historyArr.indexOf(cartoon_name)
                historyArr.splice(index,1)
                historyArr.unshift(cartoon_name)
            }else{
                historyArr.unshift(cartoon_name)
            }
            localStorage.setItem("history",historyArr)
        },
        top(){
            if(this.isheight!=0){
            this.isheight-=this.orderheight
                window.scrollTo(0,this.isheight)
            }
        },
        bottom(){ 
            this.isheight+=this.orderheight
            window.scrollTo(0,this.isheight)
            
        },
        comalert(e){
            this.isshow = true
            this.text = e ? "收藏成功" : "取消成功"
            setTimeout(() => {
                this.isshow = false
            }, 3000);
        }
    },
    components:{
        topstarbottom,comAlert
    }

}
</script>
<style scoped>
img{
    width: 100%;
}
div{
    font-size: 0;
}
.btngrup{
    display: flex;
    justify-content: space-around;
    margin-top: .625rem;
    margin-bottom: .625rem;
}
.btngrup .button{
    border: none;
    font-size: 14px;
    height: 1.875rem;
    width: 5rem;
    border-radius: 1.25rem;
    z-index: 100
}
.top{
    position: fixed;
    height: 35vh;
    width: 100%;
    z-index: 10;
    top: 0;
    opacity: 0;
}
.bottom{
    position: fixed;
    height: 35vh;
    width: 100%;
    z-index: 10;
    bottom: 0;
    opacity: 0;

}
.center{
    position: fixed;
    height: 35vh;
    width: 100%;
    z-index: 10;
    bottom: 35vh;
}
</style>
