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
                        <p><i class="el-icon-user"></i>{{authorEmployment}}</p>
                        <p><i class="el-icon-edit"></i>{{authorIntroduce}}</p> 
                    </div>
                    <div class="other">
                        <el-button v-if="isSelf" @click="toSetting" type="primary" plain>编辑个人资料</el-button>
                        <el-button v-if="!isSelf && !followingIdList[authorId]" @click="focusClick(authorInfo)" type="success" plain size="medium" :loading="followLoadingList[authorId]">+ 关注</el-button>
                        <el-button v-if="!isSelf && followingIdList[authorId]" @click="focusClick(authorInfo)" type="success" size="medium" :loading="followLoadingList[authorId]">已关注</el-button>
                    </div>
                </div>
                <div class="content">
                    <el-tabs v-model="messageName" @tab-click="handleClick">
                        <el-tab-pane label="文章" name="news" v-loading="articlesLoading">
                            <div class="content-list">
                                <el-popover v-for="(item, index) in articleList" :key="index"
                                    placement="top"
                                    width="70"
                                    trigger="hover"
                                    :disabled="!isSelf"
                                    >
                                    <div class="content-button">
                                        <el-button @click="toEdit(item._id)" type="primary" icon="el-icon-edit" circle></el-button>
                                        <el-button @click="toDelete(item._id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </div>
                                    <div class="content-listNews" slot="reference">
                                        <div>
                                            <ul class="meta">
                                                <li class="categroy"><a href="javascript:;">{{item.category}}</a></li>
                                                <li class="author">{{item.nickName}}</li>
                                                <li>{{item.pageViews}}人阅读</li>
                                                <li class="area">{{item.place}}</li>
                                            </ul>
                                        </div>
                                        <!-- 主体内容 -->
                                        <div class="news" @click="toArticle(item._id)">
                                            <div class="word">
                                                <div class="title">
                                                    <a href="javascript:;" @click="toArticle(item._id)">{{item.title}}</a>
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
                                </el-popover>
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
                                        <a href="javascript:;" @click="toPersonal(item._id)"  class="message">
                                            <el-avatar :size="40" :src="item.avatar_url"></el-avatar>
                                            <div class="box">
                                                <div class="user-name">{{item.nick_name}}</div>
                                                <p><i class="el-icon-user"></i>{{item.employment}}</p>
                                            </div>
                                        </a>
                                        <el-button v-if="followingIdList[item._id] && userId != item._id" :loading="followLoadingList[item._id]" type="success" size="small" @click="focusClick(item)">已关注</el-button>
                                        <el-button v-if="!followingIdList[item._id] && userId != item._id" :loading="followLoadingList[item._id]" type="success" size="small" @click="focusClick(item)" plain>+ 关注</el-button>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="关注者" name="follower">
                                    <div class="focusMessage" v-for="(item,index) in followerList" :key="index">
                                        <a href="javascript:;"  @click="toPersonal(item._id)"  class="message">
                                            <el-avatar :size="40" :src="item.avatar_url"></el-avatar>
                                            <div class="box">
                                                <div class="user-name">{{item.nick_name}}</div>
                                                <p><i class="el-icon-user"></i>{{item.employment}}</p>
                                            </div>
                                        </a>
                                        <el-button v-if="followingIdList[item._id] && userId != item._id " :loading="followLoadingList[item._id]" type="success" size="small" @click="focusClick(item)" >已关注</el-button>
                                        <el-button v-if="!followingIdList[item._id] && userId != item._id" :loading="followLoadingList[item._id]" type="success" size="small" @click="focusClick(item)" plain>+ 关注</el-button>
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
                                            <li class="author"><a href="javascript:;" @click="toPersonal(item.writer)">{{item.writerInfo.nick_name}}</a></li>
                                            <li>{{item.pageViews}}人阅读</li>
                                            <li class="area">{{item.place}}</li>
                                        </ul>
                                    </div>
                                    <!-- 主体内容 -->
                                    <div class="news" @click="toArticle(item._id)">
                                        <div class="word">
                                            <div class="title">
                                                <a href="javascript:;" @click="toArticle(item._id)">{{item.title}}</a>
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
                        <p>
                            <span>
                                <i>
                                    <img src="/imgs/icons/good-blue.png" alt="">
                                </i>
                                获得点赞
                            </span>
                            <span class="honor__number">{{ likeCount }}</span>
                        </p>
                        <p>
                            <span>
                                <i>
                                    <img src="/imgs/icons/read.png" alt="">
                                </i>
                                文章被阅读
                            </span>
                            <span class="honor__number">{{articlesReadCount}}</span>
                        </p>
                        <p>
                            <span>
                                <i>
                                    <img src="/imgs/icons/write.png" alt="">
                                </i>
                                已写文章
                            </span>
                            <span class="honor__number">{{articleCount}}</span>
                        </p>
                    </div>
                </div>
                <div class="focus">
                    <div class="first" @click="messageName='focusList';focusName='focus';">
                        关注了
                        <span>{{focusList.length}}</span>
                    </div>
                    <div @click="messageName='focusList';focusName='follower';">
                        关注者
                        <span>{{followerList.length}}</span>
                    </div>
                </div>
                <ul>
                    <li class="collectLi" @click="toCollect">已收藏<span>{{collectList.length || 0 }}</span></li>
                    <li>加入于<span>{{creatTime}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDayTime,getPText} from '../../../util';
    export default {
        name: 'personal',
        data() {
            return {
                messageName: 'news',
                focusName: 'focus',
                isSelf: false, // 是否为用户本人
                authorId: 0, // 访问的作者
                authorName: '',
                authorEmployment: '',
                authorIntroduce: '',
                authorAvator: '',
                collectCount: 0,
                likeCount: 0,
                articlesReadCount: 0,
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
                articlesLoading: false, // 文章加载状态
                focusStatus: true, // 关注状态
                userId: 0,
                followLoading: false,   // 按钮加载
                followLoadingList: {},
                followingStatus: false, // 关注状态
            }
        },
        computed:{
            followingIdList(){
                return this.$store.state.followingIdList;
            },
            followingList() {
                return this.$store.state.userMessage.following;
            },
            collectIdListLength() {
                return Object.getOwnPropertyNames(this.$store.state.collectIdList).length || 0;
            },
        },
        watch: {
            $route(newVal) {
            // console.log("🚀 ~ file: Personal.vue ~ line 201 ~ $route ~ newVal", newVal)
                if(newVal.query.type === 'collect') {
                    this.toCollect();
                }else if(newVal.query.type === 'focus') {
                    this.messageName='focusList';
                    this.focusName='focus';
                }
                this.$router.go();
                
            }
            // followingList: {
            //     handler: function (newVal) { 
            //         // 关注者 id 列表
            //         // this.focusStatusList = [];
            //         // if(newVal) {
            //         //     newVal.forEach((item) => this.focusStatusList.push(item._id));
            //         //     this.authorId = this.$route.params.id;
            //         //     this.followingStatus = this.focusStatusList.indexOf(this.authorId) === -1 ? false : true;
            //         // }
            //         console.log("🚀 ~ file: Personal.vue ~ line 205 ~ followingList ~ this.authorId", this.authorId)
            //         console.log("🚀 ~ file: Personal.vue ~ line 205 ~ followingList ~ this.focusStatusList", this.focusStatusList)
            //     },
            //     immediate: true
            // },
        },
        mounted(){
            this.$nextTick(()=>{
                this.userId = this.$storage.getItem('userId');
                this.authorId = this.$route.params.id;
                this.getUserInfo(this.authorId);
                this.getUserArticle(this.authorId);
                // 确定是否为用户本人
                if(this.authorId == this.userId){
                    // 是则为可编辑
                    this.isSelf = true;
                }
                if(this.$route.query.type == 'collect'){
                    this.toCollect();
                }else if(this.$route.query.type == 'focus'){
                    this.messageName='focusList';
                    this.focusName='focus';
                }
                
            })
        },
        methods:{
            toEdit(id) {
                window.open(`${window.location.origin}/edit/${id}`, '_blank');
            },
            toDelete(id) {
                console.log(id);
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/article/${id}`)
                    .then((res)=>{
                        console.log(res);
                        this.getUserArticle(this.authorId);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            // 编辑资料
            toSetting(){
                this.$emit('index',0);
                console.log(111);
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
                // TODO: 是否存在数据，否则报错
                // if(Object.hasOwnProperty.call(userMessage,'collect')){
                    this.authorName = userMessage.nick_name;
                    this.authorEmployment = userMessage.employment;
                    this.authorIntroduce = userMessage.headline || '无';
                    this.authorAvator = userMessage.avatar_url;
                    // this.collectCount = userMessage.collect.length;
                    this.likeCount = userMessage.likeCount || 0;
                    this.articlesReadCount = userMessage.articlesReadCount;
                    this.articleCount = userMessage.articleCount;
                    // this.articleIdList = userMessage.articleCount;
                    this.focusList = userMessage.following;
                    // this.focus = userMessage.focus.length;
                    this.followerList = userMessage.followers;
                    this.collectList = userMessage.collectingArticles;
                    console.log("🚀 ~ file: Personal.vue ~ line 278 ~ dataShow ~ userMessage.collectingArticles", userMessage.collectingArticles)
                    // this.follower = userMessage.follower.length;
                    this.creatTime = formatDayTime(userMessage.createdAt).second;

                    
                // }else{
                //     this.$message.error('获取用户数据失败');
                //     return;
                // }
            },
            // 请求用户信息
            getUserInfo(id){
                this.$axios.get(`${this.$api.getUserInfo.url}/${id}`)
                .then((res)=>{
                    if(Object.hasOwnProperty.call(res,'status') && res.status == 0){
                        this.dataShow(res.data);
                        this.authorInfo = res.data;
                    }else{
                        this.$message.error('获取用户数据失败');
                    }
                })
            },
            // 获取用户文章信息
            getUserArticle(id) {
                // 获取文章
                // this.articleIdList.forEach((item) => {
                this.articlesLoading = true;
                this.articleList = [];
                this.$axios.get(`/users/${id}/articles`)
                        .then((res)=>{
                            // console.log(res);
                            this.articlesLoading = false;
                            if(res.status == 0){
                                let list = res.data;
                                if(list.length > 0) {
                                    list.forEach((item) => {
                                        // console.log(item.articleHTML);
                                        // item.userId = item.writer._id;
                                        item.nickName = item.writer.nick_name;
                                        item.articleHTML = getPText(item.articleHTML);
                                        this.articleList.push(item);
                                    })
                                }
                            //     let p = this.$Base64.decode(res.data.articleHTML);
                            //     res.data.articleHTML = getPText(p);
                            //     this.articleList.push(res.data);
                            }else{
                                this.$message.error('网络异常');
                            }
                        })
                    // })
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
            focusClick(focusInfo){
                let focusId = focusInfo._id;
                // 检测是否登录
                if(!this.userId){
                    this.$message.warning('请先登录');
                    this.$store.dispatch('saveLoginModal', true);
                    return;
                }
                this.$set(this.followLoadingList, focusId, true);
                // this.followLoadingList[focusId] = true;
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
                                if(focusId === this.authorId) {
                                    let delIndex;
                                    this.followerList.forEach((item,index) => item._id === this.userId ? delIndex = index : '');
                                    this.followerList.splice(delIndex, 1);
                                }
                            }else {
                                this.$message.warning(res.msg);
                            }
                            // this.followLoadingList[focusId] = false;
                            this.$set(this.followLoadingList, focusId, false);
                    })
                }else {
                    this.$axios.put(`/users/following/${focusId}`)
                    .then((res)=>{
                            if(res.status === 0) {
                                followingIdList[focusId] = true;
                                this.$store.dispatch('saveFollowingIdList', followingIdList);
                                this.$message.success('关注成功');
                                if(focusId === this.authorId) {
                                    this.followerList.push(this.$store.state.userMessage);
                                }
                            }else {
                                this.$message.warning(res.msg);
                            }
                            // this.followLoadingList[focusId] = false;
                            this.$set(this.followLoadingList, focusId, false);
                        // // 取关
                        // let focusObj = this.focusStatusList;
                        // if(res.status == 1){
                        //     this.$message.success('取关成功');
                        //     delete focusObj[focusId];
                        //     this.$store.dispatch('saveFollowingIdList', focusObj);
                        // }else if(res.status == 0){
                        //     this.$message.success('关注成功');
                        //     focusObj[focusId] = true;
                        //     this.$store.dispatch('saveFollowingIdList', focusObj);
                        // }else{
                        //     this.$message.error('网络异常');
                        // }
                    })
                }

            },
            // 收藏夹跳转
            toCollect(){
                this.messageName = 'collectList';
                this.collect = [];
                this.collectLoading = true;
                // 收藏夹无内容则直接跳过
                console.log('1232131',this.collectList);
                if(this.collectIdListLength == 0){
                    setTimeout(()=>{
                        this.collectLoading = false;
                    }, 1000)
                    return;
                }

                // 获取收藏列表
                if(this.collectIdListLength != 0){
                    this.$axios.get(`/users/${this.authorId}/collectingArticles`)
                    .then((res)=>{
                        if(res.status == 0){
                            let collectList = res.data;
                            collectList.forEach(item => {
                                item.articleHTML = getPText(item.articleHTML);
                                this.collect.push(item);
                            })
                            this.collectLoading = false;
                        }else{
                            this.$message.error('网络异常');
                        }
                    })
                }
            },
            toArticle(id){
                this.$emit('index',0);
                window.open(`${window.location.origin}/article/${id}`, '_blank');
            },
            toPersonal(id){
                this.$emit('index',0);
                if(id !== this.$route.params.id) {
                    window.open(`${window.location.origin}/personal/${id}`, '_blank');
                }
            }
        }
    }
</script>

<style lang="scss">
    .content-button {
        display: flex;
        justify-content: space-around;
    }
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
                        padding: 15px 15px 15px 0;
                        font-size: 14px;
                        p{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
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
                            .honor__number {
                                display: flex;
                                padding: 5px;
                                justify-content: center;
                                align-items: center;
                                background-color: #e1efff9a;
                                border: 1px solid #e1efff;
                                border-radius: 10px;
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