<template>
    <div class="nav-header">
        <div class="container">
            <div class="header-logo">
                <a href="/index"></a>
            </div>
            <div class="header-menu">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" text-color="#999999" active-text-color="#409EFF" class="menu">
                    <el-menu-item index="1" >首页</el-menu-item>
                    <el-menu-item index="2">发现</el-menu-item>
                </el-menu>
            </div>
            <div class="header-user">

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
                activeIndex2: '1'
            };
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
        .header-user{
            flex: 3;
        }
    }
}
</style>