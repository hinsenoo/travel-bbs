<template>
    <div class="nav-header">
        <div class="container">
            <div class="header-logo">
                <a href="/index"></a>
            </div>
            <div class="header-menu">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="menu"  active-text-color="#409EFF" >
                    <el-menu-item index="1" >首页</el-menu-item>
                    <el-menu-item index="2">专栏</el-menu-item>
                </el-menu>
            </div>
            <div class="header-search">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="mini">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="header-user">
                <div class="user">
                    <div class="register" v-if="!loginStaus">
                        <a href=""><i class="el-icon-edit-outline"></i>发帖子</a>
                        <i>|</i>
                        <a href="">登录</a>
                        ·
                        <a href="">注册</a>
                    </div>
                    <div class="person" v-if="loginStaus">
                        <el-button type="primary" size="mini" icon="el-icon-edit-outline">发帖子</el-button>
                        <a href="" class="el-icon-message-solid icon"></a>
                        <el-dropdown class="avatar" trigger="click">
                            <el-avatar size="small" :src="circleUrl"></el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="avatar-icon"><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-star-on"></i>收藏夹</el-dropdown-item>
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
                activeIndex: '1',
                input: '', 
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                loginStaus: false, // 登录状态
            }
        },
        methods: {
            handleSelect(key) {
                if(key == 1){
                    // 判断跳转地址于当前地址不同
                    if(this.$route.path !== "/index") {
                        this.$router.push('/index');
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
.nav-header{
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
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