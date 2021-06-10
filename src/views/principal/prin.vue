<template>
  <div id='body_box'>
    <div id='paper'>
      <div id='newpaper'></div>
      <div id='newadva'></div>
      <div id='newdata'></div>
      <div id=''></div>
      <div></div>
    </div>
    <div id='notice'>

    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  #body_box{
    width:1000px;
    height:1000px;
    margin:10px auto 0px;
  }
  #paper{
    width:calc(70% - 2px);
    height:100%;
    border:1px #000 solid;
    float:left;
  }
  #notice{
    width:calc(30% - 2px);
    height:100%;
    border:1px #000 solid;
    float:left;
  }
</style>