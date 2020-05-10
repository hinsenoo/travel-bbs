<template>
    <div class="setting">
        <div class="container">
            <div class="content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="个人资料" name="first">
                        <div class="box">
                            <ul>
                                <li><h1>个人资料</h1></li>
                                <li>
                                    <span>头像</span>
                                    <!-- TODO: 头像上传 -->
                                </li>
                                <li>
                                    <span>用户名</span>
                                    <input type="text" v-model="nickName" placeholder="填写你的用户名">
                                </li>
                                <li>
                                    <span>职业</span>
                                    <input type="text" v-model="userWork" placeholder="填写你的职业">
                                </li>
                                <li>
                                    <span>个人介绍</span>
                                    <input type="text" v-model="userIntroduce" placeholder="填写你的个人介绍">
                                </li>
                                <li>
                                    <span>邮箱</span>
                                    <p>1231@qq.com</p>
                                </li>
                                <li class="sureButton">
                                    <el-button type="primary" round>保存修改</el-button>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="second">修改密码</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'setting',
        data() {
            return {
                activeName: 'first',
                imageUrl: '',
                upLoadUrl: '',
                nickName: '',
                userWork: '',
                userIntroduce: '',
                userEmail: ''
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleAvatarSuccess(res, file) {
                console.log(res, file);
                this.imageUrl = window.URL.createObjectURL(file.raw);
            },
        }
    }
</script>

<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .setting{
        .container{
            .content{
                margin-top: 20px;
                padding: 10px 20px;
                box-sizing: border-box;
                background-color: white;
                width: 80%;
                height: 600px;
                .el-tab-pane{
                    .box{
                        ul{
                            padding: 0 30px 0 20px;
                            li{
                                display: flex;
                                padding: 25px 0;
                                border-bottom: 1px solid #f1f1f1;
                                span{
                                    flex: 1;
                                    font-size: 15px;
                                }
                                input{
                                    flex: 5;
                                    font-size: 16px;
                                    border: 0px;
                                    color: #999999;
                                    &::-webkit-input-placeholder {
                                        /* 修改默认字体颜色 */
                                        color: #cccccc;
                                    }
                                }
                                p{
                                    flex: 5;
                                    font-size: 16px;
                                    border: 0px;
                                    color: #999999;
                                }
                            }
                            .sureButton{
                                display: flex;
                                justify-content: center;
                                border: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>