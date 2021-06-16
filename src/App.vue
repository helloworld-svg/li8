<template>
  <div>
    <div v-show='$store.state.app_topsty'>
      <div id="header">
      <headers></headers>
    </div>
    <div id="nav">
      <navs></navs>
    </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import headers from "./views/header/header.vue";
import navs from "./views/nav/nav.vue";
export default {
  components:{
    headers,
    navs,
  }
};
</script>

<style>
</style>