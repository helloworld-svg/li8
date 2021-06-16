<template>
  <div id="body_box">
    <div id="paper">
      <div id="newpaper">
        <h4>最新论文</h4>
        <div class="overs" :class="{over:over_hidden.overs1}">
          <ul>
            <li
              v-for="(item,x) in papers_item.item"
              :key="x"
              v-if="x%2==0"
            >{{item.title}} ----- {{item.author}}</li>
          </ul>
        </div>
      </div>
      <div id="newpaper2">
        <h4>最新论文</h4>
        <div class="overs" :class="{over:over_hidden.overs1}">
          <ul>
            <li
              v-for="(item,x) in papers_item.item"
              :key="x"
              v-if="x%2!=0"
            >{{item.title}} ----- {{item.author}}</li>
          </ul>
        </div>
      </div>
      <div id="newadva">
        <h4>优秀文章</h4>
        <div v-html="papers_detail_item.item[0].content"></div>
      </div>
      <div id="newdata">
        <h4>最新上传</h4>
        <div :class="{over:over_hidden.overs2}">
          <ul>
            <li
              v-for="(item,x) in papers_item.item"
              :key="x"
            >{{item.title}} ----- {{item.createTime | renderTime}}</li>
          </ul>
        </div>
      </div>
      <div id="limit">
        <h4>其他</h4>
        <div id="pro_limit0">
          <div v-html="papers_detail_item.item1[0].content"></div>
        </div>
        <div id="pro_limit1">
          <button
            v-for="(item,x) in limits_data.limits"
            :key="x"
            @click="limitsm(1,x,item)"
          >{{item}}</button>
          <form>
            <input
              type="text"
              placeholder="请输入想要跳转的页面"
              v-model="limits_data.limit_data"
              @keydown.enter="limitsm(0)"
            />
          </form>
          <select v-model="limits_data.pagesize" @change="pagesize_data()">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
    <div id="notice">
      <div class="tice">
        <h4>公告列表</h4>
        <ul>
          <li v-for="(item,x) in notice.item" :key="x">{{item.id}}.{{item.title}}</li>
        </ul>
      </div>
      <div class="tice">
        <h4>部分内容</h4>
        <div v-html="notice_detail.item[0].content"></div>
      </div>
      <div class="tice">
        <h4>公告内容</h4>
        <ul>
          <li v-for="(item,x) in notice.item" :key="x">
            由&nbsp;&nbsp;&nbsp;{{item.author}}&nbsp;&nbsp;发布了：
            {{item.title}}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;------ {{item.createTime | renderTime}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      papers_item: {
        page: "1",
        pageSize: "10",
        item: [],
      },
      papers_detail_item: {
        item: [{}],
        item1: [{}],
      },
      notice: {
        page: "1",
        pageSize: "10",
        item: [],
      },
      notice_detail: {
        id: 1,
        item: [{}],
      },
      over_hidden: {
        overs1: false,
        overs2: false,
      },
      limits_data: {
        limits: [1, 2, 3, 4, 5, 6, 7],
        limit_data: null,
        pagesize: 10,
      },
    };
  },
  mounted() {
    this.papers();
    this.notices();
    this.notices_detail();
  },
  methods: {
    papers() {
      this.$https
        .get(
          `/paper/?page=${this.papers_item.page}&pageSize=${this.papers_item.pageSize}`
        )
        .then((res) => {
          this.papers_item.item = res.data;
          this.paper_detail(res.data[0], res.data[1]);
        });
    },
    paper_detail(data0, data1) {
      this.$https.get(`/paper/detail/?id=${data0.id}`).then((res) => {
        this.papers_detail_item.item = res.data;
      });
      this.$https.get(`/paper/detail/?id=${data1.id}`).then((res) => {
        this.papers_detail_item.item1 = res.data;
      });
    },
    notices() {
      this.$https
        .get(
          `/notice/?page=${this.notice.page}&pageSize=${this.notice.pageSize}`
        )
        .then((res) => {
          this.notice.item = res.data;
        });
    },
    notices_detail() {
      this.$https.get("/notice/detail/?id=1").then((res) => {
        this.notice_detail.item = res.data;
      });
    },
    limitsm(m_data, x_data, data) {
      if (m_data) {
        if (x_data > 3) {
          this.limits_data.limits = [];
          this.limits_data.limits[0] = data - 3;
          for (let a = 0; a <= 6; a++) {
            this.limits_data.limits[a] = this.limits_data.limits[0] + a;
          }
        } else {
          if (data <= 4) {
            this.limits_data.limits = [];
            this.limits_data.limits[0] = 1;
            for (let a = 0; a <= 6; a++) {
              this.limits_data.limits[a] = this.limits_data.limits[0] + a;
            }
          } else {
            this.limits_data.limits = [];
            this.limits_data.limits[0] = data - 3;
            for (let a = 0; a <= 6; a++) {
              this.limits_data.limits[a] = this.limits_data.limits[0] + a;
            }
          }
        }
        this.papers_item.page = data;
      } else {
        if (this.limits_data.limit_data >= 1) {
          this.papers_item.page = this.limits_data.limit_data;
        }
      }
      this.papers();
    },
    pagesize_data() {
      this.limits_data.pagesize >= 20
        ? (this.over_hidden.overs2 = true)
        : (this.over_hidden.overs2 = false);
      this.limits_data.pagesize >= 50
        ? (this.over_hidden.overs1 = true)
        : (this.over_hidden.overs1 = false);
      this.papers_item.pageSize = this.limits_data.pagesize;
      this.papers();
    },
  },
  filters: {
    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  },
};
</script>

