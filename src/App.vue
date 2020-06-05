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
    let userId
    if(this.$cookie.get('userId')){

      userId = Number(this.$Base64.decode(this.$cookie.get('userId')));
    }
    if(userId){
      this.axios.get(`/api/user/${ userId }`)
      .then((res)=>{
        this.$store.dispatch('saveUserMessage', res.data);
        this.$store.dispatch('saveLoginStatus', true);
        let focusObj = {};
        res.data.focus.forEach((item)=>{
          focusObj[String(item.userId)] = true;
        })
        this.$store.dispatch('saveFocusStatusList', focusObj);
      })
    }
  },
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';
</style>

