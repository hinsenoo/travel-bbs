<template>
  <div class="index">
    <div class="container">
      <!-- 左侧内容 -->
      <div class="left">
        <!-- 轮播图 -->
        <div class="slideshow">
          <el-carousel height="300px">
            <el-carousel-item
              v-for="(item, index) in slideshowList"
              :key="index"
            >
              <img :src="item" alt="slideshow" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 文章列表 -->
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="热门" name="hot">
              <div class="content-list" ref="scrollList">
                <div
                  class="content-listNews"
                  v-for="(item, index) in hotList"
                  :key="index"
                >
                  <div>
                    <ul class="meta">
                      <li class="categroy">
                        <a href="javascript:;">{{ item.category }}</a>
                      </li>
                      <li class="author">
                        <a
                          href="javascript:;"
                          @click="$router.push(`/personal/${item.writer._id}`)"
                          >{{ item.nickName }}</a
                        >
                      </li>
                      <li>{{ item.pageViews }}人阅读</li>
                      <li class="area">{{ item.place }}</li>
                    </ul>
                  </div>
                  <!-- 主体内容 -->
                  <div class="news" @click="toArticle(item._id)">
                    <div class="word">
                      <div class="title">
                        <a
                          href="javascript:;"
                          @click="toArticle(item._id)"
                          >{{ item.title }}</a
                        >
                      </div>
                      <div class="fragment">
                        {{ item.articleHTML }}
                      </div>
                    </div>
                    <div class="photo">
                      <img :src="item.titleImgUrl" alt="" />
                    </div>
                  </div>
                  <div class="other">
                    <div>
                      <a href="javascript:;"
                        ><img src="/imgs/icons/good2.png" alt="点赞" />{{
                          item.good instanceof Array ? item.good.length : 0
                        }}</a
                      >
                    </div>
                    <div>
                      <a href="javascript:;"
                        ><img src="/imgs/icons/remark2.png" alt="评论" />{{
                          item.comment instanceof Array ? item.good.length : 0
                        }}</a
                      >
                    </div>
                  </div>
                </div>
                <!-- <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" direction="bottom" :distance="num">    </infinite-loading> -->
                <!-- 3. 滚动加载 -->
                <div
                  class="scroll-more"
                >
                  <img
                    src="/loading/loading-spinning-bubbles.svg"
                    alt=""
                    v-show="showScroll"
                  />
                  <p v-if="!showHotData && !showScroll">没有更多了</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="最新" name="newest">
              <div class="content-list">
                <div
                  class="content-listNews"
                  v-for="(item, index) in newList"
                  :key="index"
                >
                  <div>
                    <ul class="meta">
                      <li class="categroy">
                        <a href="javascript:;">{{ item.category }}</a>
                      </li>
                      <li class="author">
                        <a
                          href="javascript:;"
                          @click="$router.push(`/personal/${item.userId}`)"
                          >{{ item.nickName }}</a
                        >
                      </li>
                      <li>{{ item.pageViews }}人阅读</li>
                      <li class="area">{{ item.place }}</li>
                    </ul>
                  </div>
                  <!-- 主体内容 -->
                  <div class="news" @click="toArticle(item._id)">
                    <div class="word">
                      <div class="title">
                        <a
                          href="javascript:;"
                          @click="toArticle(item._id)"
                          >{{ item.title }}</a
                        >
                      </div>
                      <div class="fragment">
                        {{ item.articleHTML }}
                      </div>
                    </div>
                    <div class="photo">
                      <img v-lazy="item.titleImgUrl" alt="" />
                    </div>
                  </div>
                  <div class="other">
                    <div>
                      <a href="javascript:;"
                        ><img src="/imgs/icons/good2.png" alt="点赞" />{{
                          item.good instanceof Array ? item.good.length : 0
                        }}</a
                      >
                    </div>
                    <div>
                      <a href="javascript:;"
                        ><img src="/imgs/icons/remark2.png" alt="评论" />{{
                          item.comment instanceof Array ? item.good.length : 0
                        }}</a
                      >
                    </div>
                  </div>
                </div>
                <!-- 3. 滚动加载 -->
                <div
                  class="scroll-more"
                >
                  <img
                    src="/loading/loading-spinning-bubbles.svg"
                    alt=""
                    v-show="showScroll"
                  />
                  <p v-if="!showNewData && !showScroll">没有更多了</p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <div class="user" v-if="loginStatus">
          <div class="message">
            <div class="avator">
              <a href="javascript:;" @click="toPersonal">
                <el-avatar :size="80" :src="userAvatar"></el-avatar>
                <div class="userName">
                  <div>{{ nickName }}</div>
                  <div class="good">
                    <span>
                      <img src="/imgs/icons/good-white.png" alt="" />
                      {{ goodCount }}
                    </span>
                  </div>
                  <div class="time">注册了: {{ registerTime }}</div>
                </div>
              </a>
            </div>
            <div class="news">
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push(`/personal/${userId}`)"
                    >我的全部文章<span>{{ articleCount }}</span></a
                  >
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push(`/personal/${userId}?type=collect`)"
                    >我的收藏夹<span>{{ collectCount }}</span></a
                  >
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="$router.push(`/personal/${userId}?type=focus`)"
                    >我的关注<span>{{ focusCount }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right-recommend">
          <h3><img src="/imgs/icons/prize.png" alt="" />热度排行</h3>
          <a
            href="javascript:;"
            @click="$router.push(`/article/${item._id}`)"
            class="recommend"
            v-for="(item, index) in hotPrize"
            :key="index"
          >
            <div class="iconTitle">
              <div class="iconPhoto">
                <img :src="'/imgs/icons/Prize' + (index + 1) + '.png'" alt="" />
              </div>
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="icon">
              <span
                ><img src="/imgs/icons/good-article.png" alt="" />{{
                  item.good instanceof Array ? item.good.length : 0
                }}</span
              >
              <span
                ><img
                  class="comment"
                  src="/imgs/icons/comment-article.png"
                  alt=""
                />{{
                  item.comment instanceof Array ? item.comment.length : 0
                }}</span
              >
            </div>
          </a>
        </div>
        <div class="right-app">
          <div class="appCode"><img src="/imgs/QRCode.jpg" alt="" /></div>
          <div class="word">
            扫码下载车车互联App<i class="el-icon-download"></i>
            <div>最好的旅行方式是和一群志同道合的人。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatLastTime, getPText,throttle } from "../util/index";
