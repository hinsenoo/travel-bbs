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
    saveFocusStatusList(context,focusStatusList){
        // 一个与 store 实例具有相同方法和属性的 context
        // 传递给 mutations
        context.commit('saveFocusStatusList',focusStatusList);
    }
}