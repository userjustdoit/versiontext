<template>
    <div>
    <div class="content">
        <div class="title">原始信息</div>
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
    <div class="compareView" v-html="compareView"> </div>
    </div>
</template>


<script>
    import {Button, Input} from 'element-ui';
    //import Diff from 'diff-compare';
    export default {
        name: 'App',
        components: {
            "ElButton":Button,
            "ElInput":Input,
        },
        data() {
            return {
                baseText: '11111111111111111111\n' +
                    '222222222222222222',
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
                let sm = new difflib.SequenceMatcher(base, newTxt);
                let opCodes = sm.get_opcodes();

                /*//又一个库能提供具体的操作信息
                let adjustedText = Diff.build({
                    base: this.baseText,
                    compare: this.newText
                })*/

                let compareViewEl=diffview.buildView({
                    baseTextLines: base,
                    newTextLines: newTxt,
                    opcodes: opCodes,
                    baseTextName: "Base Text",
                    newTextName: "New Text",
                    contextSize: null,
                    viewType: viewType
                });
                this.compareView=compareViewEl.outerHTML;

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
    .compareView{
        width: 100%;
        overflow: auto;
        text-align: left;
    }
</style>