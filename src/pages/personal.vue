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
                        <el-button v-if="isSelf" @click="toSetting" type="primary" plain>编辑个人资料</el-button>
                        <el-button v-if="!isSelf && !focusStatusList[authorId]" @click="focusClick(authorId)" type="success" plain>+ 关注</el-button>
                        <el-button v-if="!isSelf && focusStatusList[authorId]" @click="focusClick(authorId)" type="success" size="small">已关注</el-button>
                    </div>
                </div>
                <div class="content">
                    <el-tabs v-model="messageName" @tab-click="handleClick">
                        <el-tab-pane label="文章" name="news">
                            <div class="content-list">
                                <div class="content-listNews"  v-for="(item, index) in articleList" :key="index">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">{{item.category}}</a></li>
                                            <li class="author"><a href="javascript:;" @click="$router.push(`/personal/${item.userId}`)">{{item.nickName}}</a></li>
                                            <li>{{item.articleRead}}人阅读</li>
                                            <li class="area">{{item.place}}</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news" @click="toArticle(item.articleId)">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;" @click="toArticle(item.articleId)">{{item.title}}</a>
                                            </div>
                                            <div class="fragment">
                                                {{item.articleHTML}}
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img :src="item.titleImgUrl" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good2.png" alt="点赞">{{ (item.good instanceof Array) ? item.good.length : 0}}</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark2.png" alt="评论">{{(item.comment instanceof Array) ? item.good.length : 0 }}</a></div>
                                    </div>
                                </div>
                                <!-- 3. 滚动加载
                                <div class="scroll-more"
                                    v-infinite-scroll="scrollMore"
                                    infinite-scroll-disabled="busy"
                                    infinite-scroll-distance="120"
                                >
                                    <img src="/loading/loading-spinning-bubbles.svg" alt="" v-if="showScroll">
                                    <p v-if="showData">没有更多了</p>
                                </div> -->
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="关注" name="focusList">
                            <el-tabs v-model="focusName" tab-position="left" style="min-height: 200px;">
                                <el-tab-pane label="关注了" name="focus">
                                    <div class="focusMessage" v-for="(item,index) in focusList" :key="index">
                                        <a href="javascript:;" @click="$router.push(`/personal/${item.userId}`)" class="message">
                                            <el-avatar :size="40" :src="item.userAvatar"></el-avatar>
                                            <div class="box">
                                                <div class="user-name">{{item.nickName}}</div>
                                                <p><i class="el-icon-user"></i>{{item.userWork}}</p>
                                            </div>
                                        </a>
                                        <el-button v-if="focusStatusList[item.userId] && userId != item.userId" type="success" size="small" @click="focusClick(item.userId)">已关注</el-button>
                                        <el-button v-if="!focusStatusList[item.userId] && userId != item.userId" type="success" size="small" @click="focusClick(item.userId)" plain>+ 关注</el-button>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="关注者" name="follower">
                                    <div class="focusMessage" v-for="(item,index) in followerList" :key="index">
                                        <a href="javascript:;" @click="$router.push(`/personal/${item.userId}`)" class="message">
                                            <el-avatar :size="40" :src="item.userAvatar"></el-avatar>
                                            <div class="box">
                                                <div class="user-name">{{item.nickName}}</div>
                                                <p><i class="el-icon-user"></i>{{item.userWork}}</p>
                                            </div>
                                        </a>
                                        <el-button v-if="focusStatusList[item.userId] && userId != item.userId " type="success" size="small" @click="focusClick(item.userId)" >已关注</el-button>
                                        <el-button v-if="!focusStatusList[item.userId] && userId != item.userId" type="success" size="small" @click="focusClick(item.userId)" plain>+ 关注</el-button>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>
                        <el-tab-pane v-loading="collectLoading" label="收藏夹" name="collectList">
                            <div class="content-list">
                                <div class="content-listNews"  v-for="(item, index) in collect" :key="index">
                                    <div>
                                        <ul class="meta">
                                            <li class="categroy"><a href="javascript:;">{{item.category}}</a></li>
                                            <li class="author"><a href="javascript:;" @click="$router.push(`/personal/${item.userId}`)">{{item.nickName}}</a></li>
                                            <li>{{item.articleRead}}人阅读</li>
                                            <li class="area">{{item.place}}</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news" @click="toArticle(item.articleId)">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;" @click="toArticle(item.articleId)">{{item.title}}</a>
                                            </div>
                                            <div class="fragment">
                                                {{item.articleHTML}}
                                            </div>
                                        </div>
                                        <div class="photo">
                                            <img :src="item.titleImgUrl" alt="">
                                        </div>
                                    </div>
                                    <div class="other">
                                        <div><a href="javascript:;"><img src="/imgs/icons/good2.png" alt="点赞">{{ (item.good instanceof Array) ? item.good.length : 0}}</a></div>
                                        <div><a href="javascript:;"><img src="/imgs/icons/remark2.png" alt="评论">{{(item.comment instanceof Array) ? item.good.length : 0 }}</a></div>
                                    </div>
                                </div>
                            </div>
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
                    <div class="first" @click="messageName='focusList';focusName='focus';">
                        关注了
                        <span>{{focus}}</span>
                    </div>
                    <div @click="messageName='focusList';focusName='follower';">
                        关注者
                        <span>{{follower}}</span>
                    </div>
                </div>
                <ul>
                    <li class="collectLi" @click="toCollect">已收藏<span>{{collectCount}}</span></li>
                    <li>加入于<span>{{creatTime}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDayTime,getPText} from '../util';
    export default {
        name: 'personal',
        data() {
            return {
                messageName: 'news',
                focusName: 'focus',
                isSelf: false, // 是否为用户本人
                authorId: 0, // 访问的作者
                authorName: '',
                authorWork: '',
                authorIntroduce: '',
                authorAvator: '',
                collectCount: 0,
                goodCount: 0,
                readCount: 0,
                articleCount: 0,
                articleIdList: [], // 文章id列表
                articleList: [], // 文章列表
                focus: 0,
                follower: 0,
                creatTime: 0,
                focusList: [],  // 关注列表
                followerList: [],  // 关注者列表
                collectList: [],  // 收藏列表
                collect: [],
                collectLoading: false,
                focusStatus: true, // 关注状态
                userId: 0,
                
            }
        },
        computed:{
            focusStatusList(){
                return this.$store.state.focusStatusList;
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.userId = this.$Base64.decode(this.$cookie.get('userId'));
                this.authorId = Number(this.$route.params.id);
                // 确定是否为用户本人
                if(this.authorId == this.userId){
                    // 是则为可编辑
                    this.isSelf = true;
                }
                this.messageRequest(this.authorId);
                if(this.$route.query.type == 'collect'){
                    this.toCollect();
                }else if(this.$route.query.type == 'focus'){
                    this.messageName='focusList';
                    this.focusName='focus';
                }
                
            })
        },
        methods:{
            // 编辑资料
            toSetting(){
                this.$emit('index',0);
                this.$router.push(`/setting/${this.userId}`);
            },
            // 选项卡切换触发
            handleClick(tab) {
                // 收藏夹拉取
                if(tab.index == 2){
                    this.toCollect();
                }
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
                    this.readCount = userMessage.articleReadCount;
                    this.articleCount = userMessage.articleCount.length;
                    this.articleIdList = userMessage.articleCount;
                    this.focus = userMessage.focus.length;
                    this.focusList = userMessage.focus;
                    this.followerList = userMessage.follower;
                    this.collectList = userMessage.collect;
                    this.follower = userMessage.follower.length;
                    this.creatTime = formatDayTime(userMessage.createTime).second;

                    // 获取文章
                    if(this.articleIdList.length != 0){
                        this.articleIdList.forEach((item) => {
                            this.axios.get(`/api/article/${item}`)
                            .then((res)=>{
                                if(res.status == 0){
                                    let p = this.$Base64.decode(res.data.articleHTML);
                                    res.data.articleHTML = getPText(p);
                                    this.articleList.push(res.data);
                                }else{
                                    this.$message.error('网络异常');
                                }
                            })
                        })
                    }
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
            },
            // 查询是否已关注
            // checkFocus(personId,focusList){
            //     console.log(personId,focusList);
            //     if(!focusList.length){
            //         return false;
            //     }
            //     var focusStatus = focusList.some((item) => {
                    
            //         return item.userId == personId;
            //     })
            //     return focusStatus;
            // },
            // 关注/取关事件
            focusClick(focusId){
                // 检测是否登录
                if(!this.userId){
                    this.$message.warning('请先登录');
                    return;
                }
                this.axios.post('/api/util/focus/', {
                    uid: this.userId,
                    fuid: focusId
                })
                .then((res)=>{
                    // 取关
                    let focusObj = this.focusStatusList;
                    if(res.status == 1){
                        this.$message.success('取关成功');
                        delete focusObj[focusId];
                        this.$store.dispatch('saveFocusStatusList', focusObj);
                    }else if(res.status == 0){
                        this.$message.success('关注成功');
                        focusObj[focusId] = true;
                        this.$store.dispatch('saveFocusStatusList', focusObj);
                    }else{
                        this.$message.error('网络异常');
                    }
                })

            },
            // 收藏夹跳转
            toCollect(){
                this.messageName = 'collectList';
                this.collect = [];
                this.collectLoading = true;
                // 收藏夹无内容则直接跳过
                if(this.collectList.length == 0){
                    setTimeout(()=>{
                        this.collectLoading = false;
                    }, 1000)
                    return;
                }

                // 获取收藏列表
                if(this.collectList.length != 0){
                    this.collectList.forEach((item) => {
                        this.axios.get(`/api/article/${item}`)
                        .then((res)=>{
                            if(res.status == 0){
                                let p = this.$Base64.decode(res.data.articleHTML);
                                res.data.articleHTML = getPText(p);
                                this.collect.push(res.data);
                                this.collectLoading = false;
                            }else{
                                this.$message.error('网络异常');
                            }
                        })
                    })
                }
            },
            toArticle(id){
                this.$emit('index',0);
                this.$router.push(`/article/${id}`);
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
                            font-size: 16px;
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
                            min-height: 400px;
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
                                    margin-bottom: 10px;
                                    cursor: pointer;
                                    transition: all 0.5s;
                                    &:hover{
                                        opacity: 0.8;
                                    }
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
                        .focusMessage{
                            border-bottom: 1px #e5e5e5 solid;/*  */
                            padding: 15px;
                            margin-right: 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            &:hover{
                                background: #F5F5F5;
                            }
                            .message{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                .box{
                                    margin-left: 20px;
                                    .user-name{
                                        font-weight: 700;
                                        color: #333;
                                        font-size: 18px;
                                        font-weight: 700;
                                        margin-bottom: 5px;
                                    }
                                    p{
                                        font-size: 12px;
                                        letter-spacing: 1px;
                                        color: #999999;
                                    }
                                }
                            }
                        }
                        .el-tab-pane{
                            // border-top: 1px #e5e5e5 solid;
                            padding-bottom: 20px;
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
                        cursor: pointer;
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
                    .collectLi{
                        cursor: pointer;
                        &:hover{
                            color: #5f5f5f;
                        }
                    }
                    
                }
            }
        }
    }
</style>