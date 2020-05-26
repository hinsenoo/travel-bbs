/**
 * 用户信息
 */
// 读取
export default {
    saveUserMessage(state,userMessage){
        // 改变状态，state 中的数据
        state.userMessage = userMessage;
    },
    saveLoginStatus(state,loginStatus){
        // 改变状态，state 中的数据
        state.loginStatus = loginStatus;
    },
}