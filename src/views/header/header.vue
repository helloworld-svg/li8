<template>
  <div id="headers">
    <a href="tel:515528129">点击联系我们</a>
    <ul>
      <li @mousedown="regi(1)">登录</li>
      <li @mousedown="regi(0)">注册</li>
      <li id="me_box">
        我的
        <div class="me" v-if="token">
          <p>
            您好，尊敬的：
            <br />
            {{token}}
            <br />退出
          </p>
        </div>
        <div class="me" v-else>
          <br />
          <p @mousedown="regi(1)">请先登录</p>
        </div>
      </li>
      <li @mousedown="rachs()">发表论文</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    console.log(localStorage.getItem('user_name'));
    localStorage.getItem('user_name') && this.$store.commit('token_it', localStorage.getItem('user_name'));
  },
  methods: {
    regi(data) {
      this.$router.push({
        name: "regi",
        params: {
          title: data,
        },
      });
    },
    rachs() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push({
          name: "rach",
        });
      } else {
        this.open1("请先登录");
      }
    },
    open1(data) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, data),
      });
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>

<style scoped>
#headers {
  width: 90%;
  height: 30px;
  background: #f6f6f6;
  margin: 0px auto;
}
a {
  text-decoration: none;
  color: #888;
  float: left;
  margin: 0px 20px;
  line-height: 30px;
  font-size: 10px;
}
ul {
  padding: 0px;
  margin: 0px;
  float: right;
}
li {
  list-style-type: none;
  float: left;
  color: #888;
  line-height: 30px;
  margin: 0px 20px;
  font-size: 12px;
}
#me_box {
  position: relative;
}
#me_box:hover .me {
  display: block;
}
.me {
  position: absolute;
  width: 100px;
  height: 100px;
  background: #fff;
  z-index: 10000;
  left: -35px;
  box-shadow: 1px 1px 1px 1px #888;
  border-radius: 5px;
  display: none;
  text-align: center;
  color: #000;
  line-height: 20px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>