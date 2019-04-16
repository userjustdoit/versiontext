<template>
    <div class="content">
        <div v-for="item in allItems">
            {{item}}
        </div>
    </div>
</template>

<script>
    import versionStorageTool from '@/base/util/versionStorageTool.js'
    export default {
        name: "ItemList",
        components: {
        },
        data() {
            return {
                allItems:[],
            }
        },
        mounted() {
           this.refresh();
        },
        methods: {
            refresh(){
                this.allItems=versionStorageTool.getAllItemKeys();
            }
        },
        computed: {},
    }
</script>

<style scoped>

</style>