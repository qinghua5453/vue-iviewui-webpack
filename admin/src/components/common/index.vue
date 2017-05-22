<style scoped>

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 600px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    /*min-width: 100px;*/
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.ivu-col {
    transition: width .2s ease-in-out;
}

</style>

<template>

<div class="layout">
    <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
            <Menu active-name="1-2" theme="dark" width="auto" @on-select="routeTo">
                <div class="layout-logo-left">
                    <h3>后台管理</h3></div>
                <Menu-item name="cultivar_list">
                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                    <span class="layout-text">品种库</span>
                </Menu-item>
                <Menu-item name="enterprise_list">
                    <Icon type="document" :size="iconSize"></Icon>
                    <span class="layout-text">企业库</span>
                </Menu-item>
                <Menu-item name="table">
                    <Icon type="navicon" :size="iconSize"></Icon>
                    <span class="layout-text">GMP证书</span>
                </Menu-item>
                <Submenu name="recycle">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            回收站
                        </template>
                        <!-- name 根据menu 序号命名 -->
                        <Menu-item name="recycle_cult_list">品种数据</Menu-item>
                        <Menu-item name="recycle_enter_list">企业数据</Menu-item>
               </Submenu>
            </Menu>
        </i-col>
        <i-col :span="spanRight">
           <!--  <div class="layout-header">
                <i-button type="text" @click.native="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
            </div> -->
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <!-- 调用全局函数 todo-->
                    <Breadcrumb-item>首页</Breadcrumb-item>
                    <Breadcrumb-item>页面</Breadcrumb-item>
                    <Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <transition mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
            <div class="layout-copy">
                2016-2017 &copy; 杭州天猪科技有限公司 网站备案号
            </div>
        </i-col>
    </Row>
</div>

</template>

<script>

export default {

    data() {
            return {
                spanLeft: 4,
                spanRight: 20
            }
        },
        computed: {
            iconSize() {
                return 14
            }
        },
        methods: {
                routeTo(name) {
                    // console.log(name)
                    switch (name){
                        case 'cultivar_list':
                           this.$router.push({path:'/admin/cultivar/list'})
                        break;
                        case 'enterprise_list':
                           this.$router.push({path:'/admin/enterprise/list'})
                           break;
                        case 'recycle_cult_list':
                           this.$router.push({path:'/admin/recycle/cultivar/list'})
                           break;
                        case 'recycle_enter_list':
                           console.log('recycle_enter_list',name)
                           this.$router.push({path:'/admin/recycle/enterprise/list'})
                           break;
                    }
                }
        }
}

</script>
