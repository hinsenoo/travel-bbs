const apiList = {
    // 用户 -> 登录
    login: {
        url: 'users/login',
        method: 'post'
    },
    // 用户 -> 注册
    register: {
        url: 'users',
        method: 'post'
    },
    // 用户 -> 获取指定用户信息
    getUserInfo: {
        url: 'users',
        method: 'get'
    }
}
const ApiSetting = {
    ...apiList
}

export default ApiSetting