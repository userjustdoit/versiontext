<template>
    <div>
        <div class="versionContent" v-for="(item,index) in versions">
            <!--<br/><div :class="getVersionInfoStyle(index)">版本 <span class="versionNumber">{{index+1}}</span> </div><br/>-->
            <br/><version-info :versionIndex="index" :versionCount="versions.length" :isLastAdd="index==lastInsertIndex"></version-info><br/>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="item.text">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-delete" circle size="small" @click="item.text=''"></el-button>
            </div>
            <el-collapse v-model="item.config.activeNames">
                <el-collapse-item title=" 设定综述" name="1">
                    <el-input
                            class="inputStyle"
                            type="textarea"
                            :autosize="{ minRows: 1}"
                            resize="none"
                            placeholder="请输入版本综述"
                            v-model="item.title"
                    >
                    </el-input>
                    <div class="handel">
                    <el-button type="primary" icon="el-icon-delete" circle size="small" @click="item.title=''"></el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="handel">
                <el-button type="danger" icon="el-icon-close" circle size="small" @click="deleteClick(index)"></el-button>
                <el-button type="success" icon="el-icon-plus" circle size="small" @click="newVersionClick(index+1,true)"></el-button>
            </div>
            <div>
            {{item.config.title}}
            </div>
        </div>

        <el-button type="text" @click="newVersionClick()">+ 新版本</el-button>

        <div class="versionFileBar">
            <el-collapse v-model="activeNames">
                <el-collapse-item title=" 设定文件标题" name="1">
                    <el-input
                            class="inputStyle"
                            type="textarea"
                            :autosize="{ minRows: 1}"
                            resize="none"
                            placeholder="请输入文件标题"
                            v-model="title"
                    >
                    </el-input>
                    <div class="handel">
                        <el-button type="primary" icon="el-icon-delete" circle size="small" @click="title=''"></el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="fileHandel">
                <el-button type="danger" icon="el-icon-upload" circle size="small" @click="uploadFile()"></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Button,Input,Collapse,CollapseItem} from 'element-ui';
    import VersionInfo from './VersionInfo';
    import VersionStorageTool from '@/base/util/versionStorageTool.js'

    export default {
        name: "VersionEditor",
        components: {
            VersionInfo,
            "ElButton":Button,
            "ElInput":Input,
            "ElCollapse": Collapse,
            "ElCollapseItem": CollapseItem,
        },
        data(){
            return {
                versions:[],
                lastInsertIndex:-1,
                activeNames:[],
                title:'',
                key:null,
            }
        },
        mounted() {
              this.newVersionClick();
        },
        computed:{
            getVersionInfoStyle(index){
                return index==versions.length-1?['versionInfo','lastVersionInfo']:['versionInfo'];
            },
        },
        methods: {
            newVersionClick(index,copy=false){
                let newVersion=this.getNewVersionObj();
                let parentIndex=this.versions.length-1;
                if(index){
                    parentIndex=index-1;
                }
                if(this.versions[parentIndex]&&copy){
                    newVersion.text=this.versions[parentIndex].text;
                }
                let newVersionIndex=parentIndex+1;
                this.versions.splice(newVersionIndex,0,newVersion);
                this.lastInsertIndex=newVersionIndex;
                this.showMessage(`版本${newVersionIndex+1} 新建!`);
            },
            deleteClick(versionIndex){
                if(this.versions.length==1){
                   this.showMessage('至少需要保留一个版本');
                }else{
                   this.versions.splice(versionIndex,1);
                   if(versionIndex<this.lastInsertIndex){
                      this.lastInsertIndex=this.lastInsertIndex-1;
                   }else if(versionIndex==this.lastInsertIndex){
                      this.lastInsertIndex=-1;
                   }
                   this.showMessage('删除成功!');
                }
            },
            clearClick(versionIndex){
                let currentItem=this.versions[versionIndex];
                currentItem.text='';
            },
            getNewVersionObj(){
                return {text:'',title:'',config:{activeNames: []}};
            },
            uploadFile(){
                if(this.isEmpty(this.title)){
                    this.showMessage('文件标题必须指定!');
                }else{
                    if(this.isEmpty(this.key)){//新建文件
                        this.key=new Date().getTime();
                    }
                    VersionStorageTool.storageItem(this.key,this.title,this.versions);
                    this.showMessage('新建成功!');
                }
            }
        }
    }
</script>

<style>
    .inputStyle .el-textarea__inner{
        border:none;
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
    }
    .el-collapse-item__header{
        padding-left: 10px;
    }
</style>
<style scoped>
    .versionContent{
        border: dotted red 1px;
        padding: 0px 5px 5px;
        margin-top: 10px;
        -moz-box-shadow: 0px 0px 8px 6px rgba(208, 203, 203, 0.8);
        box-shadow: 0px 0px 8px 6px rgba(208, 203, 203, 0.8);
    }
    .handel{
        text-align: right;
        padding: 10px;
    }
    .versionFileBar{
        margin: 20px 0px;
    }
    .fileHandel{
        padding: 10px;
    }
</style>