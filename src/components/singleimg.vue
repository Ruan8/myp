<template>
    <div class="back">
        <img v-lazy="src" :key="src" alt="img">
        <span class="tt tt1" v-text="tt1.length>6? tt1.slice(0,6)+'...' :tt1"></span>
        <span class="tt tt2" v-text="tt2.length>6? tt2.slice(0,6)+'...' :tt2"></span>
    </div>
</template>
<script>
export default {
    name:"singleimg",
    props:{
        src:String,
        tt1:String,
        tt2:String
    }
}
</script>

<style scoped>
img{
    width: 4.5rem;
    height: 6rem;
    border-radius: .3125rem;
}
.back{
    background: rgb(249, 249, 249);
    height: 100%;
}
.tt{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: .625rem;
}
.tt1{
    color: black;
}
.tt2{
    color: lightgray;
}
</style>
