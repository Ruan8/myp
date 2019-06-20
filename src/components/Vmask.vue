<template>
    <div id="app">
        <div class="mask" v-html="content">
        </div>
    </div>
</template>
<script>
export default {
    props:["content"]
}
</script>
<style scoped>
#app{
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0;
    background: rgb(150, 150, 150,0.6);
    z-index: 111111;
    display: flex;
    align-items: center;
    justify-content: center;
    word-wrap:break-word
}
.mask{
    background: white;
    padding: 20px;
    max-width: 200px;

}
</style>
