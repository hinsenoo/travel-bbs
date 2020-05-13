<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left"></div>
        <div ref="editorElemBox" class="text">
            <p>请输入内容</p>
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor';
    export default {
        name: 'Editor',
        data(){
            return {
                editor: '',
                editorContent: ''
            }
        },
        // catchData 由父组件传入的函数，用于父组件中获取 editor 中的内容
        // content 作为初始化的数据（编辑时可以从服务器获取文章详情，效果是当请求完成将文章详情展示到 editor 中实现可编辑）
         props: ['catchData', 'content'],    // 接收父组件的方法
        watch: {
            content () {
            this.editor.txt.html(this.content)
            }
        },
        mounted(){
            this.editor = new E(this.$refs.editorElem, this.$refs.editorElemBox);
            // 用户操作导致的内容变化之后，会自动触发 onchange 函数执行
            // 若通过 JS 修改 html 内容，则通过 editor.change() 来手动触发 
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }

            // 编辑区域的z-index
            this.editor.customConfig.zIndex = 10;

            // 图片上传接口
            this.editor.customConfig.uploadImgServer = 'http://47.106.215.69:8080/tourism/user/upload/';
            this.editor.customConfig.uploadFileName = 'file'
            // 配置菜单
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'foreColor',  // 文字颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'image',  // 插入图片
                'table',  // 表格
                'undo',  // 撤销
                'redo'  // 重复
            ]

            let that = this;
            // 图片上传监听函数
            this.editor.customConfig.uploadImgHooks = {
                success() {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    that.$message.success('成功插入图片');
                },
                fail(){
                    that.$message.error('图片插入失败');
                },
                error() {
                    // 图片上传出错时触发
                    that.$message.error('图片上传出错');
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout() {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    that.$message.error('图片上传超时');
                },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert(insertImg, result) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = result.data;
                    // 插入图片
                    insertImg(url);

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };

            this.editor.create()     // 创建富文本实例

        }
    }
</script>

<style lang="scss" scoped>
    #wangeditor{
        // width: 100%;
        .text{
            min-height: 500px;
        }
        .w-e-text-container{
            height: 300px !important;
        }
    }
</style>