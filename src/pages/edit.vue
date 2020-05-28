<template>
    <div class="write">
        <el-backtop>
            <div
            style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
                border-radius: 40px;
            }"
            >
                <i class="el-icon-caret-top"></i>
            </div>
        </el-backtop>
        <div class="edit-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/index"></a>
                </div>
                <div class="header-title">
                    {{pageType == 'write' ? '写文章': '编辑文章' }}
                </div>
                <div class="header-button">
                    <el-button type="primary" round @click="publish" v-loading.fullscreen.lock="fullscreenLoading">发布<i class="el-icon-tickets"></i></el-button>
                    <div class="person">
                        <el-dropdown class="avatar" trigger="click" @command="handleCommand">
                            <el-avatar size="medium" :src="userAvatar"></el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="avatar-icon" command="personal"><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item>
                                <el-dropdown-item command="collect"><i class="el-icon-s-management"></i>收藏夹</el-dropdown-item>
                                <el-dropdown-item command="setting"><i class="el-icon-s-tools"></i>设置</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container">
                <div class="photo" ref="photo" @click="uploadPhoto">
                    <div class="mask">
                        <i class="el-icon-camera"></i>
                        <span>选择标题图片</span>
                    </div>
                    <input @change="onUpload" ref="uploadImg" type="file" accept="image/*" value="" />
                    <img v-show="uploadImgShow" :src="titleImgUrl" alt="标题图片">
                </div>
                <div class="title">
                    <el-input v-model="title" placeholder="请输入文章标题"></el-input>
                    <div class="other">
                        <div class="left">
                            <span>分类：</span>
                            <el-select v-model="category" placeholder="文章分类">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="right">
                            <span>位置：</span>
                            <el-input v-model="place" placeholder="请输入游玩地区"></el-input>
                        </div>
                    </div>
                </div>
                <div class="rule"></div>
                <div class="content-editor">
                    <editor :catchData="catchData" :content="content">
                        <template v-slot:word>
                            <p>在这留下你最美好的回忆..</p>
                        </template>
                    </editor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import editor from '../components/Editor'
    export default {
        name: 'write',
        data(){
            return {
                // 文章id
                articleId: '',
                // 作者 id
                userId: '',
                // 文章标题
                title: '',
                // 分类列表
                category: '',
                // 位置
                place: '',
                // 文章内容 HTML 格式
                articleHTML: '',
                options: [
                    {
                        value: '游记',
                        label: '写游记'
                    }, 
                    {
                        value: '攻略',
                        label: '记攻略'
                    }, 
                    {
                        value: '讨论',
                        label: '讨论贴'
                    }
                ],
                // 标题图片显示
                uploadImgShow: false,
                // 标题图片地址
                titleImgUrl: '',
                // 上传标签节点
                inputNode: '',
                // 页面类型
                pageType: 'write',
                // 初始化文章
                content: '',
                // loading
                fullscreenLoading: false,
            }
        },
        components: {
            editor
        },
        mounted(){
            this.pageType = this.$route.params.id;
            if(this.pageType !== 'write'){
                // 拉取文章信息渲染
                this.axios.get(`/api/article/${Number(this.pageType)}`)
                .then((res)=>{
                    console.log(res);
                    if(res.status == 0){
                        this.title = res.data.title;
                        this.titleImgUrl = res.data.titleImgUrl;
                        this.uploadImgShow = true;
                        this.$refs.photo.style = "height: auto";
                        this.category = res.data.category;
                        this.place = res.data.place;
                        this.content = this.$Base64.decode(res.data.articleHTML);
                    }else{
                        this.$message.error('获取文章内容失败');
                    }
                })

            }
        },
        computed: {
            // 用户头像
            userAvatar(){
                return this.$store.state.userMessage.userAvatar;
            },
        },
        methods:{
            uploadPhoto(){
                this.$refs.uploadImg.click();
            },
            // 选取图片文件后触发
            onUpload(){
                let file = this.$refs.uploadImg.files[0];
                let data = new FormData();
                data.append('file', file);
                // 图片上传前验证大小
                const isLt2M = file.size / 1024 / 1024 < 5
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                    return
                }
                
                // 发送图片上传请求
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                this.axios.post("http://47.106.215.69:8080/tourism/user/upload/", data, config).then(res => {
                    if(res.status == 0){
                        this.titleImgUrl = res.data;
                        this.uploadImgShow = true;
                        this.$refs.photo.style = "height: auto";
                        this.$message.success('图片上传成功');
                    }else{
                        this.$message.error('图片上传失败');
                    }
                })
            },
            // 获取编辑器内的数据
            catchData(html){
                this.articleHTML = html;
            },

            publish(){
                let errMsg = '';
                // 判断错误类型
                if(!this.title){
                    errMsg = '请输入文章标题';
                }else if(!this.titleImgUrl){
                    errMsg = '请上传标题图片';
                }else if(!this.category){
                    errMsg = '请选择文章分类';
                }else if(!this.articleHTML){
                    errMsg = '请输入文章内容';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    // return;
                }
                // let data = {
                //     userId: 19,
                //     title: "走四方，百公里骑行北太湖",
                //     titleImgUrl: "http://47.106.215.69:8080/images/avatar/af89b8bd-b9c2-4680-b884-04af2de227d1.jfif",
                //     category: "游记",
                //     place: "安徽",
                //     articleHTML: `<p data-v-59a318e4="" data-v-e18b6dc6="">今天我休息，爱好户外的人经常休而不息。望着窗外黑黢黢的天空，听着空中呼呼作响的风声，心中忐忑不定，预定的计划还能成行吗?真是“山雨欲来风满楼”。&nbsp;</p><p data-v-59a318e4="" data-v-e18b6dc6=""><img src="http://image1.8264.com/wen/public/20200527/1590559216549jpg" style="max-width: 100%;"></p><p data-v-59a318e4="" data-v-e18b6dc6="">&nbsp;想起阿杰兄弟，跑马拉松的，挑战自我，成绩一年比一年提高，42公里用时3小时40分钟。难道说我二个轮子比不过二条腿吗?说滚就滚，启动百公里骑行北太湖的行程，出发。<br></p><p data-v-59a318e4="" data-v-e18b6dc6=""><img src="http://image1.8264.com/wen/public/20200527/1590559218226jpg" style="max-width:100%;"><br></p><p data-v-59a318e4="" data-v-e18b6dc6="">说起这条线路，小伙伴们一定不会陌生:炎炎烈日下，我们一行6人冒着35度的高温，从沙墩港大桥开始徒步，到苏州湿地公园终止，用双脚丈量了北太湖大道30公里。当时，道路正在修缮中，路边是裸露的土地，大型机械正在隆隆施工。这么些年过去了，旧地重游，究竟发生了哪些变化呢?&nbsp;</p><p data-v-59a318e4="" data-v-e18b6dc6=""><img src="http://image1.8264.com/wen/public/20200527/1590559219793jpg" style="max-width: 100%;">&nbsp;<br></p>`,
                //     editTime: new Date().getTime()
                // }
                let data = {
                    userId: Number(this.$cookie.get('userId')),
                    title: this.title,
                    titleImgUrl: this.titleImgUrl,
                    category: this.category,
                    place: this.place,
                    articleHTML: this.$Base64.encode(this.articleHTML),
                    editTime: new Date().getTime()
                }

                // 发布文章
                if(this.pageType == 'write'){
                    this.fullscreenLoading = true;
                    this.axios.post('http://47.106.215.69:8080/tourism/article/upload',data)
                    .then((res)=>{
                        if(res.status == 0){
                            this.fullscreenLoading = false;
                            this.$message.success('文章上传成功');
                            // TODO: 跳转到文章展示页面
                            // 等待页面
                        }else{
                            this.$message.error('文章上传失败，请重试');
                        }
                    })
                }else{
                    this.fullscreenLoading = true;
                    // 编辑文章
                    this.axios.post('/api/article/edit',{
                        articleId: this.pageType,
                        title: this.title,
                        titleImgUrl: this.titleImgUrl,
                        category: this.category,
                        place: this.place,
                        articleHTML: this.articleHTML,
                        editTime: 1479048325000
                        // editTime: new Date().getTime()
                    })
                    .then((res)=>{
                        if(res.status == 0){
                            this.fullscreenLoading = false;
                            this.$message.success('文章编辑成功');
                            // TODO: 跳转到文章展示页面
                            // 等待页面
                        }else{
                            this.fullscreenLoading = false;
                            this.$message.error('文章编辑失败，请重试');
                        }
                    })
                }
            },
            // 头像下拉框触发事件
            handleCommand(command) {
                switch (command) {
                    case 'personal':
                        this.$router.push(`/personal/${this.$cookie.get('userId')}`);
                        break;
                    case 'collect':
                        this.$router.push(`/personal/${this.$cookie.get('userId')}`);
                        break;
                    case 'setting':
                        this.$router.push(`/setting/${this.$cookie.get('userId')}`);
                        break;
                    default:
                        break;
                }
                this.$emit('index',0);
            }
        }

    }
