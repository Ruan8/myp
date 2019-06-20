<template>
    <div id="app" v-show="isshow" >
        {{ text }}
    </div>
</template>
<script>
export default {
    props:["text","isshow"],
    data(){
        return{
            isshow:true
        }
    },
    watch:{
        isshow(val){
            if(val){
                setTimeout(() => {
                    this.isshow = false
                }, 3000);
            }
        }
    }

}
</script>
<style scoped>

@keyframes height
{
0% {height:0px}
50% {height: 2.5rem;}
100% {height: 0px;}
}
#app{
    width: 100%;
    height: 2.5rem;
    position: fixed;
    background: black;
    opacity: 0.5;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: .875rem;
    letter-spacing: .1875rem;
    animation: height 3.5s;
}
</style>
