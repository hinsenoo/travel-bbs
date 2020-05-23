<template>
    <div class="edit">
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
                    写文章
                </div>
                <div class="header-button">
                    <el-button type="primary" round @click="publish">发布<i class="el-icon-tickets"></i></el-button>
                    <i class="el-icon-more icon"></i>
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
                    <editor :catchData="catchData">
                        <template v-slot:word>
                            <p>在这留下你最美好的回忆。。。。。。</p>
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
        name: 'edit',
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
                
            }
        },
        components: {
            editor
        }
        ,
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
                this.axios.post("/api/tourism/user/upload/", data, config).then(res => {
                    this.titleImgUrl = res.data;
                    this.uploadImgShow = true;
                    this.$refs.photo.style = "height: auto";
                })
            },
            // 获取编辑器内的数据
            catchData(html){
                this.articleHTML = html;
            },
            publish(){
                console.log(this.articleHTML);
            }
        }

    }
</script>

<style lang="scss" scoped>
@import '../assets/scss/config.scss';
    .edit{
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