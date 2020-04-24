<template>
    <div class="index">
        <div class="container">
            <!-- 左侧内容 -->
            <div class="left">
                <!-- 轮播图 -->
                <div class="slideshow">
                    <el-carousel height="300px">
                        <el-carousel-item v-for="(item,index) in slideshowList" :key="index">
                            <img v-lazy="item" alt="slideshow">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 文章列表 -->
                <div class="content">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="热门" name="first">
                            <div>热门内容</div>
                        </el-tab-pane>
                        <el-tab-pane label="关注" name="second">
                            <div>关注内容</div>
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="third">
                            <div>最新内容</div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right">
                <div class="right-app">
                    <div class="appCode"><img src="/imgs/QRCode.jpg" alt=""></div>
                    <div class="word">扫码下载车车互联App<i class="el-icon-download"></i><div>最好的旅行方式是和一群志同道合的人。</div></div>
                </div>
                <div class="user">用户信息栏</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        // 组件名称
        name: 'index',
        data() {
            return {
                activeName: 'first',
                // 轮播图
                slideshowList: ['/imgs/slideshow/1.jpg',
                                '/imgs/slideshow/2.jpg',
                                '/imgs/slideshow/3.jpg',
                                '/imgs/slideshow/5.jpg',
                                '/imgs/slideshow/6.jpg',
                                '/imgs/slideshow/7.jpg',]
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>
<style lang="scss">
    .index{
        padding-top: 40px;
        background-color: #F5F5F5;
        .container{
            display: flex;
            .left{
                flex: 2.5;
                .slideshow{
                    width: 100%;
                    height: 300px;
                    background: #fff;
                    margin-bottom: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .content{
                    background: white;
                    padding-top: 10px;
                    padding-left: 20px;
                    .el-tab-pane{
                        div{
                            height: 1000px;
                        }
                    }
                }
            }
            .right{
                flex: 1;
                padding-left: 10px;
                .right-app{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    margin-bottom: 20px;
                    background-color: white;
                    .appCode{
                        width: 50px;
                        height: 50px;
                        margin-right: 5px;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .word{
                        color: black;
                        font-size: 15px;
                        font-weight: bold;
                        i{
                            font-size: inherit;
                        }
                        div{
                            width: 150px;
                            margin-top: 4px;
                            font-weight: 300;
                            color: #999;
                            font-size: 13px;
                        }
                    }
                }
                .user{
                    width: 100%;
                    height: 300px;
                    background-color: white;
                }
            }
        }
    }
</style>