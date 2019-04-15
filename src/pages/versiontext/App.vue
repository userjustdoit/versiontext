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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
