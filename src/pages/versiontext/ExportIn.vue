<template>
    <div >
        <div class="content">
            <div class="title">导出信息{{exportInfo?'-'+exportInfo.versions.length:''}}</div>
            <div class="versionTitle" v-if="exportInfo">{{exportInfo.title}}</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="要导出的内容"
                    v-model="exportText">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="copyExport">复制</el-button>
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
                <el-button type="primary" icon="el-icon-search" size="mini" @click="importClick">导入</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import VersionStorageTool from '@/base/util/versionStorageTool.js'
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
                exportInfo:null,
                inText:'',
                key:null,
            }
        },
        mounted() {
            this.initExport();
        },
        methods: {
            copyExport(){
                this.$copyText(this.exportText).then((e)=>{
                   this.showMessage('已复制','success');
                }, function (e) {
                   this.showMessage('当前环境无法调用剪切板,请手动复制');
                })
            },
            initExport(){
                let key=this.$route.query.key;
                let title=this.$route.query.title;
                if(key&&title){
                    this.key=key;
                    this.title=title;
                    this.versions=VersionStorageTool.getItemByItemKey(this.key);
                    let exportJson={};
                    exportJson.title=this.title;
                    exportJson.versions=this.versions;
                    this.exportInfo=exportJson;
                    this.exportText=JSON.stringify(exportJson);
                }
            },
            importClick(){
                if(this.isEmpty(this.inText)){
                    this.showMessage('没有输入数据');
                }else{
                    try {
                        let importJson=JSON.parse(this.inText);
                        let title=importJson.title;
                        let versions=importJson.versions;
                        let key=new Date().getTime();
                        VersionStorageTool.storageItem(key,title,versions);
                        this.showMessage('导入成功','success');
                        this.inText='';
                    }catch (e) {
                        this.showMessage('导入失败');
                    }

                }
            }
        },
        computed: {

        },
    }
</script>

<style>
    .inputStyle .el-textarea__inner{
        border:none;
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
        color: #666666;
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
    .versionTitle{
        margin: 10px 20px 10px 20px;
        padding-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666666;
        border-bottom: 1px dotted red;
    }
</style>
