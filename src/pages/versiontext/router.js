/**
 * @author userjustdoit
 * @des
 **/

import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import ItemList from "./ItemList.vue";
import VersionEditor from "./VersionEditor.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/list",
        component: ItemList
    },
    {
        path: "/editor",
        component: VersionEditor
    },
    {
        path: '/',
        redirect: '/editor'
    }
]

var router =  new VueRouter({
    routes
})

export default router;