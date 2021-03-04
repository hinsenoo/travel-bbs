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
    },
    // 用户 -> 更新指定用户信息
    updateUserInfo: {
        url: 'users',
        method: 'patch'
    },
    // 用户 -> 获取指定用户文章
    // updateUserInfo: {
    //     url: 'article',
    //     method: 'get'
    // },

    // 文章 -> 创建文章
    createArticle: {
        url: 'article',
        method: 'post'
    },
    // 文章 -> 更新指定文章
    updateArticleInfo: {
        url: 'article',
        method: 'get'
    },
    // 文章 -> 查询指定文章
    getArticleInfo: {
        url: 'article',
        method: 'get'
    },
    // 文章 -> 查询指定文章
    getArticleList: {
        url: 'article',
        method: 'get'
    },

    uploadImg: {
        url: 'upload',
        method: 'post'
    },
}
const ApiSetting = {
    ...apiList
}

export default ApiSetting