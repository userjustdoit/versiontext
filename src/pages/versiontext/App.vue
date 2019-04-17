<template>
    <div id="app">
        <el-header class="header">
            <el-menu
                    class="menuStyle"
                    :default-active="activeIndex"
                    @select="handleSelect"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="list" class="menuItemStyle">列表</el-menu-item>
                <el-menu-item index="editor" class="menuItemStyle">编辑</el-menu-item>
                <el-menu-item index="3" class="menuItemStyle">预览</el-menu-item>
                <el-menu-item index="4" class="menuItemStyle" v-if="!isMobileDev">对比工具</el-menu-item>
                <el-menu-item index="5" class="menuItemStyle" v-if="!isMobileDev">资源上传</el-menu-item>
                <el-menu-item index="export_in" class="menuItemStyle" v-if="!isMobileDev">导入导出</el-menu-item>
                <el-submenu index="7" class="menuItemStyle" v-if="isMobileDev">
                    <template slot="title">更多</template>
                    <el-menu-item index="4" class="menuItemStyle">对比工具</el-menu-item>
                    <el-menu-item index="5" class="menuItemStyle">资源上传</el-menu-item>
                    <el-menu-item index="export_in" class="menuItemStyle">导入导出</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <div class="content">
            <router-view @resetIndex="resetIndex"></router-view>
        </div>

    </div>
</template>

<script>
    import {Menu, MenuItem, Header,Submenu} from 'element-ui';

    export default {
        name: 'App',
        components: {
            "ElMenu": Menu,
            "ElMenuItem": MenuItem,
            "ElHeader": Header,
            "ElSubmenu": Submenu,
        },
        data() {
            return {
                activeIndex: '',
                isMobileDev:false,
            }
        },
        mounted() {
            this.isMobileDev=this.isMobile();
            this.getActiveIndex();

            this.bindRouterMenu();
        },
        methods: {
            bindRouterMenu(){
                this.$router.afterEach((to, from) => {
                    this.resetIndex();
                })
            },
            resetIndex(){
                this.getActiveIndex();
            },
            getActiveIndex(){
                this.activeIndex=this.$route.path.substr(1);
            },
            handleSelect(index){
                this.activeIndex=index;//这句很重要否则activeIndex实际值不会变
                this.$router.push({ path:index})
            },
        },
        computed: {},
    }
</script>

<style scoped>
    #app {
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        font-size: 15px;
        max-width: 960px;
        margin: 0 auto;
    }
    .header{
        height:48px;
        text-align: center;
        line-height: 48px;
        padding: 0px;
        position: fixed;
        width:100%;
        top:0;
        left:0;
        z-index:2000;
    }
    .menuStyle{
        height:46px;
    }
    .menuItemStyle{
        height:44px !important;
        line-height:44px !important;
    }
    .content{
        margin-top: 60px;
    }
</style>
<style >
    .el-menu--horizontal>.el-submenu .el-submenu__title{
        height:44px !important;
        line-height:44px !important;
    }
</style>
