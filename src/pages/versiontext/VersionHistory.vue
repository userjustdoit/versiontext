<template>
    <div class="content">
        <div class="compareView" v-html="item" v-for="item in compareView"></div>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script>
    import VersionStorageTool from '@/base/util/versionStorageTool.js'
    export default {
        name: "VersionHistory",
        components: {},
        data() {
            return {
                versions:[],
                key:null,
                compareView:[],
            }
        },
        mounted() {
            this.initHandel();
        },
        methods: {
            initHandel(){
                this.key=this.$route.query.key;
                if(this.key){
                    this.versions=VersionStorageTool.getItemByItemKey(this.key);
                    this.initCompareView();
                }else{
                    this.showMessage('没有记录!');
                }
            },
            initCompareView(){
                this.versions.forEach((version,index)=>{
                        let baseText=index==0?'':this.versions[index-1].text;
                        let newText= version.text;
                        this.pushCompareViewEl(baseText,newText,`版本 ${index}`,`版本 ${index+1}`);
                })
                let versionLength=this.versions.length;
                if(versionLength>1){//最后一个版本
                    let baseText=this.versions[versionLength-1].text;
                    let newText=baseText;
                    this.pushCompareViewEl(baseText,newText,'end','end');
                }
            },
            pushCompareViewEl(baseText,newText,baseTextName,newTextName){
                let base = difflib.stringAsLines(baseText);
                let newTxt =difflib.stringAsLines(newText);
                let sm = new difflib.SequenceMatcher(base, newTxt);
                let opCodes = sm.get_opcodes();
                let compareViewEl=diffview.buildView({
                    baseTextLines: base,
                    newTextLines: newTxt,
                    opcodes: opCodes,
                    baseTextName: baseTextName,
                    newTextName: newTextName,
                    contextSize: null,
                    viewType: 1
                });
                this.compareView.push(compareViewEl.outerHTML);
            }
        },
        computed: {},
    }
</script>

<style scoped>
    .compareView{
        width: 100%;
        overflow: auto;
        text-align: left;
        margin-top: 20px;
        word-break: break-all;
    }
</style>
