<template>
    <div>
        <div :ref="`editor_version_${index}`" class="versionContent" v-for="(item,index) in versions">
            <br/><version-info :versionIndex="index" :versionCount="versions.length" :isLastAdd="index==lastInsertIndex"></version-info><br/>
            <div class="versionTitle" v-if="trim(item.title)&&item.config.activeNames.length!=1">{{item.title}}</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    :ref="`textareaText${index}`"
                    resize="none"
                    placeholder="请输入内容"
                    @change="contentChange"
                    v-model="item.text">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-delete" circle size="small" @click="item.text=''"></el-button>
            </div>
            <el-collapse v-model="item.config.activeNames" @change="collapseClick(item.config.activeNames,index)">
                <el-collapse-item title=" 设定综述" name="1">
                    <el-input
                            :ref="`textareaTitle${index}`"
                            class="inputStyle"
                            type="textarea"
                            :autosize="{ minRows: 1}"
                            resize="none"
                            placeholder="请输入版本综述"
                            @change="contentChange"
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
            </div>
        </div>
        <br/>
        <el-button type="text" @click="newVersionClick()">+ 新版本</el-button>

        <div class="versionFileBar">
            <el-collapse v-model="activeNames" @change="versionTitleInputFocus()">
                <el-collapse-item :title="getVersionFileTitle" name="1">
                    <el-input
                            ref="textareaVersionTitle"
                            class="inputStyle"
                            type="textarea"
                            :autosize="{ minRows: 1}"
                            resize="none"
                            placeholder="请输入文件标题"
                            v-model="title"
                            @change="contentChange"
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
    import { MessageBox } from 'element-ui';

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
                isUpdate:false,
            }
        },
        mounted() {
              this.key=this.$route.query.key;
              if(this.key){
                  this.title=this.$route.query.title;
                  this.versions=VersionStorageTool.getItemByItemKey(this.key);
              }else{
                  this.newVersionClick();
              }

        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            if(this.isUpdate){
                MessageBox.confirm('是否在离开页面前保存？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '保存',
                    cancelButtonText: '放弃'
                }).then(() => {
                    if(this.uploadFile()){
                        next();
                    }else{//复原菜单
                        this.$emit('resetIndex');
                    }
                }).catch(action => {
                    next();
                });
            }else{
                next();
            }

        },
        computed:{
            getVersionFileTitle(){
                let titleShow=this.title;
                if(this.activeNames.length==1||this.isEmpty(this.title)){
                    titleShow='设定文件标题';
                }else {
                    titleShow=this.ellipsisStr(titleShow,25);
                }
                return titleShow;
            }
        },
        methods: {
            collapseClick(item,index){
                if(item.length==1){//自动聚焦
                    this.$nextTick(()=>{
                        this.$refs[`textareaTitle${index}`][0].$refs.textarea.focus();
                    });
                }
            },
            versionTitleInputFocus(){
                this.$nextTick(()=>{
                    this.$refs.textareaVersionTitle.$refs.textarea.focus();
                });
            },
            contentChange(){
                this.isUpdate=true;
            },
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
                this.$nextTick(()=>{
                    //document.getElementById(`editor_version_${newVersionIndex}`).scrollIntoView();
                    this.$refs[`textareaText${newVersionIndex}`][0].$refs.textarea.focus();
                    this.$refs[`editor_version_${newVersionIndex}`][0].scrollIntoView();
                });
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
                    let tip='更新成功!';
                    if(this.isEmpty(this.key)){//新建文件
                        this.key=new Date().getTime();
                        tip='新建成功!';
                    }
                    VersionStorageTool.storageItem(this.key,this.title,this.versions);
                    this.showMessage(tip);
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style>
    .inputStyle .el-textarea__inner{
        border:none;
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
        color: #666666;
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
    .versionTitle{
        margin: 0 20px 10px 20px;
        padding-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666666;
        border-bottom: 1px dotted red;
    }
</style>