</script>

<style lang="scss" scoped>
@import '../assets/scss/config.scss';
    .write{
        background: white;
        width: 100%;
        height: 100%;
        .edit-header{
            box-shadow: 0 1px 3px rgba(26,26,26,.1);
            background-color: white;
            z-index: 10;
            position: fixed;
            top: 0;
            width: 100%;
            .container{
                position: relative;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .header-logo{
                    display: inline-block;
                    flex: 1;
                    margin-right: 20px;
                    a{
                        display: inline-block;
                        width: 60px;
                        height: 40px;
                        background: url('/imgs/icons/bbs-logo.png') no-repeat center;
                        background-size: contain;
                        &:after{
                            // 置空，占位
                            line-height: 40px;
                            padding-left: 60px;
                            content: 'BBS';
                            color: $colorA;
                            font-size: 38px;
                            font-family: "Arial";
                        }
                    }
                }
                .header-title{
                    flex: 5;
                    height: 30px;
                    line-height: 30px;
                    border-left: 1px solid #e5e5e5;
                    padding-left: 20px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a1a1a;
                }
                .header-button{
                    display: flex;
                    align-items: center;
                    button{
                        i{
                            margin-left: 5px;
                        }
                    }
                    .icon{
                        margin-left: 20px;
                        font-size: 24px;
                        cursor: pointer;
                        color: #8590a6;
                    }
                    .person{
                        display: flex;
                        height: 100%;
                        align-items: center;
                        justify-content: space-evenly;
                        margin-left: 25px;
                        .icon{
                            color: $colorD;
                            font-size: 22px;
                            &:hover{
                                color: $colorA;
                            }
                        }
                        .avatar{
                            position: relative;
                            cursor: pointer;
                            span{
                                display: block;
                            }
                            
                        }
                    }
                }
            }
        }
        .content{
            padding: 100px;
            .photo{
                width: 650px;
                height: 300px;
                background: rgb(194, 194, 194);
                margin: 0 auto;
                font-size: 40px;
                text-align: center;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 1s;
                margin-bottom: 20px;
                .mask{
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    z-index: 3;
                    span{
                        margin-top: 10px;
                        font-size: 16px;
                        opacity: 0;
                        transition: all 1s;
                        color: white;
                    }
                }
                &:hover{
                    background: rgb(138, 136, 136);
                    span{
                        opacity: 1;
                        color: white;
                    }
                }
                i{
                    color: white;
                }
                input{
                    display: none;
                }
                img{
                    width: 100%;
                    z-index: 2;
                }
            }
            .title{
                width: 650px;
                margin: 0 auto;
                margin-bottom: 20px;
                .el-input{
                    margin-bottom: 10px;
                }
                .el-option{
                    z-index: 11;
                }
                .other{
                    display: flex;
                    justify-content: space-between;
                    .left{
                        flex: 1;
                        display: flex;
                        height: 40px;
                        line-height: 40px;
                        span{
                            font-size: 13px;
                            width: 40px;
                        }
                    }
                    .right{
                        flex: 1;
                        display: flex;
                        height: 40px;
                        line-height: 40px;
                        span{
                            font-size: 13px;
                            width: 50px;
                        }
                    }
                }
            }
            .rule{
                border: 1px solid #ccc;
                width: 650px;
                margin: 0 auto;
                margin-bottom: 20px;
            }
            .content-editor{
                width: 650px;
                margin: 0 auto;
            }
        }
    }
</style>