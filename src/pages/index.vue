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
                        <el-tab-pane label="热门" name="hot">
                            <div class="content-list">
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;" @click="toArticle">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good2.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark2.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img v-lazy="photoUrl" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good2.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="关注" name="focus">
                            <div class="content-list">
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="最新" name="newest">
                            <div class="content-list">
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                                <div class="content-listNews">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">游记</a></li>
                                            <li class="author"><a href="javascript:;">不爱拍照的_腊肉</a></li>
                                            <li>1000人浏览</li>
                                            <li class="area">西藏</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;">人生恰似一场永不停止的远足——珠峰东坡大环线</a>
                                            </div>
                                            <div class="fragment">
                                                原本2019年计划先墨脱雨林徒步再走珠峰东坡，因为十一这个黄金期要参加闺蜜的婚礼，所以就只能完成其中一个了，刚好看到6月徒步珠峰东坡的贴还蛮多的（刚好看杜鹃花的时候），通过8264，还有qq找了几个同伴......
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img src="/imgs/demo/3.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                            </div>
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
                <div class="user" v-if="loginStatus">
                    <div class="message">
                        <div class="avator">
                            <a href="javascript:;" @click="toPersonal">
                                <el-avatar :size="80" :src="userAvatar"></el-avatar>
                                <div class="userName">
                                    <div>{{nickName}}</div>
                                    <div class="good">
                                        <span>
                                            <img src="/imgs/icons/good-white.png" alt="">
                                            {{goodCount}}
                                        </span>
                                    </div>
                                    <div class="time">注册时长: {{registerTime}} 年</div>
                                </div>
                            </a>
                        </div>
                        <div class="news">
                            <ul>
                                <li><a href="javascript:;">我的全部文章<span>{{articleCount}}</span></a></li>
                                <li><a href="javascript:;">我的收藏夹<span>{{collectCount}}</span></a></li>
                                <li><a href="javascript:;">我的关注<span>{{focusCount}}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="right-recommend">
                    <h3>推荐文章</h3>
                    <a href="javascript:;" class="recommend">
                        <div class="title">人生恰似一场永不停止的远足——珠峰东坡大环线</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">32</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">11</span>
                        </div>
                    </a>
                    <a href="javascript:;" class="recommend">
                        <div class="title">人生恰似一场永不停止的远足——珠峰东坡大环线</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">32</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">11</span>
                        </div>
                    </a>
                    <a href="javascript:;" class="recommend">
                        <div class="title">人生恰似一场永不停止的远足——珠峰东坡大环线</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">32</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">11</span>
                        </div>
                    </a>
                    <a href="javascript:;" class="recommend">
                        <div class="title">人生恰似一场永不停止的远足——珠峰东坡大环线</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">32</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">11</span>
                        </div>
                    </a>
                    <a href="javascript:;" class="recommend">
                        <div class="title">人生恰似一场永不停止的远足——珠峰东坡大环线</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">32</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">11</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {formatYear} from '../util/index'
    export default {
        // 组件名称
        name: 'index',
        data() {
            return {
                activeName: 'hot',
                // 轮播图
                slideshowList: ['/imgs/slideshow/1.jpg',
                                '/imgs/slideshow/2.jpg',
                                '/imgs/slideshow/3.jpg',
                                '/imgs/slideshow/5.jpg',
                                '/imgs/slideshow/6.jpg',
                                '/imgs/slideshow/7.jpg',],
                photoUrl: '/imgs/demo/3.jpg', // 文章图片
            }
        },
        computed: {
            // 用户头像
            userAvatar(){
                return this.$store.state.userMessage.userAvatar;
            },
            // 昵称
            nickName(){
                return this.$store.state.userMessage.nickName;
            },
            // 点赞数
            goodCount(){
                return this.$store.state.userMessage.goodCount;
            },
            // 文章数
            articleCount(){
                return this.$store.state.userMessage.article.length;
            },
            // 收藏数
            collectCount(){
                return this.$store.state.userMessage.collect.length;
            },
            // 关注数
            focusCount(){
                return this.$store.state.userMessage.focus.length;
            },
            registerTime(){
                return formatYear(this.$store.state.userMessage.createTime);
            },
            // 登录状态
            loginStatus(){
                return this.$store.state.loginStatus;
            },
            // cartCount(){
            //     return this.$store.state.cartCount;
            // }, 
            // ...mapState(['username','cartCount'])
        },
        mounted(){
            this.$emit('index',1);
        },
        methods: {
            // 文章导航栏
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 跳转到个人主页
            toPersonal(){
                this.$emit('index',0);
                this.$router.push(`/personal/${this.$cookie.get('userId')}`);
            },
            toArticle(){
                this.$emit('index',0);
                this.$router.push('/article/1');
            }
        },
    }