<style scoped>
.over {
  overflow-y: scroll;
}
#body_box {
  width: 1000px;
  height: 1000px;
  margin: 10px auto 0px;
}
#paper {
  width: calc(70% - 2px);
  height: 100%;
  border: 1px #000 solid;
  float: left;
}
#notice {
  width: calc(30% - 2px);
  height: 100%;
  border: 1px #000 solid;
  float: left;
}
#newpaper {
  width: 40%;
  height: 30%;
  border: 1px solid #000;
  border-top: 5px #ffd75c solid;
  float: left;
  margin: 2.5% 0px 0px 6.5%;
  position: relative;
}
#newpaper2 {
  width: 40%;
  height: 30%;
  border: 1px solid #000;
  float: left;
  margin: 2.5% 0px 0px 6.5%;
  position: relative;
}
#newadva {
  width: 40%;
  height: 30%;
  border: 1px solid #000;
  clear: both;
  float: left;
  margin: 2.5% 0px 0px 6.5%;
  position: relative;
}
#newadva > div {
  font-size: 10px;
  margin: 10px 0px 0px 0px;
  overflow-y: scroll;
  width: 100%;
  height: 95%;
}
#newdata {
  width: 40%;
  height: 30%;
  border: 1px solid #000;
  float: left;
  margin: 2.5% 0px 0px 6.5%;
  position: relative;
}
#newdata div {
  width: 100%;
  height: 100%;
}
#limit {
  width: 86.5%;
  height: 30%;
  border: 1px solid #000;
  float: left;
  clear: both;
  margin: 5% 0px 0px 6.5%;
  position: relative;
}
.overs {
  width: 100%;
  height: 100%;
}
h4 {
  margin: 0px;
  color: #888;
  position: absolute;
  top: -13px;
  left: 10px;
  background: #fff;
}
h5 {
  margin: 0px;
  color: #888;
  position: absolute;
  top: -13px;
  left: 10px;
  background: #fff;
}
ul {
  margin: 0px;
  padding: 0px 0px;
}
li {
  list-style-type: none;
  margin: 10px 0px 0px 0px;
  font-size: 12px;
}
.tice {
  width: 90%;
  height: 30%;
  border: 1px solid #000;
  margin: 8% auto 0px;
  position: relative;
}
.tice > div {
  font-size: 10px;
  margin: 10px 0px 0px 0px;
  overflow-y: scroll;
  width: 100%;
  height: 95%;
}
#pro_limit0 {
  width: 100%;
  height: calc(100% - 56px);
  margin-top: 10px;
  overflow-y:scroll ;
}
#pro_limit1 {
  position: relative;
  width: 100%;
  height: 46px;
}
#pro_limit1 button {
  border: 0px;
  margin: 8px;
  width: 30px;
  height: 30px;
  background: #409eff;
  color: #fff;
  border-radius: 5px;
  float: left;
}
#pro_limit1 input {
  width: 140px;
  height: 25px;
  float: left;
  margin: 10.5px 8px;
  border: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 5px;
  color: #888;
}
#pro_limit1 select {
  width: 100px;
  height: 25px;
  float: left;
  margin: 10.5px 8px;
  border: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 5px;
  color: #888;
}
</style>