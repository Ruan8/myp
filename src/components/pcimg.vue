<template>
    <div>
        <el-image :src="src" lazy="true">
            <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading"></i>
            </div>
            <div slot="error" class="image-slot">
                <i class="el-icon-document-delete"></i>
            </div>
        </el-image>
        <div class="name">
            <span>{{ cartoon_name }}</span>
            <span>{{ nickname}}</span>
        </div>
    </div>
</template>
<style scoped>
    .image-slot{
        width: 160px;
        min-width: 100px;
        height: 212px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 30px;
    }
    .el-image{
        border-radius: 5px;
        width: 160px;
        height: 212px;
        min-width: 100px;
        background-color: rgb(245, 245, 245)
    }
    .el-image:hover{
        opacity: 0.7;
    }
    .name{
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: gray;
        letter-spacing: 1px;
        line-height: 22px;
    }
    span{
        width: 160px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    span:first-child{
        color: black;
    }
</style>
<script>
export default {
    props:["src","nickname","cartoon_name"]
}
</script>