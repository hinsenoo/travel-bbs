<template>
    <div class="personal">
        <div class="container">
            <div class="left">
                <div class="personalShow">
                    <div class="avatar">
                        <el-avatar :size="90" :src="authorAvator"></el-avatar>
                    </div>
                    <div class="message">
                        <h1>{{authorName}}</h1>
                        <p><i class="el-icon-user"></i>{{authorWork}}</p>
                        <p><i class="el-icon-edit"></i>{{authorIntroduce}}</p> 
                    </div>
                    <div class="other">
                        <el-button v-if="isSelf" @click="toSetting">编辑个人资料</el-button>
                        <el-button class="focus-button" v-if="!isSelf">+ 关注</el-button>
                    </div>
                </div>
                <div class="content">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="文章" name="news">
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
                                        <div><a href="javascript:;"><img src="/imgs/icons/good2.png" alt="点赞">3</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark2.png" alt="评论">6</a></div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="关注" name="focus">

                        </el-tab-pane>
                        <el-tab-pane label="最新" name="newest">
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="right">
                <div class="honor">
                    <h2>个人成就</h2>
                    <div>
                        <p><i><img src="/imgs/icons/good-blue.png" alt=""></i>获得点赞<span>{{goodCount}}</span></p>
                        <p><i><img src="/imgs/icons/read.png" alt=""></i>文章被阅读<span>{{readCount}}</span></p>
                        <p><i><img src="/imgs/icons/write.png" alt=""></i>已写文章<span>{{articleCount}}</span></p>
                    </div>
                </div>
                <div class="focus">
                    <div class="first">
                        关注了
                        <span>{{focus}}</span>
                    </div>
                    <div>
                        关注者
                        <span>{{follower}}</span>
                    </div>
                </div>
                <ul>
                    <li>已收藏<span>{{collectCount}}</span></li>
                    <li>加入于<span>{{creatTime}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDayTime} from '../util';
    export default {
        name: 'personal',
        data() {
            return {
                activeName: 'news',
                isSelf: false, // 是否为用户本人
                authorName: '',
                authorWork: '',
                authorIntroduce: '',
                authorAvator: '',
                collectCount: 0,
                goodCount: 0,
                readCount: 0,
                articleCount: 0,
                focus: 0,
                follower: 0,
                creatTime: 0,
                focusList: [],  // 关注列表
            }
        },
        mounted(){
            this.$nextTick(()=>{
                let authorId = Number(this.$route.params.id);
                // 确定是否为用户本人
                if(this.$route.params.id == this.$cookie.get('userId')){
                    // 是则为可编辑
                    this.isSelf = true;
                    console.log(Object.hasOwnProperty.call(this.$store.state.userMessage,'userId'));
                    if(Object.hasOwnProperty.call(this.$store.state.userMessage,'collect')){
                        this.dataShow(this.$store.state.userMessage);
                    }else{
                        this.messageRequest(authorId);
                    }
    
                }else{
                    this.messageRequest(authorId);
                }
            })

        },
        methods:{
            // 编辑资料
            toSetting(){
                this.$emit('index',0);
                this.$router.push(`/setting/${this.$cookie.get('userId')}`);
            },
            // 选项卡切换触发
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 数据渲染
            dataShow(userMessage){
                // 是否存在数据，否则报错
                if(Object.hasOwnProperty.call(userMessage,'collect')){
                    this.authorName = userMessage.nickName;
                    this.authorWork = userMessage.userWork;
                    this.authorIntroduce = userMessage.userIntroduce;
                    this.authorAvator = userMessage.userAvatar;
                    this.collectCount = userMessage.collect.length;
                    this.goodCount = userMessage.goodCount || 0;
                    this.readCount = userMessage.articleCount;
                    this.articleCount = userMessage.articleCount;
                    this.focus = userMessage.focus.length;
                    this.follower = userMessage.follower.length;
                    this.creatTime = formatDayTime(userMessage.createTime).second;
                }else{
                    this.$message.error('获取用户数据失败');
                    return;
                }
            },
            // 请求用户信息
            messageRequest(userId){
                this.axios.get(`/api/user/${userId}`)
                .then((res)=>{
                    if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                        this.dataShow(res.data);
                    }else{
                        this.$message.error('网络异常');
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .personal{
        padding-top: 20px;
        background-color: #F5F5F5;
        .container{
            display: flex;
            justify-content:space-around;
            .left{
                flex: 2.5;
                .personalShow{
                    width: 100%;
                    height: 150px;
                    padding: 30px;
                    background: #fff;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                    display: flex;
                    .avatar{
                        flex: 1;
                        // text-align: center;
                    }
                    .message{
                        flex: 3;
                        h1{
                            margin-bottom: 10px;
                        }
                        p{
                            font-size: 14px;
                            color: #999999;
                            margin-bottom: 5px;
                            i{
                                // color: black;
                                font-size: 16px;
                                font-weight: bold;
                                margin-right: 10px;
                            }
                        }
                    }
                    .other{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        flex-direction: row-reverse;
                        .el-button{
                            padding: 10px 10px;
                            border: 1px solid #409EFF;
                            font-size: 16px;
                            color: #409EFF;
                        }
                        .focus-button{
                            border: 1px solid #67c23a;
                            color: #67c23a;
                        }
                    }
                }
                .content{
                    background: white;
                    padding-top: 10px;
                    padding-left: 20px;
                    margin-bottom: 20px;
                    .el-tab-pane{
                        .content-list{
                            width: 97%;
                            min-height: 500px;
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
                .honor{
                    background-color: white;
                    margin-bottom: 20px;
                    h2{
                        color: #31445b;
                        padding: 15px 15px;
                        border-bottom: 1px solid #d7d7d781;
                    }
                    div{
                        padding: 15px 15px;
                        font-size: 14px;
                        p{
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                            i{
                                display: inline-block;
                                padding: 5px;
                                width: 15px;
                                height: 15px;
                                background-color: rgb(225, 239, 255);
                                border-radius: 25px;
                                margin-right: 15px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            span{
                                margin-left: 15px;
                            }
                        }
                    }
                }
                .focus{
                    display: flex;
                    padding: 15px 0;
                    background-color: #fff;
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 20px;
                    .first{
                        border-right: 1px solid #d7d7d7;
                    }
                    div{
                        flex:1;
                        
                        span{
                            padding-top: 10px;
                            font-weight: bold;;
                            display: block;
                        }
                    }
                }
                ul{
                    border-top: 1px solid #e5e5e5;
                    padding: 2px 5px;
                    li{
                        font-size: 16px;
                        padding: 10px 0;
                        border-bottom: 1px solid #e5e5e5;
                        span{
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>