<template>
    <div class="home">
        <el-backtop>
            <div
            style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
                border-radius: 40px;
            }"
            >
            <i class="el-icon-caret-top"></i>
            </div>
        </el-backtop>
        <!-- 复用头部 尾部 -->
        <nav-header @modalShow="modalShow" @index="index" :activeIndex="activeIndex"></nav-header>
        <router-view @closeModal="closeModal" :changeModal="changeModal" @index="index"></router-view>
        <!-- 回到顶部 -->
    </div>
</template>
<script>
    import NavHeader from '../components/NavHeader';
    export default {
        // 组件名称
        name: 'home',
        // 加载多个组件
        components: {
            NavHeader,
        },
        data() {
            return {
                changeModal: {
                    showModal: false,
                    modalType: ''
                },
                activeIndex: '0',
            }
        },
        methods: {
            modalShow(type){
                this.changeModal.modalType = type;
                this.changeModal.showModal = true;
            },
            closeModal(){
                this.changeModal.modalType = '';
                this.changeModal.showModal = false;
            },
            // 设置导航栏活动索引
            index(type){
                this.activeIndex = type + '';
            }
        }
    }
</script>
<style lang="scss">
    .home{
        overflow-y: scroll;
    }
</style>