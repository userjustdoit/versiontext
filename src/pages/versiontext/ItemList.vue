<template>
    <div class="content">
        <el-table
                :data="allItems"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    label="时间"
                    width="150">
                <template slot-scope="scope">
                    {{getDate(scope.row.key/1000)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleExport(scope.row)" type="text" size="small">导出</el-button>
                    <el-button @click="handleVersion(scope.row)" type="text" size="small">迭代</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {Table,TableColumn,Button} from 'element-ui';
    import VersionStorageTool from '@/base/util/versionStorageTool.js'
    import TimeUtil from '@/base/util/timeutil.js'
    export default {
        name: "ItemList",
        components: {
            "ElTable":Table,
            "ElTableColumn":TableColumn,
            "ElButton":Button,
        },
        data() {
            return {
                allItems:[],
            }
        },
        mounted() {
           this.init();
        },
        methods: {
            getDate(ts){
                return TimeUtil.getDate(ts);
            },
            init(){
                this.allItems=VersionStorageTool.getAllItemKeys();
            },
            handleEdit(data){
                this.$router.push({ path:'editor', query:{ key: data.key,title:data.title}})
            },
            handleExport(data){
                this.$router.push({ path:'export_in', query:{ key: data.key,title:data.title}})
            },
            handleVersion(data){
                this.$router.push({ path:'history', query:{ key: data.key}})
            }
        },
        computed: {},
    }
</script>

<style scoped>
    .content{
        border: 1px solid #ebeef5;
        border-bottom:none;
    }
    .item{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #ebeef5;
        text-align: left;
        padding: 0 20px;
    }
</style>