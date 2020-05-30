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
                                    <div class="photo-box">
                                        <div class="photo" ref="photo" @click="uploadPhoto">
                                            <div class="mask">
                                                <i class="el-icon-camera"></i>
                                                <span>修改头像</span>
                                            </div>
                                            <input @change="onUpload" ref="uploadImg" type="file" accept="image/*" value="" />
                                            <img v-show="true" :src="articleImgUrl" alt="">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <span>用户名</span>
                                    <el-input type="text" v-model="nickName" placeholder="填写你的用户名"></el-input>
                                </li>
                                <li>
                                    <span>职业</span>
                                    <el-input type="text" v-model="userWork" placeholder="填写你的职业"></el-input>
                                </li>
                                <li>
                                    <span>个人介绍</span>
                                    <el-input type="text" v-model="userIntroduce" placeholder="填写你的个人介绍"></el-input>
                                </li>
                                <li>
                                    <span>邮箱</span>
                                    <p>1231@qq.com</p>
                                </li>
                                <li class="sureButton">
                                    <el-button type="primary" round @click="messageUpload">保存修改</el-button>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="second">
                        <div class="box">
                            <ul>
                                <li><h1>修改密码</h1></li>
                                <li>
                                    <span>旧密码</span>
                                    <div class="password">
                                        <el-input type="text" v-model="oldPassword" placeholder="请输入原密码" show-password></el-input>
                                    </div>
                                </li>
                                <li>
                                    <span>新密码</span>
                                    <div class="password">
                                        <el-input type="text" v-model="newPassword" placeholder="请输入新密码" show-password></el-input>
                                    </div>
                                </li>
                                <li>
                                    <span>确认新密码</span>
                                    <div class="password"> 
                                        <el-input type="text" v-model="newPassword2" placeholder="确认新密码" show-password></el-input>
                                    </div>
                                </li>
                                <li class="sureButton">
                                    <el-button type="primary" round @click="savaPassword">保存修改</el-button>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
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
                userEmail: '',
                oldPassword: '',
                newPassword: '',
                newPassword2: '',
                // 标题图片显示
                uploadImgShow: false,
                // 标题图片地址
                articleImgUrl: '',
            };
        },
        mounted(){
            let userId = Number(this.$cookie.get('userId'));
            if(userId && userId == this.$route.params.id){
                // 请求用户信息
                this.axios.get(`/api/user/${userId}`)
                .then((res)=>{
                    this.articleImgUrl = res.data.userAvatar;
                    this.nickName = res.data.nickName;
                    this.userWork = res.data.userWork;
                    this.userIntroduce = res.data.userIntroduce;
                })
            }else{
                this.$router.push('/');
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleAvatarSuccess(res, file) {
                console.log(res, file);
                this.imageUrl = window.URL.createObjectURL(file.raw);
            },
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
                this.axios.post("http://47.106.215.69:8080//tourism/user/upload/", data, config).then(res => {
                    this.articleImgUrl = res.data;
                    this.uploadImgShow = true;
                })
            },
            // 信息上传
            messageUpload(){
                let params = {
                    userId: Number(this.$cookie.get('userId')),
                    userAvatar: this.articleImgUrl,
                    nickName: this.nickName,
                    userWork: this.userWork,
                    userIntroduce: this.userIntroduce,
                }
                for (let key in params) {
                    if (!params[key]) {
                        this.$message.error('信息不能为空');
                        return;
                    }
                }
                this.axios.post('/api/user/update',params)
                .then((res)=>{
                    if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                        this.axios.get(`/api/user/${Number(this.$cookie.get('userId'))}`)
                        .then((res)=>{
                            this.$store.dispatch('saveUserMessage', res.data);
                        })
                    }else{
                        this.$message.error('网络异常');
                    }
                })
            },
            // 修改密码
            savaPassword(){
                let errMsg;
                if(!this.oldPassword || !this.newPassword
                    || this.oldPassword.length < 6 || this.newPassword.length < 6 ){
                    errMsg = '请输入不少于6位的密码';
                }else if(this.newPassword !== this.newPassword2){
                    errMsg = '两次密码输入不一致';
                }else if(this.newPassword == this.oldPassword){
                    errMsg = '新密码不可与原密码相同';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return;
                }

                let data = new FormData();
                data.append('userId', Number(this.$cookie.get('userId')));
                data.append('oldPassword', this.$md5(this.oldPassword));
                data.append('newPassword', this.$md5(this.newPassword));

                let config = {
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                };
                this.axios.post('/api/user/password',data,{config}).then((res)=>{
                    console.log(res);
                    if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                        this.$message.success(res.msg);
                    }else if(res.status == 1){
                        this.$message.error(res.msg);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scope>
    .setting{
        // 头像框 不知道干嘛的
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
                                padding: 15px 0;
                                border-bottom: 1px solid #f1f1f1;
                                align-items: center;
                                span{
                                    flex: 1;
                                    font-size: 15px;
                                }
                                .password{
                                    flex: 5;
                                    .el-input{
                                    width: 50%;
                                    // font-size: 16px;
                                    // border: 0px;
                                    // color: black;
                                    &::-webkit-input-placeholder {
                                        /* 修改默认字体颜色 */
                                        color: #cccccc;
                                    }
                                }
                                }
                                .el-input{
                                    flex: 5;
                                    // font-size: 16px;
                                    // border: 0px;
                                    // color: black;
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
                                .photo-box{
                                    flex: 5;
                                    height: 100px;
                                    .photo{
                                        width: 100px;
                                        height: 100px;
                                        background: rgb(194, 194, 194);
                                        font-size: 40px;
                                        text-align: center;
                                        cursor: pointer;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        transition: all 1s;
                                        margin-bottom: 20px;
                                        position: relative;
                                        .mask{
                                            position: absolute;
                                            left: 50%;
                                            top: 50%;
                                            transform: translate(-50%, -50%);
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            flex-direction: column;
                                            z-index: 3;
                                            opacity: 0;
                                            transition: all 1s;
                                            span{
                                                margin-top: 10px;
                                                font-size: 16px;
                                                // opacity: 0;
                                                transition: all 1s;
                                                color: white;
                                            }
                                        }
                                        &:hover{
                                            .mask{
                                                opacity: 1;
                                            }
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
                                            height: 100%;
                                            // z-index: 2;
                                        }
                                    }
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