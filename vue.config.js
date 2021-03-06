module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        // 反向代理
        proxy: {
            //拦截 /api 的访问
            // 例 https://localhost:8080/api/loading
            // 当访问到 /api 时会转发到 target
            '/api': {
                // 代理的目标地址
                // target: 'http://47.106.215.69:8080/tourism/',
                target: 'http://localhost:3002/',
                // mock 地址
                // target: 'http://mock-api.com/9n6qEdgV.mock/',
                // 是否要将主机头的源点更改为 url 地址
                changeOrigin: true,
                // 路径转发规则：把 /api 置为空
                pathRewrite: {
                    '/api': ''
                },
            }
        }
    },
    // 设置 false 加速生产环境构建，压缩 js 代码提高安全性。
    productionSourceMap: false,
    // 删除预加载
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}