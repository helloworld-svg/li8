<template>
  <div id="regis">
    <div v-show="user_sty">
      <div class="regis_b" v-show="regi_sty">
        <form>
          <input type="text" placeholder="请输入邮箱" v-model="regi.text" />
          <input type="password" placeholder="请输入密码" v-model="regi.password" />
        </form>
        <button @click="regis(1)" class="buttons">确认</button>
        <span class="one" @click="regits()">注册</span>
        <span>找回密码</span>
      </div>
      <div class="regis_b" v-show="!regi_sty">
        <form>
          <input type="text" placeholder="请输入邮箱" v-model="regit.text" />
          <input type="password" placeholder="请输入密码" v-model="regit.password" />
          <input type="text" placeholder="请输入验证码" v-model="regit.veri" />
        </form>
        <div id="buttons">
          <button @click="veris()" class="buttonsm">获取邮箱验证码</button>
          <button @click="regis(0)" class="buttonsm">确认</button>
        </div>
      </div>
    </div>
    <div v-show="!user_sty" class="regis_b_false">
      尊敬的：&nbsp;{{user_name}}&nbsp;&nbsp;&nbsp;&nbsp;您好
      <br />您已登录，无需再次登录，如需切换账号，请点击下方按钮
      <br />
      <br />
      <button class="buttons" @click="user_quit()">退出</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user_sty: true,
      regi: {
        text: null,
        password: null,
      },
      regit: {
        text: null,
        password: null,
        veri: null,
      },
      regi_sty: true,
      user_name:null,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  mounted() {
    if (this.$route.params.title == 0) {
      this.regits();
    }
    if (localStorage.getItem("user_name")) {
      this.user_name=localStorage.getItem('user_name')
      this.user_sty = !this.user_sty;
    }
  },
  methods: {
    regis(data) {
      if (data == 1) {
        const regEmail =
          /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (regEmail.test(this.regi.text)) {
          if (this.regi.password) {
            this.$https
              .post("/login/", {
                email: this.regi.text,
                password: this.regi.password,
              })
              .then((res) => {
                if (res.code == 0) {
                  localStorage.setItem("token", res.info.token);
                  localStorage.setItem("user_name", this.regi.text);
                  this.$store.commit('tokens_sty',this.regi.text)
                  this.$router.push({
                    name: "Home",
                  });
                }
                this.open1(res.msg);
                this.regi.text = null;
                this.regi.password = null;
              });
          } else {
            this.open1("密码格式错误");
          }
        } else {
          this.open1("请填写正确的邮箱名");
        }
      } else {
        this.$https
          .post("/register/", {
            email: this.regit.text,
            password: this.regit.password,
            emailcode: this.regit.veri,
          })
          .then((res) => {
            this.regits();
            this.open1(res.msg);
            this.regit.text = null;
            this.regit.password = null;
            this.regit.veri = null;
          });
      }
    },
    open1(data) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, data),
      });
    },
    regits() {
      this.regi_sty = !this.regi_sty;
    },
    veris() {
      this.$https.get(`/register/email?email=1399149390@qq.com`).then((res) => {
        this.open1(res.msg);
      });
    },
    user_quit() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      this.$store.commit('tokens_sty',null)
      this.open1('已退出')
      this.$router.push({
        name: "Home",
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
.regis_b {
  width: 500px;
  height: 320px;
  background: rgb(255, 255, 255, 0.8);
  position: absolute;
  right: 30%;
  top: 15%;
  border-radius: 5px;
}
.regis_b_false {
  width: 500px;
  height: 280px;
  background: rgb(255, 255, 255, 0.8);
  position: absolute;
  right: 30%;
  top: 15%;
  border-radius: 5px;
  text-align: center;
  padding-top: 40px;
  font-size: 14px;
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
.buttonsm {
  border: 0px;
  background: #409eff;
  display: block;
  color: #fff;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  float: left;
  margin: 0px 10px 0px;
  font-size: 12px;
}
.buttons {
  border: 0px;
  background: #409eff;
  display: block;
  color: #fff;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  outline: none;
  margin: 30px auto 0px;
  font-size: 15px;
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
#buttons {
  width: 240px;
  height: 30px;
  margin: 30px auto;
}
</style>