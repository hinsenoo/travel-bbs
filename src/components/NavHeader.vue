<template>
    <div class="nav-header" :class="{'is_fixed': isFixed}">
        <div class="container">
            <!-- 页面 Logo -->
            <div class="header-logo">
                <a href="/index"></a>
            </div>
            <!-- 页面导航栏 -->
            <div class="header-menu">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="menu"  active-text-color="#409EFF" >
                    <el-menu-item index="1" >首页</el-menu-item>
                    <el-menu-item index="2">专栏</el-menu-item>
                </el-menu>
            </div>
            <!-- 搜索框 -->
            <div class="header-search">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="mini">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 用户框 -->
            <div class="header-user">
                <div class="user">
                    <div class="register" v-if="!loginStaus">
                        <a href=""><i class="el-icon-edit-outline"></i>发帖子</a>
                        <i>|</i>
                        <a href="javascript:;" @click="$emit('modalShow','login')">登录</a>
                        ·
                        <a href="javascript:;" @click="$emit('modalShow','register')">注册</a>
                    </div>
                    <div class="person" v-if="loginStaus">
                        <el-button type="primary" size="mini" icon="el-icon-edit-outline">发帖子</el-button>
                        <a href="" class="el-icon-message-solid icon"></a>
                        <el-dropdown class="avatar" trigger="click">
                            <el-avatar size="small" :src="circleUrl"></el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="avatar-icon"><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-s-management"></i>收藏夹</el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-s-tools"></i>设置</el-dropdown-item>
                                <el-dropdown-item divided><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'nav-header',
        data() {
            return {
                input: '', 
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                loginStaus: false, // 登录状态
                isFixed: false, // 吸顶状态
            }
        },
        mounted(){
            // 注册滚动事件
            window.addEventListener('scroll',this.initHeight);
        },
        methods: {
            // 导航栏触发事件
            handleSelect(key) {
                if(key == 1){
                    // 判断跳转地址于当前地址不同
                    if(this.$route.path !== "/index") {
                        this.$router.push('/index');
                    }
                }
            },
            initHeight(){
                // 页面 Y 轴偏移量 兼容 IE
                let scrollTop = window.pageYOffset || document.scrollTop || document.body.scrollTop;
                this.isFixed = scrollTop > 80 ? true : false;
            }

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
}

</style>