<template>
    <div>
        <!-- 复用头部 尾部 -->
        <nav-header @modalShow="modalShow"></nav-header>
        <router-view @closeModal="closeModal" :changeModal="changeModal" ></router-view>

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
        },
        data() {
            return {
                changeModal: {
                    showModal: false,
                    modalType: ''
                }
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
            }
        }
    }
</script>