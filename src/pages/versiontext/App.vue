<template>
  <div id="app">
    <VersionEditor/>
  </div>
</template>

<script>
import VersionEditor from './VersionEditor'

export default {
  name: 'App',
  components: {
     VersionEditor,
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', 微软雅黑, arial, simsun, 宋体;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 15px;
  max-width: 960px;
  margin:0 auto;
}
</style>
