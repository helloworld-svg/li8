<template>
  <div id="navs">
    <img src="@/img/tpy.png" id="logo" />
    <ul id="classify">
      <li v-for='(item,x) in classify' :key='x'>
          {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$https.get('/category/').then(
      (res)=>{
        this.classify=res.data
      }
    )
  },
  data() {
    return {
        classify:['专题类','论辩类','综述类','综合性','数学','物理','化学','历史']
    };
  },
};
</script>

<style scoped>
#navs {
  width: 90%;
  height: 50px;
  background: #fff;
  margin: 0px auto;
}
#logo {
  height: 50px;
  float: left;
}
ul{
    padding:0px;
    margin:0px;
    line-height: 50px;
    float:right;
}
li{
    float:left;
    list-style-type: none;
    margin:0px 15px;
    font-size:10px;
}
</style>