<template>
    <div>
        <div class="versionContent" v-for="(item,index) in versions">
            <br/>版本 {{index+1}} --><br/><br/>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="item.text">
            </el-input>
            <el-collapse v-model="item.config.activeNames">
                <el-collapse-item title=" 设定" name="1">
                    <el-input
                            class="inputStyle"
                            placeholder="请输入版本综述"
                            v-model="item.config.title"
                    >
                    </el-input>
                    <div class="handel">
                    <el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteClick(index)"></el-button>
                    <el-button type="danger" icon="el-icon-plus" circle size="small" @click="newVersionClick(index+1)"></el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div>
            {{item.config.title}}
            </div>
        </div>

        <el-button type="text" @click="newVersionClick()">+ 新版本</el-button>
    </div>
</template>

<script>
    import {Button,Input,Collapse,CollapseItem} from 'element-ui';
    export default {
        name: "VersionEditor",
        components: {
            "ElButton":Button,
            "ElInput":Input,
            "ElCollapse": Collapse,
            "ElCollapseItem": CollapseItem,
        },
        data(){
            return {
                versions:[{text:'',config:{activeNames: [],title:''}}],
            }
        },
        mounted() {

        },
        methods: {
            newVersionClick(index){
                let newVersion={text:'',config:{activeNames: [],title:''}};
                let newIndex=this.versions.length-1;
                if(index){
                    console.log(index);
                    newIndex=index-1;
                }
                newVersion.text=this.versions[newIndex].text;
                this.versions.splice(newIndex+1,0,newVersion);
            },
            deleteClick(versionIndex){
                this.versions.splice(versionIndex,1);
            }
        }
    }
</script>

<style>
    .inputStyle .el-textarea__inner,.inputStyle .el-input__inner{
        border:none;
    }
    .el-collapse-item__header{
        padding-left: 20px;
    }
</style>
<style scoped>
    .versionContent{
        border: dotted red 1px;
        padding: 0px 5px 5px;
        margin-top: 10px;
    }
    .handel{
        text-align: left;
        padding: 10px 10px 0 10px;
    }
</style>