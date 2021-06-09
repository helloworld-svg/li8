<template>
    <div class="edit_container">
        <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>
import { quillEditor } from "../richtext/node_modules/vue-quill-editor"; //调用编辑器
import '../richtext/node_modules/quill/dist/quill.core.css';
import '../richtext/node_modules/quill/dist/quill.snow.css';
import '../richtext/node_modules/quill/dist/quill.bubble.css';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: null,
            editorOption: {}
        }
    },
    methods: {
        
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}
</script>