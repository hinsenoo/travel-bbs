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
                                <div class="create-time">{{articleCreateTime}}  <span>阅读 {{articleReadCount}}</span></div>
                            </div>
                        </a>
                        <el-button v-if="!isSelf && !followingIdList[authorId]" @click="focusClick(authorId)" type="success" plain size="medium" :loading="followLoading">+ 关注</el-button>
                        <el-button v-if="!isSelf && followingIdList[authorId]" @click="focusClick(authorId)" type="success" size="medium" :loading="followLoading">已关注</el-button>
                        <el-button v-if="isSelf" @click="$router.push(`/edit/${articleId}`)"  type="primary" size="medium" plain>编辑</el-button>
                    </div>
                    <div class="article-title">
                        <img :src="titleImgUrl" alt="">
                        <h1>{{title}}</h1>
                    </div>
                    <div class="article-content" ref="content" v-html="articleHTML">
                        
                    </div>
                    <div class="article-good">
                        <div class="good">
                            <div class="icon icon-good"><img src="/imgs/icons/good-bottom.png" alt=""></div>
                            <span>{{likeCount || 0}} 人点赞</span>
                        </div>
                        <div class="good">
                            <div class="icon"><img src="/imgs/icons/gps.png" alt=""></div>
                            <span>{{place}}</span>
                        </div>
                        
                    </div>
                    <div class="article-userAgain">
                        <a class="message" href="javascript:;" @click="$router.push(`/personal/${authorId}`)">
                            <el-avatar size="large" :src="userAvatar"></el-avatar>
                            <div class="box">
                                <div class="user-name">{{nickName}}</div>
                                <div class="create-time">发布了 {{userArticleCount}} 篇文章 · 获得点赞 {{userGoodCount}} · 获得阅读 {{userReadCount}}</div>
                            </div>
                        </a>
                        <el-button v-if="!isSelf && !followingIdList[authorId]" @click="focusClick(authorId)" type="success" plain size="small" :loading="followLoading">+ 关注</el-button>
                        <el-button v-if="!isSelf && followingIdList[authorId]" @click="focusClick(authorId)" type="success" size="small" :loading="followLoading">已关注</el-button>
                        <el-button v-if="isSelf" @click="$router.push(`/setting/${userId}`)" type="primary" size="small" plain>编辑</el-button>
                    </div>
                </div>
                <!-- 评论 -->
                <div class="article-comment" id="comment">
                    <div class="title">评论</div>
                    <div class="comment">
                        <div class="commentInput">
                            <el-avatar :size="40" :src="loginAvatar"></el-avatar>
                            <el-input v-model="commentInput" 
                            type="textarea"
                            :rows="2"
                            placeholder="输入评论..."
                            @focus="commentFocus"></el-input>
                        </div>
                        <div ref="commentButton" class="commentButton">
                            <el-button size="small" type="primary" round @click="postComment('first')">发布</el-button>
                            <el-button @click="$refs.commentButton.style.height = '0'" size="small" round>取消</el-button>
                        </div>
                    </div>
                    <!-- 一级评论 -->
                    <div class="commentBox" v-for="(item,index) in comment" :key="index">
                        <a href="javascript:;" @click="$router.push(`/personal/${item.commentator._id}`)">
                            <el-avatar :size="40" :src="item.commentator.avatar_url"></el-avatar>
                        </a>
                        <div class="commentMessage">
                            <a href="javascript:;" @click="$router.push(`/personal/${item.commentator._id}`)">{{item.commentator.nick_name}}</a>
                            <p>{{item.content}}</p>
                            <div class="date">
                                <span class="time">{{toTime(item.createdAt)}}</span>
                                <a href="javascript:;"><img src="/imgs/icons/good-article.png" alt=""> 0</a>
                                <a href="javascript:;" @click="showReplyBox('reply',index,true)"><img src="/imgs/icons/comment-article.png" alt=""> 回复</a>
                            </div>
                            <!-- 一级评论内回复框 -->
                            <div class="reply" ref="reply">
                                <div class="reply-comment">
                                    <el-input v-model="replyInput" 
                                    type="textarea"
                                    :rows="2"
                                    placeholder="输入评论..."
                                    ></el-input>
                                </div>
                                <div class="reply-button">
                                    <el-button size="small" type="primary" round @click="postComment('second',item._id,item.commentator.nick_name,item.commentator._id,1)">发布</el-button>
                                    <el-button @click="showReplyBox('reply',index,false)" size="small" round>取消</el-button>
                                </div>
                            </div>
                            <!-- 二级评论 -->
                            <div class="commentBox inside"  v-for="(replyItem,replyIndex) in item.reply" :key="replyIndex">
                                <a href="javascript:;" @click="$router.push(`/personal/${replyItem.commentator._id}`)">
                                    <el-avatar :size="40" :src="replyItem.commentator.avatar_url"></el-avatar>
                                </a>
                                <div class="commentMessage">
                                    <a href="javascript:;" @click="$router.push(`/personal/${replyItem.commentator._id}`)">{{replyItem.commentator.nick_name}}</a>
                                    <p>
                                        回复 
                                        <a href="javascript:;"  @click="$router.push(`/personal/${replyItem.replyTo._id}`)">{{replyItem.replyTo.nick_name}}</a>:
                                        {{replyItem.content}}</p>
                                    <div class="date">
                                        <span class="time">{{toTime(replyItem.createdAt)}}</span>
                                        <a href="javascript:;"><img src="/imgs/icons/good-article.png" alt=""> 0</a>
                                        <a href="javascript:;" @click="showReplyBox('replyInside',index+''+replyIndex,true)"><img src="/imgs/icons/comment-article.png" alt=""> 回复</a>
                                    </div>
                                    <!-- 评论内回复框 -->
                                    <div class="reply" :ref="'replyInside' + index + replyIndex">
                                        <div class="reply-comment">
                                            <el-input v-model="replyInsideInput" 
                                            type="textarea"
                                            :rows="2"
                                            placeholder="输入评论..."
                                            ></el-input>
                                        </div>
                                        <div class="reply-button">
                                            <el-button size="small" type="primary" round @click="postComment('second',item._id,replyItem.commentator.nick_name,replyItem.commentator._id,2)">发布</el-button>
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
                            {{employment}}
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
                    <h3><img src="/imgs/icons/articleLogo.png">作者文章</h3>
                    <a href="javascript:;" @click="$router.push(`/article/${item._id}`)"  class="recommend" v-for="(item,index) in userArticleList" :key="index">
                        <div class="title">{{item.title}}</div>
                        <div class="icon">
                            <span><img src="/imgs/icons/good-article.png" alt="">{{item.likeCount || 0}}</span>
                            <span><img class="comment" src="/imgs/icons/comment-article.png" alt="">{{(item.comment instanceof Array) ? item.comment.length : 0}}</span>
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
                <div class="icon" @click="goodClick">
                    <a v-show="!likeArticleIdList[articleId]" class="icon-good" href="javascript:;">
                        <span>{{likeCount || 0}}</span>
                    </a>
                    <a v-show="likeArticleIdList[articleId]" class="icon-goodClick" href="javascript:;">
                        <span>{{likeCount || 0}}</span>
                    </a>
                </div>
                <div class="icon">
                    <a class="icon-comment" href="javascript:;" @click="returnCom">
                        <span>{{comment.length || 0}}</span>
                    </a>
                </div>
                <div class="icon" @click="collectClick">
                    <a v-show="!collectIdList[articleId]" class="icon-collect" href="javascript:;"></a>
                    <a v-show="collectIdList[articleId]" class="icon-collectClick" href="javascript:;"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDayTime,timestampToTime} from '../../util';
    export default {
        name: 'user-article',
        data(){
            return {
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                // 是否已点赞
                goodStatus: false,
                // 收藏状态
                collectStatus: false,
                // 评论框内容
                commentInput: '',
                // 回复框内容
                replyInput: '',
                replyInsideInput: '',
                // 用户信息
                nickName: '',
                employment: '',
                userAvatar: '',
                userGoodCount: 0,
                userReadCount: 0,
                userArticleCount: 0, 
                // 文章信息
                authorId: 0,
                articleId: 1234,
                title: '',
                titleImgUrl: '',
                category: '',
                place: '',
                articleHTML: '',
                articleCreateTime: 0,
                editTime: 0,
                articleReadCount: 0,
                userArticle: 0,
                userArticleList: [],
                likeCount: 0,
                comment: [],
                // 是否为本人
                isSelf: false,
                focusStatusList: [],    // 关注id列表
                followingStatus: false, // 关注状态
                followLoading: false,   // 按钮加载
                likeLock: false,    // 点赞锁 
                collectLock: false,    // 收藏锁 
            }
        },
        computed:{
            // focusStatusList(){
            //     return this.$store.state.focusStatusList;
            // },
            loginStatus(){
                return this.$store.state.loginStatus;
            },
            loginAvatar(){
                if(!this.$store.state.userMessage.avatar_url){
                    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
                }else{
                    return this.$store.state.userMessage.avatar_url;
                }
            },
            userId(){
                return this.$store.state.userMessage._id;
            },
            followingList() {
                return this.$store.state.userMessage.following;
            },
            followingIdList(){
                return this.$store.state.followingIdList;
            },
            likeArticleIdList(){
                return this.$store.state.likeArticleIdList;
            },
            collectIdList(){
                return this.$store.state.collectIdList;
            },
        },
        watch: {
            $route() {
            // console.log("🚀 ~ file: Personal.vue ~ line 201 ~ $route ~ newVal", newVal)
                this.$router.go();
            },
            collectIdList(newVal) {
                if(newVal[this.articleId]) this.collectStatus = true;
            },
            likeArticleIdList(newVal) {
                if(newVal[this.articleId]) this.goodStatus = true;
            },
            userId(newVal) {
                if(this.authorId == newVal) this.isSelf = true;
            },
            followingList(newVal) {
                // 关注者 id 列表
                this.focusStatusList = [];
                newVal.forEach((item) => this.focusStatusList.push(item._id));
                console.log(this.focusStatusList);
                // console.log('查询',this.focusStatusList.indexOf(this.authorId),this.focusStatusList, this.authorId);
                this.followingStatus = this.focusStatusList.indexOf(this.authorId) === -1 ? false : true;
            },
            authorId(newVal) {
                if(newVal !== 0) {
                    console.log(newVal);
                    this.followingStatus = this.focusStatusList.indexOf(newVal) === -1 ? false : true;
                }
            }
        },
        mounted(){
            this.$emit("index", 0);
            this.articleId = this.$route.params.id;
            this.$axios.get(`${this.$api.getArticleInfo.url}/${this.articleId}`)
            .then((res)=>{
                if(res.status == 0){
                    let data = JSON.parse(JSON.stringify(res.data));
                    this.authorId = data.writer._id;
                    this.getAuthorInfo(this.authorId);
                    // TODO : 若为本人则可编辑
                    // 确定是否为用户本人
                    console.log(this.userId);
                    console.log(this.authorId == this.userId,'////');
                    if(this.authorId == this.userId){
                        // 是则为可编辑
                        this.isSelf = true;
                        this.messageShow(this.$store.state.userMessage);
                    }else{
                        this.messageShow(res.data.writer);
                    }
                
                    // return;
                    // 渲染文章数据
                    console.log("文章数据", data);
                    this.title = data.title;
                    this.titleImgUrl = data.titleImgUrl;
                    this.category = data.category;
                    this.place = data.place;
                    this.articleHTML = data.articleHTML;
                    // 修改html内容
                    // this.$refs.content.innerHTML = this.articleHTML;
                    this.articleCreateTime = formatDayTime(data.createdAt).first;
                    // this.editTime = formatDayTime(data.updatedAt).first;
                    this.articleReadCount = data.pageViews;
                    this.likeCount = data.likeCount || 0;
                    if(this.likeArticleIdList[this.articleId]) this.goodStatus = true;


                    // // 评论拼接
                    // this.addComment(data.comment);


                    // // 匹配用户是否收藏
                    // if(this.$store.state.loginStatus){
                    //     if(this.$store.state.userMessage.collect.indexOf(this.articleId) > -1){
                    //         this.collectStatus = true;
                    //     }
                    // }

                    // // 匹配用户是否点赞
                    // if(this.$store.state.loginStatus){
                    //     if(this.articleGood.indexOf(this.userId) > -1){
                    //         this.goodStatus = true;
                    //     }
                    // }
                }else{
                    this.$router.push('/');
                    this.$message.error('文章获取失败，请重试');
                }
            })
            this.getCommentList();
        },
        methods:{
            // 获取作者信息
            getAuthorInfo(id) {
                // 文章列表
                this.$axios.get(`/users/${id}/articles`)
                .then((res) => {
                    if (res.status == 0) {
                        this.userArticleList = res.data.slice(0,5);
                    } else {
                        this.$message.error("获取作者数据失败");
                    }
                });
                // 个人信息
                this.$axios.get(`/users/${id}`)
                .then((res) => {
                    if (res.status == 0) {
                        console.log('1222', res.data);
                        this.userArticleCount = res.data.articleCount;
                        this.userGoodCount = res.data.likeCount;
                        this.userReadCount = res.data.articlesReadCount;
                    } else {
                        this.$message.error("获取作者数据失败");
                    }
                });
            },
            // 渲染用户数据
            messageShow(data){
                console.log(data);
                // 渲染用户数据
                this.nickName = data.nick_name;
                this.employment = data.employment;
                this.userAvatar = data.avatar_url;
                this.userGoodCount = data.goodCount || 0;
                this.userReadCount = data.articleReadCount || 0;
                // this.userCreateTime = formatDayTime(res.data.createTime).first;
                // this.userArticleCount = data.articleCount.length;
                // this.userArticle = data.articleCount;

                // if(this.userArticle.length != 0){
                //     this.userArticle.slice(0,5).forEach((item) => {
                //         this.axios.get(`/api/article/${item}`)
                //         .then((res)=>{
                //             if(res.status == 0){
                //                 this.userArticleList.push(res.data);
                //             }else{
                //                 this.$message.error('网络异常');
                //             }
                //         })
                //     })
                    // this.axios.post('/api/article/collect',{ ids: this.userArticle })
                    // .then((res)=>{
                    //     if(res.status == 0){
                    //         res.data.forEach((item)=>{
                    //             let p = this.$Base64.decode(item.articleHTML);
                    //             // 匹配第一个 p 标签的内容，转换为 HTML 。使用 innerText 提取文字内容。并截取省略
                    //             item.articleHTML = getPText(p);
                    //             this.userArticle.push(item);
                    //             // this.$set(this.hotList,index,item);
                    //         })
                    //     }else{
                    //         this.$message.error('网络异常');
                    //     }
                    // })
                // }
            },
            toTime(timestamp) {
                return timestampToTime(timestamp);
            },
            // 评论跳转
            returnCom(){
                const returnEle = document.querySelector("#comment");
                if(returnEle){
                    returnEle.scrollIntoView();
                }
            },
            // 二级评论框
            showReplyBox(id,index,show){
                // 登录校验
                if(!this.checkLogin()){
                    return;
                }
                if(id == 'reply'){
                    // 一级回复显示
                    if(show){
                        this.$refs.reply[index].style.height = '110px';
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
                    this.$store.dispatch('saveLoginModal', true);
                    return;
                }
                this.followLoading = true;
                // 已关注则取关
                let followingIdList = this.followingIdList;
                if(this.followingIdList[focusId]) {
                    // 取关
                    this.$axios.delete(`/users/following/${focusId}`)
                    .then((res)=>{
                            if(res.status === 0) {
                                delete followingIdList[focusId];
                                this.$store.dispatch('saveFollowingIdList', followingIdList);
                                this.$message.success('取关成功');
                            }else {
                                this.$message.warning(res.msg);
                            }
                            this.followLoading = false;
                    })
                }else {
                    this.$axios.put(`/users/following/${focusId}`)
                    .then((res)=>{
                            if(res.status === 0) {
                                followingIdList[focusId] = true;
                                this.$store.dispatch('saveFollowingIdList', followingIdList);
                                this.$message.success('关注成功');
                            }else {
                                this.$message.warning(res.msg);
                            }
                            this.followLoading = false;
                        // // 取关
                        // let focusObj = this.focusStatusList;
                        // if(res.status == 1){
                        //     this.$message.success('取关成功');
                        //     delete focusObj[focusId];
                        //     this.$store.dispatch('saveFocusStatusList', focusObj);
                        // }else if(res.status == 0){
                        //     this.$message.success('关注成功');
                        //     focusObj[focusId] = true;
                        //     this.$store.dispatch('saveFocusStatusList', focusObj);
                        // }else{
                        //     this.$message.error('网络异常');
                        // }
                    })
                }

            },
            // 收藏事件
            collectClick(){
                if(!this.collectLock) {
                    this.collectLock = true;
                    // 登录校验
                    if(!this.checkLogin()){
                        return;
                    }
                    let articleId = this.articleId;
                    let collectIdList = this.collectIdList;
                    if(this.collectIdList[articleId]) {
                        this.$axios.delete(`/users/collectingArticles/${articleId}`)
                        .then((res)=>{
                            if(res.status == 0){
                                delete collectIdList[articleId];
                                this.$store.dispatch('saveCollectIdList', collectIdList);
                                this.$message.success('取消收藏成功');
                            }else{
                                this.$message.error('网络异常');
                            }
                            this.collectLock = false;
                        })
                    }else {
                        this.$axios.put(`/users/collectingArticles/${articleId}`)
                        .then((res)=>{
                            if(res.status == 0){
                                collectIdList[articleId] = true;
                                this.$store.dispatch('saveCollectIdList', collectIdList);
                                this.$message.success('收藏成功');
                            }else{
                                this.$message.error('网络异常');
                            }
                            this.collectLock = false;
                        })
    
                    }
                }
            },
            // 点赞事件
            goodClick(){
                if(!this.likeLock) {
                    this.likeLock = true;
                    // 登录校验
                    if(!this.checkLogin()){
                        return;
                    }
                    let articleId = this.articleId;
                    let likeArticleIdList = this.likeArticleIdList;
                    if(this.likeArticleIdList[articleId]) {
                        this.$axios.delete(`/users/likingArticles/${articleId}`)
                        .then((res)=>{
                            if(res.status == 0){
                                delete likeArticleIdList[articleId];
                                this.likeCount -= 1;
                                this.$store.dispatch('saveLikeArticleIdList', likeArticleIdList);
                                this.$message.success('取消点赞成功');
                            }else{
                                this.$message.error('网络异常');
                            }
                            this.likeLock = false;
                        })
                    }else {
                        this.$axios.put(`/users/likingArticles/${articleId}`)
                        .then((res)=>{
                            if(res.status == 0){
                                likeArticleIdList[articleId] = true;
                                this.$store.dispatch('saveLikeArticleIdList', likeArticleIdList);
                                this.likeCount += 1;
                                this.$message.success('点赞成功');
                            }else{
                                this.$message.error('网络异常');
                            }
                            this.likeLock = false;
                        })
    
                    }
                }
            },
            // 评论聚焦
            commentFocus(){
                if(this.checkLogin()){
                    this.$refs.commentButton.style.height = '40px';
                }
            },
            // 无登录则弹框
            checkLogin(){
                if(!this.loginStatus){
                    this.$store.dispatch('saveLoginModal', 1);
                    return false;
                }
                return true;
            },
            getCommentList() {
                this.comment = [];
                this.$axios.get(`/articles/${this.articleId}/comments`)
                .then(res => {
                    if(res.status === 0) {
                        let data = res.data;
                        if(data.length > 0) {
                            data.forEach((item, index) => {
                                if(!item.rootCommentId) {
                                    this.comment.push(item);
                                    this.getSecondComment(item._id, index, item);
                                }
                            })
                        }
                    }
                })
            },
            getSecondComment(rootCommentId, index, item){
                console.log(12312);
                this.$axios.get(`/articles/${this.articleId}/comments?rootCommentId=${rootCommentId}`)
                .then(res => {
                    if(res.status === 0) {
                        item.reply = res.data;
                        this.$set(this.comment, index, item);
                    }
                })
            },
            postComment(level,commentId,toName,toId,index){
                // 登录校验
                if(!this.checkLogin()){
                    return;
                }
                if(level == 'first'){
                    this.$axios.post(`/articles/${this.articleId}/comments`,{
                        // level: 'first',
                        // articleId: this.articleId,
                        // commentName: commentName,
                        // userId: this.userId,
                        // commentAvatar: this.loginAvatar,
                        // commentContent: this.commentInput,
                        // replyStatus: false,
                        // commentTime: new Date().getTime()
                        content: this.commentInput,
                    })
                    .then((res)=>{
                        if(res.status == 0){
                            console.log(res);
                            this.getCommentList();
                            this.$message.success('评论成功');
                            // this.axios.get(`/api/article/${this.articleId}`)
                            // .then((res)=>{
                            //     this.addComment(res.data.comment);
                            //     this.commentInput = '';
                            //     this.$refs.commentButton.style.height = '0px';
                            // })
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }else{
                    let replyContent;
                    if(index == 2){
                        replyContent = this.replyInsideInput
                    }else{
                        replyContent = this.replyInput;
                    }
                    // 二级评论上传
                    this.$axios.post(`/articles/${this.articleId}/comments`,{
                        rootCommentId: commentId,
                        replyTo: toId,
                        content: replyContent,
                    })
                    .then((res)=>{
                        if(res.status == 0){
                            console.log(res);
                            this.getCommentList();
                            this.$message.success('评论成功');
                            // this.$message.success(res.msg);
                            // this.axios.get(`/api/article/${this.articleId}`)
                            // .then((res)=>{
                            //     this.addComment(res.data.comment);
                            //     this.replyInput = '';
                            //     this.replyInsideInput = '';
                            // })
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }
            },
            // 评论拼接
            addComment(comment){
                // 评论拼接
                comment.forEach((item,index) => {
                    // 若存在二级评论，则拼接
                    if(item.replyStatus != '0'){
                        this.axios.get(`/api/article/queryReply/${item.commentId}`)
                        .then((res)=>{
                            if(res.status == 0){
                                item['reply'] = res.data;
                            }
                            // 响应式
                            this.$set(this.comment, index, item);
                        })
                    }
                });
                this.comment = comment;
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
                                    font-weight: 600;
                                    margin-bottom: 5px;
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
                        margin-top: 20px;
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
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                &:hover{
                                    background: #F5F5F5;
                                }
                            }
                            .icon-good{
                                img{
                                    width: 17px;
                                    height: 17px;
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
                        margin: 15px 19px 0 58px;
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
                            // padding-bottom: 10px;
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
                                overflow: hidden;
                                transition: all 0.5s;
                                .reply-comment{
                                    // margin-top: 10px;
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
                                margin-bottom: 10px;
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
                        img{
                            width: 16px;
                            height: 16px;
                            margin-right: 5px;
                            position: relative;
                            top: 3px;
                        }
                    }
                    .recommend{
                        display: block;
                        font-size: 14px;
                        padding: 12px 15px;
                        color: black;
                        border-bottom: 1px solid rgba(204, 204, 204, 0.212);
                        .title{
                            margin-bottom: 10px;
                        }
                        .icon{
                            display: flex;
                            span{
                                display: flex;
                                align-items: flex-start;
                                color: #bfbfbf;
                                margin-right: 20px;
                                img{
                                    width: 15px;
                                    height: 15px;
                                    margin-right: 5px;
                                }
                                .comment{
                                    width: 16px;
                                    height: 16px;
                                    box-sizing: border-box;
                                    position: relative;
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
                transform: translate(-180%, 100%);
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