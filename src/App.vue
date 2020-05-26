<template>
  <div id="app">
    <!-- 所有的路由视图 -->
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  mounted(){
    if(this.$cookie.get('userId')){
      // TODO：获取用户信息存储到 Vuex 中
    }
  },
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';
</style>

