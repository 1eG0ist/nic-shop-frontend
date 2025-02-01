<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
