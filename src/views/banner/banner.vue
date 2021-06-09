<template>
  <div id="banners">
    <div
      id="one"
      class="img"
      :style="{left:one+'%',top:one_top+'px',width:one_width+'%',height:one_height+'px'}"
      :class="{zindex:one_z}"
    >
    </div>
    <div
      id="two"
      class="img"
      :style="{left:two+'%',top:two_top+'px',width:two_width+'%',height:two_height+'px',}"
      :class="{zindex:two_z}"
    >
    </div>
    <div
      id="three"
      class="img"
      :style="{left:three+'%',top:three_top+'px',width:three_width+'%',height:three_height+'px'}"
      :class="{zindex:three_z}"
    >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      one: 2,
      two: 30,
      three: 68,
      one_width: 30,
      two_width: 40,
      three_width: 30,
      one_height: 300,
      two_height: 350,
      three_height: 300,
      one_top: 25,
      two_top: 0,
      three_top: 25,
      one_z: false,
      two_z: true,
      three_z: false,
    };
  },
  mounted() {
    setInterval(this.roll,2000)
  },
  methods: {
    roll() {
      let a = this.one;
      this.one = this.two;
      this.two = this.three;
      this.three = a;
      if (this.one == 30) {
        a = this.one_width;
        this.one_width = this.two_width;
        this.two_width = this.three_width;
        this.three_width = a;
        a=this.one_height;
        this.one_height=this.two_height;
        this.two_height=this.three_height;
        this.three_height=a;
        a=this.one_top;
        this.one_top=this.two_top;
        this.two_top=this.three_top;
        this.three_top=a;
        (this.one_z = true), (this.two_z = false);
      }
      if (this.two == 30) {
        a = this.two_one;
        this.two_width = this.three_width;
        this.three_width = this.one_width;
        this.one_width = a;
        a=this.two_height;
        this.two_height=this.three_height;
        this.three_height=this.one_height;
        this.one_height=a;
        a=this.two_top;
        this.two_top=this.three_top;
        this.three_top=this.one_top;
        this.one_top=a;
        (this.two_z = true), (this.three_z = false);
      }
      if (this.three == 30) {
        a = this.three_width;
        this.three_width = this.one_width;
        this.one_width = this.two_width;
        this.two_width = a;
        a=this.three_height;
        this.three_height=this.one_height;
        this.one_height=this.two_height;
        this.two_height=a;
        a=this.three_top;
        this.three_top=this.one_top;
        this.one_top=this.two_top;
        this.two_top=a;
        (this.three_z = true), (this.one_z = false);
      }
    },
  },
};
</script>

<style scoped>
#banners {
  width: 100%;
  height: 350px;
  position: relative;
}
.img {
  width: 30%;
  height: 350px;
  position: absolute;
  transition:1s;
  background: #999;
}

.zindex {
  z-index: 100000;
}
</style>