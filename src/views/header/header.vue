<template>
  <div id='headers'>
    <a href="tel:515528129">点击联系我们</a>
    <ul>
      <li @mousedown="regi()">登录</li>
      <li>注册</li>
      <li>发表论文</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods:{
    regi(){
      this.$router.push({
        name:'regi'
      })
    }
  }
};
</script>

<style scoped>
#headers{
    width:90%;
    height:30px;
    background:#f6f6f6;
    margin:0px auto;
}
a{
    text-decoration: none;
    color:#888;
    float:left;
    margin:0px 20px;
    line-height: 30px;
    font-size:10px;
}
ul{
    padding:0px;
    margin: 0px;
    float: right;
}
li{
    list-style-type: none;
    float:left;
    color:#888;
    line-height:30px;
    margin:0px 20px;
    font-size:12px;
}
</style>