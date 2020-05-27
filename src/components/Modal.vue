<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <!-- 遮罩层 -->
            <div class="mask"></div>
            <!-- 弹框 -->
            <div class="modal-box">
                <slot name="body"></slot>
            </div>
            <div class="progress-box">
                <slot name="progress"></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            // 弹框是否显示
            showModal: Boolean
        }
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>