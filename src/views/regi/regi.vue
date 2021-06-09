<template>
  <div id="regis">
    <div id="regis_b">
      <form>
        <input type="text" placeholder="请输入邮箱" v-model="text" />
        <input type="text" placeholder="请输入密码" v-model="password" />
      </form>
      <button @click="regis()">确认</button>
      <span class="one">注册</span>
      <span>找回密码</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      password: null,
    };
  },
  methods: {
    regis() {
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(this.text)) {
        this.$https
          .post("/login/", {
            email: this.text,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            this.open1(res.msg+'请点击注册')
          });
      } else {
        this.open1('邮箱名错误')
      }
    },
    open1(data) {
      const h = this.$createElement;

      this.$notify({
        title: "警告",
        message: h(
          "i",
          { style: "color: teal" },
          data
        ),
      });
    },
  },
};
</script>

<style scoped>
#regis {
  width: 100vw;
  height: 100vh;
  background: url("./img/regiback.jpg");
  background-size: 100% 100%;
  position: relative;
}
#regis_b {
  width: 500px;
  height: 320px;
  background: rgb(255, 255, 255, 0.8);
  position: absolute;
  right: 30%;
  top: 15%;
  border-radius: 5px;
}
form {
  margin-top: 40px;
}
input {
  width: 70%;
  height: 30px;
  margin: 10px auto 0px;
  display: block;
  outline: none;
}
button {
  border: 0px;
  background: #409eff;
  display: block;
  margin: 30px auto;
  color: #fff;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  outline: none;
}
.one {
  padding-left: 110px;
}
span {
  display: block;
  float: left;
  margin: 50px 20px 0px;
  font-size: 12px;
  color: #409eff;
}
</style>