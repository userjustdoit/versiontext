<!--
 * @author userjustdoit
 * @des
 -->
<template>
    <div :class="getVersionInfoStyle">版本 <span class="versionNumber">{{versionIndex+1}}/{{versionCount}}</span> </div>
</template>

<script>
    export default {
        name: "VersionInfo",
        props:{
            versionIndex:{
                type:Number,
                default:-1,
            },
            versionCount:{
                type:Number,
                default:0,
            },
            isLastAdd:{
                type:Boolean,
                default:false,
            },
        },
        components: {},
        data() {
            return {};
        },
        methods: {},
        computed: {
            getVersionInfoStyle(index){
                let styles=['versionInfo'];
                if(this.isLastAdd){
                    styles.push('lastAddVersion');
                }
                if(this.versionIndex==this.versionCount-1){
                    styles.push('lastVersionInfo');
                }
                return styles;
            },
        },
    }
</script>

<style scoped>
    .versionInfo{
        background-color: #f56c6c;
        color: #ffffff;
        height: 28px;
        line-height: 28px;
    }
    .lastAddVersion{
        background-color: #e6a23c;
    }
    .lastVersionInfo{
        background-color: #409eff;
    }
</style>