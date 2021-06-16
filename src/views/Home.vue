<template>
  <div>
    <div id="banner">
      <banner></banner>
    </div>
    <div id="prin">
      <prin></prin>
    </div>
  </div>
</template>

<script>

import banner from "../views/banner/banner.vue";
import prin from "../views/principal/prin.vue";
export default {
  components: {
    banner,
    prin,
  },
};
</script>

<style>
#header {
  width: 100%;
  height: auto;
  background: #f6f6f6;
}
#nav {
  width: 100%;
  height: 100%;
  background: #fff;
}
#banner {
  width: 100%;
  height: auto;
}
</style>