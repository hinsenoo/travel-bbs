/**
 * 用户信息
 */
// 传输
export default {
    // 用户信息
    saveUserMessage(context,userMessage){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveUserMessage',userMessage);
    },
    // 登录状态
    saveLoginStatus(context,loginStatus){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveLoginStatus',loginStatus);
    },
    // 关注状态
    saveFollowingIdList(context,followingIdList){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveFollowingIdList',followingIdList);
    },
    // 点赞状态
    saveLikeArticleIdList(context,likeArticleIdList){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveLikeArticleIdList',likeArticleIdList);
    },
    // 更新收藏状态
    saveCollectIdList(context,collectIdList){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveCollectIdList',collectIdList);
    },
    // 登录模态框
    saveLoginModal(context,loginModal){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveLoginModal',loginModal);
    },
}