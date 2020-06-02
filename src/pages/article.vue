<template>
    <div class="user-article">
        <div class="container">
            <div class="left">
                <div class="content">
                    <div class="article-user">
                        <a href="javascript:;" @click="$router.push(`/personal/${authorId}`)" class="message">
                            <el-avatar :size="40" :src="userAvatar"></el-avatar>
                            <div class="box">
                                <div class="user-name">{{nickName}}</div>
                                <div class="create-time">{{articleCreateTime}} <span>阅读 {{articleReadCount}}</span></div>
                            </div>
                        </a>
                        <el-button v-if="!isSelf && !focusStatusList[authorId]" @click="focusClick(authorId)" type="success" plain size="medium">+ 关注</el-button>
                        <el-button v-if="!isSelf && focusStatusList[authorId]" @click="focusClick(authorId)" type="success" size="medium">已关注</el-button>
                        <el-button v-if="isSelf" @click="$router.push(`/edit/${articleId}`)"  type="primary" size="medium" plain>编辑</el-button>
                    </div>
                    <div class="article-title">
                        <img v-lazy="titleImgUrl" alt="">
                        <h1>{{title}}</h1>
                    </div>
                    <div class="article-content" ref="content" v-html="articleHTML">
                        
                    </div>
                    <div class="article-good">
                        <div class="good">
                            <div class="icon"><img src="/imgs/icons/good-article.png" alt=""></div>
                            <span>{{articleGoodCount}} 人点赞</span>
                        </div>
                        <div class="good">
                            <div class="icon"><img src="/imgs/icons/collect-article.png" alt=""></div>
                            <span>收藏</span>
                        </div>
                        <div class="good">
                            <div class="icon"><img src="/imgs/icons/gps.png" alt=""></div>
                            <span>{{place}}</span>
                        </div>
                        
                    </div>
                    <div class="article-userAgain">
                        <div class="message">
                            <el-avatar size="large" :src="userAvatar"></el-avatar>
                            <div class="box">
                                <div class="user-name">{{nickName}}</div>
                                <div class="create-time">发布了 {{userArticleCount}} 篇文章 · 获得点赞 {{userGoodCount}} · 获得阅读 {{userReadCount}}</div>
                            </div>
                        </div>
                        <el-button v-if="!isSelf && !focusStatusList[authorId]" @click="focusClick(authorId)" type="success" plain size="small">+ 关注</el-button>
                        <el-button v-if="!isSelf && focusStatusList[authorId]" @click="focusClick(authorId)" type="success" size="small">已关注</el-button>
                        <el-button v-if="isSelf" @click="$router.push(`/setting/${userId}`)" type="primary" size="small" plain>编辑</el-button>
                    </div>
                </div>
                <div class="article-comment" id="comment">
                    <div class="title">评论</div>
                    <div class="comment">
                        <div class="commentInput">
                            <el-avatar :size="40" :src="userAvatar"></el-avatar>
                            <el-input v-model="commentInput" 
                            type="textarea"
                            :rows="2"
                            placeholder="输入评论..."
                            @focus="$refs.commentButton.style.height = '40px'"></el-input>
                        </div>
                        <div ref="commentButton" class="commentButton">
                            <el-button size="small" type="primary" round>发布</el-button>
                            <el-button @click="$refs.commentButton.style.height = '0'" size="small" round>取消</el-button>
                        </div>
                    </div>
                    <!-- 一级评论 -->
                    <div class="commentBox" v-for="(item,index) in comment" :key="index">
                        <a href="javascript:;">
                            <el-avatar :size="40" :src="item.commentAvatar"></el-avatar>
                        </a>
                        <div class="commentMessage">
                            <a href="javascript:;" @click="$router.push(`/personal/${item.commentId}`)">{{item.commentName}}</a>
                            <p>{{item.commentContent}}</p>
                            <div class="date">
                                <span class="time">{{toTime(item.commentTime)}}</span>
                                <a href="javascript:;"><img src="/imgs/icons/good-article.png" alt=""> 0</a>
                                <a href="javascript:;" @click="showReplyBox('reply',index,true)"><img src="/imgs/icons/comment-article.png" alt=""> 回复</a>
                            </div>
                            <!-- 一级评论内回复框 -->
                            <div class="reply" ref="reply">
                                <div class="reply-comment">
                                    <el-input v-model="commentInput" 
                                    type="textarea"
                                    :rows="2"
                                    placeholder="输入评论..."
                                    ></el-input>
                                </div>
                                <div class="reply-button">
                                    <el-button size="small" type="primary" round>发布</el-button>
                                    <el-button @click="showReplyBox('reply',index,false)" size="small" round>取消</el-button>
                                </div>
                            </div>
                            <!-- 二级评论 -->
                            <div class="commentBox inside"  v-for="(replyItem,replyIndex) in item.reply" :key="replyIndex">
                                <a href="javascript:;">
                                    <el-avatar :size="40" :src="replyItem.replyAvatar"></el-avatar>
                                </a>
                                <div class="commentMessage">
                                    <a href="javascript:;" @click="$router.push(`/personal/${replyItem.replyId}`)">{{replyItem.replyName}}</a>
                                    <p>
                                        回复 
                                        <a href="javascript:;"  @click="$router.push(`/personal/${replyItem.toId}`)">{{replyItem.toName}}</a>:
                                        {{replyItem.replyContent}}</p>
                                    <div class="date">
                                        <span class="time">{{toTime(replyItem.replyTime)}}</span>
                                        <a href="javascript:;"><img src="/imgs/icons/good-article.png" alt=""> 0</a>
                                        <a href="javascript:;" @click="showReplyBox('replyInside',index+''+replyIndex,true)"><img src="/imgs/icons/comment-article.png" alt=""> 回复</a>
                                    </div>
                                    <!-- 评论内回复框 -->
                                    <div class="reply" :ref="'replyInside' + index + replyIndex">
                                        <div class="reply-comment">
                                            <el-input v-model="commentInput" 
                                            type="textarea"
                                            :rows="2"
                                            placeholder="输入评论..."
                                            ></el-input>
                                        </div>
                                        <div class="reply-button">
                                            <el-button size="small" type="primary" round>发布</el-button>
                                            <el-button @click="showReplyBox('replyInside',index+''+replyIndex,false)" size="small" round>取消</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- 作者信息 -->
                <div class="right-user">
                    <span class="span-box">关于作者</span>
                    <a href="javascript:;" @click="$router.push(`/personal/${authorId}`)" class="user">
                        <el-avatar :size="50" :src="userAvatar"></el-avatar>
                        <div class="box">
                            <div class="user-name">{{nickName}}</div>
                            {{userWork}}
                        </div>
                    </a>
                    <div class="honor">
                        <div>
                            <p><i><img src="/imgs/icons/good-blue.png" alt=""></i>获得点赞<span class="span-box">{{userGoodCount}}</span></p>
                            <p><i><img src="/imgs/icons/read.png" alt=""></i>文章被阅读<span class="span-box">{{userReadCount}}</span></p>
                        </div>
                    </div>
                </div>
                <!-- 推荐文章 -->
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
                <div class="right-app">
                    <div class="appCode"><img src="/imgs/QRCode.jpg" alt=""></div>
                    <div class="word">下载车车互联App<i class="el-icon-download"></i><div>最好的旅行方式是和一群志同道合的人。</div></div>
                </div>
            </div>
            <!-- 悬浮按钮 -->
            <div class="fixed">
                <div class="icon" @click="goodShow=!goodShow">
                    <a v-show="!goodShow" class="icon-good" href="javascript:;">
                        <span>{{articleGoodCount}}</span>
                    </a>
                    <a v-show="goodShow" class="icon-goodClick" href="javascript:;">
                        <span>{{articleGoodCount}}</span>
                    </a>
                </div>
                <div class="icon">
                    <a class="icon-comment" href="#comment">
                        <span>{{comment.length || 0}}</span>
                    </a>
                </div>
                <div class="icon" @click="collectClick">
                    <a v-show="!collectStatus" class="icon-collect" href="javascript:;"></a>
                    <a v-show="collectStatus" class="icon-collectClick" href="javascript:;"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDayTime,timestampToTime} from '../util';
    export default {
        name: 'user-article',
        data(){
            return {
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                // 是否已点赞
                goodShow: false,
                // 收藏状态
                collectStatus: false,
                // 评论框
                commentInput: '',
                // 用户信息
                userId: 0,
                nickName: '',
                userWork: '',
                userAvatar: '',
                userGoodCount: 0,
                userReadCount: 0,
                userArticleCount: 0, 
                // 文章信息
                authorId: 0,
                articleId: 0,
                title: '',
                titleImgUrl: '',
                category: '',
                place: '',
                articleHTML: '',
                articleCreateTime: 0,
                editTime: 0,
                articleReadCount: 0,
                articleGoodCount: 0,
                comment: [],
                // 是否为本人
                isSelf: false,
            }
        },
        computed:{
            focusStatusList(){
                return this.$store.state.focusStatusList;
            }
        },
        mounted(){
            this.articleId = Number(this.$route.params.id);
            this.userId = this.$Base64.decode(this.$cookie.get('userId'));
            this.axios.get(`/api/article/${this.articleId}`)
            .then((res)=>{
                if(res.status == 0){
                    let data = res.data;
                    this.authorId = Number(data.userId);

                    // TODO : 若为本人则可编辑
                    // 确定是否为用户本人
                    if(this.authorId == this.userId){
                        // 是则为可编辑
                        this.isSelf = true;
                        if(Object.hasOwnProperty.call(this.$store.state.userMessage,'collect')){
                            this.messageShow(this.$store.state.userMessage);
                        }else{
                            this.$message.error('网络异常');
                        }
                    }else{
                        // 获取用户数据
                        this.axios.get(`/api/user/${this.authorId}`)
                        .then((res)=>{
                            if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                                // 渲染用户数据
                                this.messageShow(res.data);
                            }else{
                                this.$message.error('网络异常');
                            }
                        })
                    }
                
                    // 匹配用户是否收藏
                    if(this.$store.state.loginStatus){
                        if(this.$store.state.userMessage.collect.indexOf(this.articleId) > -1){
                            this.collectStatus = true;
                        }
                    }

                    // 渲染文章数据
                    this.title = data.title;
                    this.titleImgUrl = data.titleImgUrl;
                    this.category = data.category;
                    this.place = data.place;
                    this.articleHTML = this.$Base64.decode(data.articleHTML);
                    // 修改html内容
                    // this.$refs.content.innerHTML = this.articleHTML;
                    this.articleCreateTime = formatDayTime(data.editTime).first;
                    this.editTime = formatDayTime(data.editTime).first;
                    this.articleReadCount = data.articleRead;
                    this.articleGoodCount = data.good;
                    this.comment = data.comment;
                }else{
                    this.$message.error('文章获取失败，请重试');
                }
            })
        },
        methods:{
            messageShow(data){
                // 渲染用户数据
                this.nickName = data.nickName;
                this.userWork = data.userWork;
                this.userAvatar = data.userAvatar;
                this.userGoodCount = data.goodCount || 0;
                this.userReadCount = data.articleReadCount;
                // this.userCreateTime = formatDayTime(res.data.createTime).first;
                this.userArticleCount = data.articleCount;
            },
            toTime(timestamp) {
                return timestampToTime(timestamp);
            },
            showReplyBox(id,index,show){
                if(id == 'reply'){
                    // 一级回复显示
                    if(show){
                        this.$refs.reply[index].style.height = '100px';
                    }else{
                        this.$refs.reply[index].style.height = '0';
                    }
                }else{
                    if(show){
                        this.$refs['replyInside' + index][0].style.height = '100px';
                    }else{
                        this.$refs['replyInside' + index][0].style.height = '0';
                    }
                }
            },
            // 关注/取关事件
            focusClick(focusId){
                // 检测是否登录
                if(!this.userId){
                    this.$message.warning('请先登录');
                    return;
                }
                this.axios.post('/api/util/focus', {
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
            // 收藏事件
            collectClick(){
                // 检测是否登录
                if(!this.userId){
                    this.$message.warning('请先登录');
                    return;
                }
                this.axios.post('/api/util/collect', {
                    uid: this.userId,
                    aid: this.articleId
                })
                .then((res)=>{
                    if(res.status == 0){
                        this.$message.success('收藏成功');
                        this.collectStatus = true;
                    }else if(res.status == 1){
                        this.$message.success('取消收藏成功');
                        this.collectStatus = false;
                    }else{
                        this.$message.error('网络异常');
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .user-article{
        position: relative;
        img{
            width: 100%;
        }
        padding-top: 20px;
        .container{
            display: flex;
            .left{
                flex: 3;
                margin-right: 10px;
                .content{
                    padding: 20px;
                    // background-color: rgb(245, 186, 186);
                    margin-bottom: 20px;
                    background-color: #fff;
                    .article-user{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        .message{
                            display: flex;
                            align-items: center;
                            .box{
                                margin-left: 10px;
                                .user-name{
                                    font-weight: 700;
                                    color: #333;
                                    font-size: 18px;
                                    font-weight: 700;
                                }
                                .create-time{
                                    font-size: 14px;
                                    letter-spacing: 1px;
                                    color: #999999;
                                }
                            }
                        }
                    }
                    .article-title{
                        width: 100%;
                        img{
                            width: 100%;
                        }
                        h1{
                            font-size: 30px;
                            margin: 20px 0;
                        }
                    }
                    .article-content{
                        font-size: 16px;
                        line-height: 30px;
                        p{
                            margin-bottom: 20px;
                        }
                    }
        
                    .article-good{
                        width: 100%;
                        border-bottom: 1px solid #ccc;
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                        .good{
                            margin-right: 30px;
                            .icon{
                                margin: 0 auto;
                                width: 20px;
                                height: 20px;
                                padding: 5px;
                                border: 1px #ccc solid;
                                border-radius: 30px;
                                cursor: pointer;
                                margin-bottom: 5px;
                                &:hover{
                                    background: #F5F5F5;
                                }
                            }
                            span{
                                
                                color: #999999;
                            }
                        }
                    }
                    .article-userAgain{
                        width: 100%;
                        height: 70px;
                        background: #F5F5F5;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 0 20px;
                        cursor: pointer;
                        .message{
                            display: flex;
                            align-items: center;
                            .box{
                                margin-left: 10px;
                                .user-name{
                                    font-weight: 700;
                                    color: #333;
                                    font-size: 18px;
                                    font-weight: 700;
                                }
                                .create-time{
                                    font-size: 14px;
                                    letter-spacing: 1px;
                                    color: #999999;
                                }
                            }
                        }
                    }
                }
                .article-comment{
                    background-color: white;
                    padding: 20px;
                    margin-bottom: 50px;
                    .title{
                        text-align: center;
                        font-size: 16px;
                        color: #8a93a0;
                        margin-bottom: 20px;
                    }
                    .comment{
                        background: #fafbfc;
                        padding: 12px 15px 5px 15px;
                        .commentInput{
                            display: flex;
                            margin-bottom: 10px;
                            align-items: center;
                            .el-textarea{
                                margin-left: 20px;
                                width: 90%;
                            }
                        }
                        .commentButton{
                            height: 0;
                            overflow: hidden;
                            margin-right: 5px;
                            text-align: right;
                            transition: height 0.5s;
                        }
                    }
                    // 评论
                    .commentBox{
                        margin: 10px 19px 0 58px;
                        display: flex;
                        a{
                            color: black;
                            font-size: 14px;
                            .el-avatar{
                                margin-right: 10px;
                            }
                        }
                        .commentMessage{
                            width: 100%;
                            font-size: 14px;
                            border-bottom: 1px solid #e5e5e5;
                            padding-bottom: 20px;
                            p{
                                margin: 8px 0 13px 0;
                            }
                            .date{
                                color: #8a93a0;
                                display: flex;
                                margin-bottom: 10px;
                                a{
                                    flex:0.5;
                                    text-align: right;
                                    margin-right: 20px;
                                    display: flex;
                                    align-items: center;
                                    color: #8a93a0;
                                    &:hover{
                                        opacity: 0.8;
                                    }
                                    img{
                                        width: 16px;
                                        height: 16px;
                                        margin-right: 5px;
                                    }
                                }
                                .time{
                                    flex: 3;
                                    text-align: left;
                                }
                            }
                            // 评论内的回复框
                            .reply{
                                box-sizing: border-box;
                                height: 0;
                                padding-right: 25px;
                                margin-bottom: 10px;
                                overflow: hidden;
                                transition: all 0.5s;
                                .reply-comment{
                                    margin-bottom: 10px;
                                }
                                .reply-button{
                                    text-align: right;
                                }
                            }
                            // 评论内回复
                            .inside{
                                margin: 0;
                                padding: 15px 15px;
                                background-color: #fafbfc;
                                .commentMessage{
                                    border-bottom: 0;
                                    padding-bottom: 0;
                                    p{
                                        a{
                                            color: #406599;
                                        }
                                    }
                                    .date{
                                        margin: 0;
                                        margin-bottom: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .right{
                flex: 1;
                .right-user{
                    background: #fff;
                    margin-bottom: 20px;
                    .span-box{
                        display: block;
                        font-size: 14px;
                        padding: 12px 15px;
                        border-bottom: 1px solid hsla(0,0%,58.8%,.1);
                    }
                    .user{
                        display: flex;
                        padding: 12px 15px;
                        .box{
                            margin-left: 10px;
                            color: #999999;
                            font-size: 14px;
                            .user-name{
                                color: black;
                                font-size: 16px;
                                font-weight: bold;
                                margin-bottom: 7px;
                            }
                        }
                    }
                    .honor{
                        padding-bottom: 10px;
                        div{
                            padding: 0 15px;
                            font-size: 14px;
                            p{
                                line-height: 10px;
                                display: flex;
                                align-items: center;
                                margin-top: 5px;
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
                                    margin-left: 0px;
                                    border-bottom: 0px;
                                }
                            }
                        }
                    }
                }
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
            .fixed{
                position: fixed;
                top: 50%;
                left: calc((100% - 960px)/2 - 66px);
                transform: translateY(-50%);
                height: 150px;
                .icon{
                    // width: 36px;
                    // height: 36px;
                    // background-color: white;
                    margin-bottom: 10px;
                    a{
                        // border: 1px solid #a58f8f;
                        display: block;
                        position: relative;
                        width: 40px;
                        height: 40px;
                        border-radius: 26px;
                        box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
                        span{
                            position: absolute;
                            right: -6px;
                            top: -6px;
                            background-color: #bfbfbf;
                            border-radius: 5px;
                            padding: 1px 3px;
                            font-size: 12px;
                            transform: scale(0.8);
                            color: white;
                            line-height: 12px;
                        }
                    }
                    .icon-good{
                        background: url('/imgs/icons/good-article.png') #fff no-repeat center;
                        background-size: 22px;
                        &:hover{
                            background: url('/imgs/icons/good-article2.png') #fff no-repeat center;
                            background-size: 24px;
                        }
                    }
                    .icon-goodClick{
                        background: url('/imgs/icons/good-article4.png') #fff no-repeat center;
                        background-size: 22px;
                        span{
                            background-color: #409EFF;
                        }
                    }
                    .icon-comment{
                        background: url('/imgs/icons/comment-article.png') #fff no-repeat center;
                        background-size: 22px;
                        &:hover{
                            background: url('/imgs/icons/comment-article2.png') #fff no-repeat center;
                            background-size: 24px;
                        }
                    }
                    .icon-collect{
                        background: url('/imgs/icons/collect-article.png') #fff no-repeat center;
                        background-size: 22px;
                        &:hover{
                            background: url('/imgs/icons/collect-article2.png') #fff no-repeat center;
                            background-size: 24px;
                        }
                    }
                    .icon-collectClick{
                        background: url('/imgs/icons/collect-article3.png') #fff no-repeat center;
                        background-size: 22px;
                    }
                }
            }
        }
    }
</style>