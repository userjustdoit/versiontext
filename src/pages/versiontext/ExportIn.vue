<template>
    <div >
        <div class="content">
            <div class="title">导出信息</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="要导出的内容"
                    v-model="exportText">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-search" size="mini">复制</el-button>
            </div>
        </div>
        <br/>
        <br/>
        <div class="content">
            <div class="title">导入信息</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="要导入的内容"
                    v-model="inText">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-search" size="mini">导入</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Button,Input} from 'element-ui';
    export default {
        name: "ExportIn",
        components: {
            "ElButton":Button,
            "ElInput":Input,
        },
        data() {
            return {
                exportText:'',
                inText:'',
            }
        },
        mounted() {
        },
        methods: {},
        computed: {},
    }
</script>

<style>
    .inputStyle .el-textarea__inner{
        border:none;
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
        color: #bbbbbb;
    }
</style>

<style scoped>
    .content{
        border: 1px dotted red;
    }
    .title{
        background-color: #f56c6c;
        color: #ffffff;
        height: 28px;
        line-height: 28px;
    }
    .handel{
        padding: 10px;
    }
</style>