</script>
<style lang="scss">
    .index{
        padding-top: 20px;
        background-color: #F5F5F5;
        .container{
            display: flex;
            .left{
                flex: 2.5;
                .slideshow{
                    width: 100%;
                    height: 300px;
                    // background: #fff;
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
                        .content-list{
                            width: 97%;
                            // height: 1000px;
                            // border: 1px solid black;
                            .content-listNews{
                                padding: 18px 0px;
                                border-bottom: 1px solid #e0efeb;
                                // 标签
                                .meta{
                                    margin-bottom: 10px;
                                    li{
                                        display: inline-block;
                                        color: #909090;
                                    }
                                    .categroy{
                                        margin-right: 14px;
                                        a{
                                            color: #b71ed7;
                                            text-align: center;
                                            padding: 3px 10px;
                                            border: 1px solid #ddd;
                                            border-radius: 10px;
                                            &:hover{
                                                background-color: #ddd;
                                            }
                                        }
                                    }
                                    .author{
                                        a{
                                            color: #585858;
                                            &:hover{
                                                color: black;
                                            }
                                        }
                                        &:after{
                                            font-weight: bold;
                                            content: "·";
                                            color: rgb(178, 186, 194);
                                            margin: 0px 5px;
                                        }
                                    }
                                    .area{
                                        &:before{
                                            font-weight: bold;
                                            content: "·";
                                            color: rgb(178, 186, 194);
                                            margin: 0px 5px;
                                        }
                                    }
                                }
                                .news{
                                    width: 95%;
                                    display: flex;
                                    justify-content: space-between;
                                    margin-bottom: 20px;
                                    .word{
                                        flex: 2;
                                        margin-right: 20px;
                                        // 文章标题
                                        .title{
                                            margin-bottom: 5px;
                                            a{
                                                font-size: 18px;
                                                color: black;
                                                font-weight: bold;
                                                &:hover{
                                                    text-decoration: underline;
                                                    color: #409EFF;
                                                }
                                            }
                                        }
                                        // 节选
                                        .fragment{
                                            font-size: 13px;
                                            line-height: 24px;
                                            color: #999;
                                        }
                                    }
                                    .photo{
                                        width: 150px;
                                        height: 100px;
                                        img{
                                            width: 100%;
                                            height: 100%;
                                            object-fit: cover;
                                        }
                                    }
                                }
                                .other{
                                    div{
                                        display: inline-block;
                                        a{
                                            display: flex;
                                            // height: 3px;
                                            border: 1px solid #edeeef;
                                            border-radius: 1px;
                                            padding: 3px 10px;
                                            font-size: 15px;
                                            color: #b2bac2;
                                            font-weight: bold;
                                            &:hover{
                                                background-color: #F5F5F5;
                                            }
                                            img{
                                                display: inline-block;
                                                width: 15px;
                                                height: 15px;
                                                margin-right: 5px;
                                            }
                                        }
                                    }
                                }
                            }
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
                    box-sizing: border-box;
                    background-color: white;
                    // border: 1px solid #d7d7d7;
                    padding: 10px;
                    margin-bottom: 20px;
                    .message{
                        width: 100%;
                        .avator{
                            padding: 20px;
                            text-align: center;
                            a{
                                font-size: 16px;
                                color: black;
                                line-height: 20px;
                                display: flex;
                                // justify-content: space-around;
                                &:hover{
                                    color: #409EFF;
                                }
                                .userName{
                                    padding-left: 20px;
                                    text-align: left;
                                    .good{
                                        margin: 8px 0;
                                        span{
                                            display: inline-block;
                                            padding: 0 2px;
                                            font-size: 12px;
                                            color: white;
                                            min-width: 36px;
                                            text-align: center;
                                            background-color: #409EFF;
                                            border-radius: 8px;
                                            img{
                                                width: 10px;
                                                height: 10px;
                                            }
                                        }
                                    }
                                    .time{
                                        font-size: 14px;
                                        color: #959595;
                                    }
                                }
                            }
                        }
                        .news{
                            border-top: 1px solid #d7d7d7;
                            padding: 20px;
                            ul{
                                li{
                                    a{
                                        text-decoration: none;
                                        color: #959595;
                                        font-size: 14px;
                                        line-height: 36px;
                                        &:hover{
                                            color: #409EFF;
                                            span{
                                                color: #409EFF;
                                            }
                                        }
                                        span{
                                            line-height: 16px;
                                            padding: 0 10px;
                                            display: inline-block;
                                            border-radius: 10px;
                                            margin-left: 10px;
                                            color: black;
                                            background-color: #f5f5f5;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .right-recommend{
                    width: 100%;
                    background: white;
                    margin-bottom: 20px;
                    h3{
                        font-size: 14px;
                        padding: 12px 15px;
                        font-weight: 500;
                        border-bottom: 1px solid hsla(0,0%,58.8%,.1);
                    }
                    .recommend{
                        display: block;
                        font-size: 14px;
                        padding: 12px 15px;
                        color: black;
                        .title{
                            margin-bottom: 10px;
                        }
                        .icon{
                            span{
                                display: inline-block;
                                color: #bfbfbf;
                                margin-right: 20px;
                                img{
                                    width: 16px;
                                    height: 16px;
                                    margin-right: 5px;
                                }
                                .comment{
                                    box-sizing: border-box;
                                    position: relative;
                                    top: 2px;
                                }
                            }
                        }
                        &:hover{
                            background: #F5F5F5;
                        }
                    }
                }
            }
        }
    }
</style>