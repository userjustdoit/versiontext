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
                <el-menu-item index="1" class="menuItemStyle">列表</el-menu-item>
                <el-menu-item index="2" class="menuItemStyle">编辑</el-menu-item>
                <el-menu-item index="3" class="menuItemStyle">预览</el-menu-item>
                <el-menu-item index="4" class="menuItemStyle" v-if="!isMobileDev">对比工具</el-menu-item>
                <el-menu-item index="5" class="menuItemStyle" v-if="!isMobileDev">资源上传</el-menu-item>
                <el-submenu index="6" class="menuItemStyle" v-if="isMobileDev">
                    <template slot="title">更多</template>
                    <el-menu-item index="4" class="menuItemStyle">对比工具</el-menu-item>
                    <el-menu-item index="5" class="menuItemStyle">资源上传</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <div class="content">
            <ItemList ref="ItemList" v-show="activeIndex==1"/>
            <VersionEditor ref="VersionEditor" v-show="activeIndex==2"/>
        </div>

    </div>
</template>

<script>
    import VersionEditor from './VersionEditor'
    import ItemList from './ItemList';
    import {Menu, MenuItem, Header,Submenu} from 'element-ui';

    export default {
        name: 'App',
        components: {
            "ElMenu": Menu,
            "ElMenuItem": MenuItem,
            "ElHeader": Header,
            "ElSubmenu": Submenu,
            VersionEditor,
            ItemList
        },
        data() {
            return {
                activeIndex: '2',
                isMobileDev:false,
            }
        },
        mounted() {
            this.isMobileDev=this.isMobile();
        },
        methods: {
            handleSelect(index){
                this.activeIndex=index;
                if(this.activeIndex=='1'){
                    this.$refs.ItemList.refresh();
                }
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