export default {
  // 组件名称
  name: "index",
  data() {
    return {
      activeName: "hot",
      // 轮播图
      slideshowList: [
        "/imgs/slideshow/1.jpg",
        "/imgs/slideshow/2.jpg",
        "/imgs/slideshow/3.png",
        "/imgs/slideshow/5.jpg",
        "/imgs/slideshow/6.jpg",
        "/imgs/slideshow/7.jpg",
      ],
      photoUrl: "/imgs/demo/3.jpg", // 文章图片
      hotList: [], // 热门文章列表
      newList: [], // 最新文章列表
      userId: 0,
      pageSize: 5, // 每页数量
      showScroll: true, // 滚动加载图案显示
      disabled: true,


      hotLoading: false,  // 热度加载
      showHotData: true,  // 更多数据显示
      hotStart: 1, // 开始数据索引

      newLoading: false,  // 最新加载
      showNewData: true,  // 更多数据显示
      newStart: 1, // 开始数据索引

      num: 20,
      isKaiGuan: true,
      tabType: 'pageViews', // 导航类型
    };
  },
  computed: {
    // 用户头像
    userAvatar() {
      return this.$store.state.userMessage.avatar_url;
    },
    // 昵称
    nickName() {
      return this.$store.state.userMessage.nick_name;
    },
    // 点赞数
    goodCount() {
      // return this.$store.state.userMessage.goodCount || 0;
      return 0;
    },
    // 文章数
    articleCount() {
      return this.$store.state.userMessage.articleCount;
    },
    // 收藏数
    collectCount() {
      // return this.$store.state.userMessage.collect.length || 0;
      return 0;
    },
    // 关注数
    focusCount() {
      // return this.$store.state.userMessage.focus.length || 0;
      return 0;
    },
    // 注册时长
    registerTime() {
      let date = formatLastTime(this.$store.state.userMessage.createdAt);
      if (date.days < 365) {
        if (date.days === 0) {
          return date.hours + " 小时";
        }
        return date.days + " 天";
      } else {
        return (date.days / 365).toFixed(2) + " 年";
      }
    },
    // 登录状态
    loginStatus() {
      return this.$store.state.loginStatus;
    },
    hotPrize() {
      return this.hotList.slice(0, 5);
    },
    // cartCount(){
    //     return this.$store.state.cartCount;
    // },
    // ...mapState(['username','cartCount'])
  },
  mounted() {
    // this.getUserInfo();
    this.userId = this.$storage.getItem("userId");
    this.$emit("index", 1);

    // if (this.$route.path == "/employeeActivity") {
    window.addEventListener("scroll", this.menu);
      
    // } else {
    // }
    setTimeout(()=> { 
      this.postArticle('pageViews');
      
    }, 1000)
  },
  methods: {
    menu() {
      // 加载中不触发
      if (this.hotLoading || this.newLoading) {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
          var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
          // let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
          if (Number(scrollTop + windowHeight + 100).toFixed(0) > Number(scrollHeight)) {
            // 无数据不触发
            let showData = this.tabType === 'pageViews' ? this.showHotData : this.showNewData;
            console.log(this.tabType,showData);
            if(showData) {
              this.showScroll = true;
              throttle(this.postArticle(this.tabType), 1000);
            }
      }
      }
    },
    //滚动条在Y轴上的滚动距离
    getScrollTop() {
      var documentScrollTop = 0;
      documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      return documentScrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var documentScrollHeight = 0;
      documentScrollHeight = this.$refs.scrollList.scrollHeight;
      return documentScrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight() {
      var windowHeight = 0;
      windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      return windowHeight;
    },
    // 初始化用户数据
    getUserInfo() {
      // console.log('初始化数据');
      this.userId = this.$storage.getItem("userId");
      if (this.userId !== "" && !this.$store.state.loginStatus) {
        this.$axios
          .get(`${this.$api.getUserInfo.url}/${this.userId}`)
          .then((res) => {
            if (Object.hasOwnProperty.call(res, "status") && res.status == 0) {
              this.$store.dispatch("saveUserMessage", res.data);
              this.$store.dispatch("saveLoginStatus", true);
              // this.dataShow(res.data);
            } else {
              this.$message.error("获取用户数据失败");
            }
          });
      }
    },
    // 文章导航栏
    handleClick(tab) {
      console.log(tab.index);
      if (tab.index == 0) {
        this.hotLoading = true;
        this.newLoading = false;
        this.showScroll = true;
        setTimeout(()=> this.postArticle(), 1000);
      }
      if (tab.index == 1) {
        // 数据初始化
        this.newLoading = false;
        this.hotLoading = false;
        this.showScroll = true;
        this.tabType = 'createdAt';
        setTimeout(()=> this.postArticle(), 1000);
        // window.addEventListener("scroll", this.menu);
      }
    },
    // 跳转到个人主页
    toPersonal() {
      this.$emit("index", 0);
      this.$router.push(`/personal/${this.$storage.getItem("userId")}`);
    },
    toArticle(id) {
      this.$emit("index", 0);
      this.$router.push(`/article/${id}`);
    },
    // 拉取文章
    postArticle() {
      // 加载关闭
      this.hotLoading = false;
      this.newLoading = false;
      this.$axios
        .get(`${this.$api.getArticleList.url}?sort=${this.tabType}&per_page=2&page=${this.tabType === 'pageViews' ? this.hotStart : this.newStart}`)
        .then((res) => {
          // console.log(res);
          if (res.status == 0) {
            let list = res.data;
            if (list.length > 0) {
              this.tabType === 'pageViews' ? this.hotStart += 1 : this.newStart += 1;
              list.forEach((item) => {
                // let p = item.articleHTML;
                // 匹配第一个 p 标签的内容，转换为 HTML 。使用 innerText 提取文字内容。并截取省略
                item.articleHTML = getPText(item.articleHTML);
                item.nickName = item.writer.nick_name;
                this.tabType === 'createdAt' 
                ? this.newList.push(item)
                : this.hotList.push(item);
              });
            }
            
            // 关闭 loading
            // this.showScroll = false;
            if(this.tabType === 'pageViews') {
              // 加载开启
              this.hotLoading = true;
              this.showHotData = res.data.length !== 0 ? true : false;
              this.showScroll = res.data.length !== 0 ? true : false;
              // console.log(this.showHotData, res.data.length);
            }else {
              this.newLoading = true;
              this.showNewData = res.data.length !== 0 ? true : false;
              this.showScroll = res.data.length !== 0 ? true : false;
            }
            
          } else {
            this.$message.error("网络异常");
          }
        })
        .catch(() => {
          this.$message.error("网络异常");
        });
    },
  },
};
</script>
<style lang="scss">
.index {
  padding-top: 20px;
  background-color: #f5f5f5;
  .container {
    display: flex;
    .left {
      flex: 2.5;
      margin-bottom: 20px;
      .slideshow {
        width: 100%;
        height: 300px;
        // background: #fff;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content {
        background: white;
        padding-top: 10px;
        padding-left: 20px;
        overflow: auto;
        // min-height: 500px;
        .el-tab-pane {
          .content-list {
            width: 97%;
            min-height: 400px;
            // border: 1px solid black;
            .content-listNews {
              padding: 18px 0px;
              border-bottom: 1px solid #e0efeb;
              // 标签
              .meta {
                margin-bottom: 10px;
                li {
                  display: inline-block;
                  color: #909090;
                }
                .categroy {
                  margin-right: 14px;
                  a {
                    color: #b71ed7;
                    text-align: center;
                    padding: 3px 10px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    &:hover {
                      background-color: #ddd;
                    }
                  }
                }
                .author {
                  a {
                    color: #585858;
                    &:hover {
                      color: black;
                    }
                  }
                  &:after {
                    font-weight: bold;
                    content: "·";
                    color: rgb(178, 186, 194);
                    margin: 0px 5px;
                  }
                }
                .area {
                  &:before {
                    font-weight: bold;
                    content: "·";
                    color: rgb(178, 186, 194);
                    margin: 0px 5px;
                  }
                }
              }
              .news {
                width: 95%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                  opacity: 0.8;
                }
                .word {
                  flex: 2;
                  margin-right: 20px;
                  // 文章标题
                  .title {
                    margin-bottom: 5px;
                    a {
                      font-size: 18px;
                      color: #333;
                      font-weight: bold;
                      &:hover {
                        text-decoration: underline;
                        color: #409eff;
                      }
                    }
                  }
                  // 节选
                  .fragment {
                    font-size: 13px;
                    line-height: 24px;
                    color: #999;
                  }
                }
                .photo {
                  width: 150px;
                  height: 100px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
              }
              .other {
                div {
                  display: inline-block;
                  a {
                    display: flex;
                    // height: 3px;
                    border: 1px solid #edeeef;
                    border-radius: 1px;
                    padding: 3px 10px;
                    font-size: 15px;
                    color: #b2bac2;
                    font-weight: bold;
                    &:hover {
                      background-color: #f5f5f5;
                    }
                    img {
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
    .right {
      flex: 1;
      padding-left: 10px;
      .right-app {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        margin-bottom: 20px;
        background-color: white;
        .appCode {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .word {
          color: black;
          font-size: 15px;
          font-weight: bold;
          i {
            font-size: inherit;
          }
          div {
            width: 150px;
            margin-top: 4px;
            font-weight: 300;
            color: #999;
            font-size: 13px;
          }
        }
      }
      .user {
        width: 100%;
        box-sizing: border-box;
        background-color: white;
        // border: 1px solid #d7d7d7;
        padding: 10px;
        margin-bottom: 20px;
        .message {
          width: 100%;
          .avator {
            padding: 20px;
            text-align: center;
            a {
              font-size: 16px;
              color: black;
              line-height: 20px;
              display: flex;
              // justify-content: space-around;
              &:hover {
                color: #409eff;
              }
              .userName {
                padding-left: 20px;
                text-align: left;
                .good {
                  margin: 8px 0;
                  span {
                    display: inline-block;
                    padding: 0 2px;
                    font-size: 12px;
                    color: white;
                    min-width: 36px;
                    text-align: center;
                    background-color: #409eff;
                    border-radius: 8px;
                    img {
                      width: 10px;
                      height: 10px;
                    }
                  }
                }
                .time {
                  font-size: 14px;
                  color: #959595;
                }
              }
            }
          }
          .news {
            border-top: 1px solid #d7d7d7;
            padding: 15px 15px 10px 15px;
            ul {
              li {
                a {
                  text-decoration: none;
                  color: #959595;
                  font-size: 14px;
                  line-height: 36px;
                  &:hover {
                    color: #409eff;
                    span {
                      color: #409eff;
                    }
                  }
                  span {
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
      .right-recommend {
        width: 100%;
        background: white;
        margin-bottom: 20px;
        h3 {
          display: flex;
          align-items: center;
          font-size: 16px;
          padding: 12px 15px;
          font-weight: 500;
          border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
          vertical-align: middle;
          img {
            height: 20px;
            margin-right: 10px;
          }
        }
        .recommend {
          display: block;
          font-size: 14px;
          padding: 12px 15px;
          color: black;
          .iconTitle {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .iconPhoto {
              margin-right: 10px;
              display: flex;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
              }
            }
          }
          .icon {
            span {
              display: inline-block;
              color: #bfbfbf;
              margin-right: 20px;
              img {
                width: 16px;
                height: 16px;
                margin-right: 5px;
              }
              .comment {
                box-sizing: border-box;
                position: relative;
                top: 2px;
              }
            }
          }
          &:hover {
            background: #f5f5f5;
          }
        }
      }
    }
  }
  .scroll-more {
    text-align: center;
    img {
      margin-top: 20px;
      height: 100px;
    }
    p {
      margin: 10px 0 10px 0;
      font-size: 14px;
      color: #5e6d82;
    }
  }
}
</style>