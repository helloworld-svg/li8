<template>
  <div id="body_box">
    <div id="paper">
      <div id="newpaper">
        <h4>最新论文</h4>
        <ul>
          <li
            v-for="(it,x) in papers_item.item"
            :key="x"
            v-if="x%2==0"
          >{{it.title}} ----- {{it.author}}</li>
        </ul>
      </div>
      <div id="newpaper2">
        <h4>最新论文</h4>
        <ul>
          <li
            v-for="(it,x) in papers_item.item"
            :key="x"
            v-if="x%2!=0"
          >{{it.title}} ----- {{it.author}}</li>
        </ul>
      </div>
      <div id="newadva">
        <h4>优秀文章</h4>
        <div v-html="papers_detail_item.item[0].content"></div>
      </div>
      <div id="newdata">
        <h4>最新上传</h4>
        <ul>
          <li
            v-for="(it,x) in papers_item.item"
            :key="x"
          >{{it.title}} ----- {{it.createTime | renderTime}}</li>
        </ul>
      </div>
      <div id="limit">
        <h4>其他</h4>
      </div>
    </div>
    <div id="notice">
      <div class="tice">
        <h4>公告列表</h4>
        <ul>
          <li v-for='(item,x) in notice.item' :key='x'>
            {{item.id}}.{{item.title}}
          </li>
        </ul>
      </div>
      <div class="tice">
        <h4>部分内容</h4>
        <div v-html='notice_detail.item[0].content'></div>
      </div>
      <div class="tice">
        <h4>公告内容</h4>
        <ul>
          <li v-for="(item,x) in notice.item" :key='x'>
            由&nbsp;&nbsp;&nbsp;{{item.author}}&nbsp;&nbsp;发布了：
            {{item.title}} 
            <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
        pageSize: "2",
        item: [],
      },
      papers_detail_item: {
        id: "1",
        item: [{ content: null }],
      },
      notice: {
        page: "1",
        pageSize: "2",
        item: [],
      },
      notice_detail:{
        id:1,
        item:[{content:null}],
      }
    };
  },
  mounted() {
    this.papers();
    this.paper_detail();
    this.notices()
    this.notices_detail()
  },
  methods: {
    papers() {
      this.$https
        .get(
          `/paper/?page=${this.papers_item.page}&pageSize=${this.papers_item.pageSize}`
        )
        .then((res) => {
          this.papers_item.item = res.data;
        });
    },
    paper_detail() {
      this.$https
        .get(`/paper/detail/?id=${this.papers_detail_item.id}`)
        .then((res) => {
          this.papers_detail_item.item = res.data;
        });
    },
    notices() {
      this.$https.get(`/notice/?page=${this.notice.page}&pageSize=${this.notice.pageSize}`).then(
        (res)=>{
          this.notice.item=res.data
        }
      );
    },
    notices_detail(){
      this.$https.get('/notice/detail/?id=1').then(
        (res)=>{
          this.notice_detail.item=res.data
        }
      )
    }
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
#limit {
  width: 86.5%;
  height: 30%;
  border: 1px solid #000;
  float: left;
  clear: both;
  margin: 5% 0px 0px 6.5%;
  position: relative;
}
h4 {
  margin: 0px;
  color: #888;
  position: absolute;
  top: -13px;
  left: 10px;
  background: #fff;
}
ul {
  margin: 0px;
  padding: 0px 10px;
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
.tice>div{
  font-size: 10px;
  margin: 10px 0px 0px 0px;
  overflow-y: scroll;
  width: 100%;
  height: 95%;
}
</style>