<template>
    <div>
        <me :show="tt" @getchild="getchild"/>
        <login :show="!tt" @getchild="getchild"/>
    </div>
    
</template>
<script>
import login from "./login"
import me from "./me"
export default {
    name:"three",
    data(){
        return{
            tt:this.$cookies.get("username")?true:false
        }
    },
    created(){
    },
    components:{
        login,me
    },
    methods:{
        getchild(data){
            this.tt = data
        }
    }
}
</script>
<style scoped>

</style>
