<template>
    <div id="app">
        <div class="content">
            <div class="title">原始信息{{exportInfo?'-'+exportInfo.versions.length:''}}</div>
            <div class="versionTitle" v-if="exportInfo">{{exportInfo.title}}</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="要导出的内容"
                    v-model="baseText">
            </el-input>
        </div>
        <br/>
        <br/>
        <div class="content">
            <div class="title">新信息</div>
            <el-input
                    class="inputStyle"
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    resize="none"
                    placeholder="要导入的内容"
                    v-model="newText">
            </el-input>
            <div class="handel">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="compareClick(0)">Side by Side对比</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="compareClick(1)">Inline 对比</el-button>
            </div>
        </div>
        <div v-html="compareView"> </div>
    </div>
</template>

<script>
    import {Button, Input} from 'element-ui';
    export default {
        name: 'App',
        components: {
            "ElButton":Button,
            "ElInput":Input,
        },
        data() {
            return {
                baseText: '11111111111111111111',
                newText:'222222222222222222',
                compareView:'',
            }
        },
        mounted() {

        },
        methods: {
            compareClick(viewType){
               let base = difflib.stringAsLines(this.baseText);
               let newTxt =difflib.stringAsLines(this.newText);
               console.log(base);
               console.log(newTxt);
               let sm = new difflib.SequenceMatcher(base, newTxt);
               console.log(JSON.stringify(sm));
               let opCodes = sm.get_opcodes();

               this.compareView=diffview.buildView({
                    baseTextLines: base,
                    newTextLines: newTxt,
                    opcodes: opCodes,
                    baseTextName: "Base Text",
                    newTextName: "New Text",
                    contextSize: null,
                    viewType: viewType
               }).innerHTML;

               console.log(this.compareView);
            }
        },
        computed: {},
    }
</script>

<style>
    .inputStyle .el-textarea__inner{
        border:none;
        font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
        color: #666666;
    }
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