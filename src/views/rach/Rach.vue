<template>
  <div>
    <quill-editor
      class="editor"
      v-model="add.content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <div id="Submitbox" :style="{display:submit_sty}">
      <form>
        <input type="text" placeholder="请输入标题" class="inputs" v-model="add.title"/>
        <input type="text" placeholder="请输入作者姓名" class="inputs" v-model="add.author"/>
        <input type="text" placeholder="请输入分类" class="inputs" v-model="add.category"/>
        <input type="button" value="提交" id="buttons" @click='submitstys(0)'/>
      </form>
    </div>
    <button class="buttons" @click="submitstys(1)">确认提交</button>
  </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
];

import { quillEditor } from "../richtext/node_modules/vue-quill-editor"; //调用编辑器
import "../richtext/node_modules/quill/dist/quill.core.css";
import "../richtext/node_modules/quill/dist/quill.snow.css";
import "../richtext/node_modules/quill/dist/quill.bubble.css";

export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String,
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000, //kb
    },
  },
  components: {
    quillEditor,
  },

  data() {
    return {
      submit_sty: "none",
      add:{
        content:null,
        title:null,
        author:null,
        category:null,
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      serverUrl: "/v1/blog/imgUpload", // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
    };
  },

  methods: {
    open1(data) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, data),
      });
    },
    submitstys(data) {
      if(data){
        this.submit_sty='block'
      }else{
        this.$https.post('/paper/add',{
          ...this.add
        }).then(
          (res)=>{
            this.open1(res.msg)
            if(res.code==0){
              this.add.content=null
              this.add.title=null
              this.add.author=null
              this.add.category=null
            }
          }
        )
        this.submit_sty='none'
      }
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },

    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
  },
};
</script> 

<style>
.editor {
  line-height: normal !important;
  height: 90vh;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.buttons {
  width: 80px;
  height: 30px;
  border: 0px;
  background: #409eff;
  color: #fff;
  border-radius: 5px;
  display: block;
  position: fixed;
  bottom:5%;
  left:47%;
}
#buttons {
  width: 80px;
  height: 30px;
  border: 0px;
  background: #409eff;
  color: #fff;
  border-radius: 5px;
  margin: 0px auto;
  display: block;
}
#Submitbox {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 30%;
  box-shadow: 2px 2px 2px 2px #888;
  background: #f9f9f9;
}
.inputs {
  width: 200px;
  height: 30px;
  border: 0px;
  display: block;
  margin: 30px auto;
  border: 1px #888 solid;
  outline: none;
  border-radius: 5px;
}
</style>