<template>
    <div class="nav-header" :class="{'is_fixed': isFixed}">
        <div class="container">
            <!-- 页面 Logo -->
            <div class="header-logo">
                <a href="/index">
                    <img class="logo" src="/imgs/icons/bbs-logo.png" alt="">
                    <img class="text" src="/imgs/icons/travel1.png" alt="">
                </a>
            </div>
            <!-- 页面导航栏 -->
            <div class="header-menu">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="menu"  active-text-color="#409EFF" >
                    <el-menu-item index="1" >首页</el-menu-item>
                    <!-- <el-menu-item index="2">专栏</el-menu-item> -->
                </el-menu>
            </div>
            <!-- 搜索框 -->
            <!-- <div class="header-search">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="mini">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div> -->
            <!-- 用户框 -->
            <div class="header-user">
                <div class="user">
                    <div class="register" v-if="!loginStatus">
                        <a href="javascript:;" @click="modalShow(1)"><i class="el-icon-edit-outline"></i>发帖子</a>
                        <i>|</i>
                        <a href="javascript:;" @click="modalShow(1)">登录</a>
                        ·
                        <a href="javascript:;" @click="modalShow(2)">注册</a>
                    </div>
                    <div class="person" v-if="loginStatus">
                        <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="$router.push('/edit/write')">发帖子</el-button>
                        <!-- <a href="javascript:;" class="el-icon-message-solid icon"></a> -->
                        <el-dropdown class="avatar" trigger="click" @command="handleCommand">
                            <el-avatar size="small" :src="userAvatar"></el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="avatar-icon" command="personal"><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item>
                                <el-dropdown-item command="collect"><i class="el-icon-s-management"></i>收藏夹</el-dropdown-item>
                                <el-dropdown-item command="setting"><i class="el-icon-s-tools"></i>设置</el-dropdown-item>
                                <el-dropdown-item divided command="exit"><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录注册弹框 -->
        <modal
            :showModal="showModal"
        >
            <template v-slot:body>
                <div class="modal-index">
                    <img src="/imgs/icons/login-logo.png" alt="">
                    <div class="header">
                        <h2>{{modalType=='login'? '登录' : '注册' }}</h2>
                        <a @click="closeModal" class="el-icon-close model__cancel"></a>
                    </div>
                    <div class="content">
                        <div class="content-login" v-show="modalType=='login'">
                            <el-input v-model="username" maxlength="10" placeholder="请输入用户名"></el-input>
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                            <el-button @click="login" type="primary" :loading="waitRequest">登录</el-button>
                            <div class="other">没有账号？<span @click="$store.dispatch('saveLoginModal', 2);">注册</span></div>
                        </div>
                        <div class="content-login" v-show="modalType=='register'">
                            <el-input v-model="registerName" maxlength="10" placeholder="请输入用户名"></el-input>
                            <el-input v-model="registerEmail" placeholder="请输入邮箱"></el-input>
                            <el-input placeholder="请输入密码（不少于6位）" v-model="registerPw" show-password></el-input>
                            <el-input placeholder="再次输入密码" v-model="registerPw2" show-password></el-input>
                            <el-button @click="register" type="success" :loading="waitRequest">注册</el-button>
                            <div class="other">已有账号？<span @click="$store.dispatch('saveLoginModal', 1)">登录</span></div>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
    import Modal from './../components/Modal';
    export default {
        name: 'nav-header',
        components: {
            Modal
        },
        data() {
            return {
                input: '', 
                isFixed: false, // 吸顶状态
                // showModal: false, // 弹框显示
                // modalType: 'login', // 弹框类型
                waitRequest: false,
                username: '',
                password: '',
                registerName: '',
                registerEmail: '',
                registerPw: '',
                registerPw2: '',
                userId: 0,
            }
        },
        computed: {
            // 用户头像
            userAvatar(){
                return this.$store.state.userMessage.avatar_url;
            },
            // 登录状态
            loginStatus(){
                return this.$store.state.loginStatus;
            },
            // 登录状态
            showModal(){
                return this.$store.state.loginModal == 0 ? false : true;
            },
            modalType(){
                if(this.$store.state.loginModal == 1){
                    return 'login';
                }else {
                    return this.$store.state.loginModal == 0 ? ' ' : 'register';
                }
            }
            // cartCount(){
            //     return this.$store.state.cartCount;
            // }, 
            // ...mapState(['username','cartCount'])
        },
        mounted(){
            // 注册滚动事件
            window.addEventListener('scroll',this.initHeight);
            this.userId = this.$storage.getItem('userId');
            // if(this.userId !== '') {
            //     this.getUserInfo(this.userId);
            // }
        },
        watch: {

        },
        methods: {
            toPersonal(id){
                this.$emit('index',0);
                if(id !== this.$route.params.id) {
                    // this.$router.push(`/personal/${id}`);
                    window.open(`${window.location.origin}/personal/${id}`, '_blank');
                }
            },
            // 导航栏触发事件
            handleSelect(key) {
                if(key == 1){
                    // 判断跳转地址于当前地址不同
                    if(this.$route.path !== "/index") {
                        this.$router.push('/index');
                    }
                }
            },
            // 头像下拉框触发事件
            handleCommand(command) {
                switch (command) {
                    case 'personal':
                        // this.$router.push(`/personal/${this.$Base64.decode(this.$cookie.get('userId'))}`).catch(err => {err})
                        this.toPersonal(this.userId);
                        break;
                    case 'collect':
                        window.open(`${window.location.origin}/personal/${this.userId}?type=collect`, '_blank');
                        // this.$router.replace(`/personal/${this.userId}?type=collect`);
                        break;
                    case 'setting':
                        window.open(`${window.location.origin}/setting/${this.userId}`, '_blank');
                        // this.$router.push(`/setting/${this.userId}`);
                        break;
                    case 'exit':
                        // 退出登录
                        // 使 cookie 过期
                        // this.$storage.clear('userId');
                        // this.$storage.clear('token');
                        // // 清空 vuex 的数据
                        // this.$store.dispatch('saveUserMessage',{});
                        // this.$store.dispatch('saveLoginStatus',false);
                        this.$store.commit('saveLogoutStatus');
                        this.$message.success('退出登录成功');
                        break;
                    default:
                        break;
                }
                this.$emit('index',0);
            },
            initHeight(){
                // 页面 Y 轴偏移量 兼容 IE
                let scrollTop = window.pageYOffset || document.scrollTop || document.body.scrollTop;
                this.isFixed = scrollTop > 80 ? true : false;
            },
            // 登录
            login(){
                let errMsg = '';
                // 判断错误类型
                if(!this.username){
                    errMsg = '请输入用户名';
                }else if(!this.password || this.password.length < 6){
                    errMsg = '请输入不少于6位的密码';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return;
                }
                let params = {
                    name: this.username,
                    password: this.$md5(this.password)
                }
                // 等待请求完成，才能点击按钮
                // this.$message.error('登录成功');
                this.waitRequest = true;
                this.$axios.post(this.$api.login.url, params)
                    .then((res)=>{
                        if(res.status == 0){
                            // 存储用户 id 到 cookie，会话级别 
                            this.userId = res.data._id;
                            this.$storage.setItem('token', res.token);
                            this.$storage.setItem('userId', res.data._id);
                            // this.$cookie.set('userId',this.$Base64.encode(res.data._id),{expires: 'Session'});
                            // 保存到 Vuex 里面
                            this.$store.dispatch('saveUserMessage', res.data);
                            this.$store.dispatch('saveLoginStatus', true);
                            this.username = '';
                            this.password = '';
                            this.closeModal();
                            this.$message.success('登录成功');
                            this.$router.go();
                        }else if(res.status == 401) {
                            this.$message.error(res.msg);
                        }
                        else{
                            this.$message.error('网络异常');
                        }
                        this.waitRequest = false;
                    });
            },
            // 注册
            register(){
                let errMsg = '';
                // 判断错误类型
                if(!this.registerName){
                    errMsg = '请输入用户名';
                }else if(!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.registerEmail)){
                    errMsg = '请输入正确格式的邮箱';
                }else if(!this.registerPw || this.registerPw.length < 6){
                    errMsg = '请输入不少于6位的密码';
                }else if(this.registerPw !== this.registerPw2){
                    errMsg = '两次密码输入不一致';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return;
                }
                let params = {
                    name: this.registerName,
                    password: this.$md5(this.registerPw),
                    email: this.registerEmail
                }
                // 等待请求完成
                this.waitRequest = true;
                this.$axios.post(this.$api.register.url, params)
                    .then((res)=>{
                        if(res.status == 0){
                            this.$store.dispatch('saveLoginModal', 1);
                            this.$message.success('注册成功，请登录');
                            // 清空
                            this.registerName = '';
                            this.registerEmail = '';
                            this.registerPw = '';
                            this.registerPw2 = '';
                        }else if(res.status === 409) {
                            // console.log('res', res);
                            this.$message.error(res.msg);
                        }
                        this.waitRequest = false;
                    })
            },
            // 显示弹框
            modalShow(type){
                // this.modalType = type;
                this.$store.dispatch('saveLoginModal', type);
            },
            // 关闭弹框
            closeModal(){
                // this.modalType = '';
                this.$store.dispatch('saveLoginModal', 0);
                this.waitRequest = false;
            },
            // 请求用户信息
            getUserInfo(userId){
                this.$axios.get(`users/${userId}`)
                .then((res)=>{
                    if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                        // 清空 vuex 的数据
                        this.$store.dispatch('saveUserMessage',res.data);
                        this.$store.dispatch('saveLoginStatus',true);
                        // this.$message.success('退出登录成功');
                    }else{
                        this.$message.error('获取用户数据失败');
                    }
                })
            },
            // 跳转到个人主页
        },
        destroyed(){
            // 通过第三个参数设置 事件冒泡 来销毁事件
            window.removeEventListener('scroll',this.initHeight,false);
        },
        props: {
            activeIndex: String
        }
    }
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
.nav-header{
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background-color: white;
    z-index: 10;
    &.is_fixed{
        position: fixed;
        top: 0;
        width: 100%;
    }
    .container{
        position: relative;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-logo{
            display: inline-block;
            flex: 2;
            a{
                // display: inline-block;
                width: 100%;
                height: 40px;
                display: flex;
                .logo{
                    width: 40px;
                    height: 40px;
                }
                .text{
                    width: 100px;
                    height: 40px;
                }
                
            }
        }
        .header-menu{
            flex:4;
            ul{
                li{
                    font-size: $fontH;
                }
            }
        }
        .header-search{
            flex: 1.5;
        }
        .header-user{
            flex: 2;
            .user{
                height: 40px;
                line-height: 40px;
                text-align: right;
                .register{
                    font-size: 16px;
                    color: $colorF;
                    font-weight: bold;
                    a{
                        font-weight: 500;
                        color: $colorA;
                        i{
                            margin-right: 3px;
                        }
                    }
                    i{
                        margin: 10px;
                    }
                }
                .person{
                    display: flex;
                    height: 100%;
                    align-items: center;
                    justify-content: space-evenly;
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
    .modal-index{
            width: 320px;
            padding: 25px;
            background-color: #fff;
            border-radius: 2px;
            box-sizing: border-box;
            img{
                position: absolute;
                width: 100px;
                height: auto;
                top: -90px;
                left: 50%;
                transform: translateX(-50%);
            }
            .header{
                margin-bottom: 24px;
                h2{
                    display: inline-block;
                }
                a{
                    position: absolute;
                    font-size: 23px;
                    right: 25px;
                    transition: transform 0.3s;
                    color: #cccccc;
                    cursor: pointer;
                    &:hover{
                        transform: scale(1.5);
                        color: #409EFF;
                    }
                }
            }
            .content{
                input{
                    margin-bottom: 10px;
                }
                button{
                    width: 100%;
                    margin: 10px 0;
                }
                .other{
                    color: #999999;
                    font-size: 14px;
                    span{
                        color: #409EFF;
                        cursor: pointer;
                    }
                }
            }
        }
}

</style>