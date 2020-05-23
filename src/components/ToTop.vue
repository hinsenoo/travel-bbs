<template>
    <div class="toTop">
        <div class="goTop"></div>
    </div>
</template>

<script>
    export default {
        name: 'toTop',
        gotop: true
    }
</script>

<style lang="scss" scoped>
    .toTop .goTop {
        text-align: center;
        position: fixed;
        right: 50px;
        bottom: 30px;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        background: white;
        color: #000000;
    }
</style>