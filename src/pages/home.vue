<template>
    <div>
        <!-- 复用头部 尾部 -->
        <nav-header></nav-header>
        <router-view></router-view>

    </div>
</template>
<script>
    import NavHeader from '../components/NavHeader';
    export default {
        // 组件名称
        name: 'home',
        // 加载多个组件
        components: {
            NavHeader
        }
    }
</script>