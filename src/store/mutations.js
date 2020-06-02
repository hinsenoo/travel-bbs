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
    saveFocusStatusList(state,focusStatusList){
        // 可以创建一个新的对象，把原来对象的属性，和要添加的属性加到新的对象里
        let newObject = Object.assign({}, focusStatusList);
        // 改变状态，state 中的数据
        state.focusStatusList = newObject;
    },
    saveCollectList(state,collectList){
        // 改变状态，state 中的数据
        state.focusStatusList.collect = collectList;
    },

}