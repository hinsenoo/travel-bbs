<template>
  <div id="app">
    <!-- 所有的路由视图 -->
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  created(){
    let userId = Number(this.$cookie.get('userId'));
    if(userId){
      this.axios.get(`/api/user/${ userId }`)
      .then((res)=>{
        this.$store.dispatch('saveUserMessage', res.data);
        this.$store.dispatch('saveLoginStatus', true);
      })
    }
  },
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';
</style>

