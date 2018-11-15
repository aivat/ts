<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './views/Header.vue'

export default {
    components: {
      Header
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
body {
  font-family: Roboto, RobotoDraft, Helvetica, Arial;
  margin: 0;
  font-size: 16px;
  overflow-y: scroll;
  color: #333;
  background-color: rgb(242, 245, 248);
}
</style>
