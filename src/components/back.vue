<template>
    <div id="#app">
        <div class="back center">
            <img src="../assets/back.png" @click="back" alt="back">
        </div>
    </div>
</template>
<script>
export default {
    name:"back",
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
        
    }
}
</script>
<style scoped>
#app{
    position: relative;
}
.back{
    position: fixed;
    z-index: 999;
    border-radius: 50%;
    top: .625rem;
    left: .625rem;
    background-color: lightgray;
    opacity: 0.5;
    height: 1.875rem;
    width: 1.875rem;
}
.back img{
    width: 1.25rem;
    height: 1.25rem;
}
</style>
