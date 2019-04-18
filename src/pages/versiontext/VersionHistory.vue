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
                    if(index>0){
                        let before=this.versions[index-1];
                        let base = difflib.stringAsLines(before.text);
                        let newTxt =difflib.stringAsLines(version.text);
                        let sm = new difflib.SequenceMatcher(base, newTxt);
                        let opCodes = sm.get_opcodes();
                        let compareViewEl=diffview.buildView({
                            baseTextLines: base,
                            newTextLines: newTxt,
                            opcodes: opCodes,
                            baseTextName: `版本 ${index}`,
                            newTextName: `版本 ${index+1}`,
                            contextSize: null,
                            viewType: 1
                        });
                        this.compareView.push(compareViewEl.outerHTML);
                    }
                })
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
    }
</style>
