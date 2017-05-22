<!-- list.vue -->
<style scoped>
  .pagination{
     float: right;
     margin-right: 30px;
     margin-top: 10px;
  }
</style>
<template>
    <div>
        <div class="mb10"><i-button @click.native="addCultivar">新增品种</i-button></div>
        <Table border :columns="columns" :data="resp"></Table>
        <div class="pagination">
            <Page :current="2" :total="500" simple></Page>
        </div>
    </div>
</template>

<script>
    export default {
        name :'cultivarList',
        data () {
            return {
                columns: [
                    {
                        title: '品种名称',
                        key: 'name'
                    },
                    {
                        title: '所属类别',
                        key: 'category'
                    },
                    {
                        title: '规格',
                        key: 'specifications'
                    },
                    {
                        title: '剂型',
                        key: 'dosage'
                    },
                    {
                        title: '批准文号',
                        key: 'approval_number'
                    },
                    {
                        title: '生产厂家',
                        key: 'manufacturer'
                    },
                    {
                        title: '产地',
                        key: 'place'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
                    }
                ],
                resp: [
                    {
                        name:'品种名称',
                        category:'所属类别',
                        specifications:'规格',
                        dosage:'剂型',
                        approval_number:'批准文号',
                        manufacturer:'生产厂家',
                        place:'产地',
                        time:'创建时间'
                    },
                    {
                        name:'品种名称',
                        category:'所属类别',
                        specifications:'规格',
                        dosage:'剂型',
                        approval_number:'批准文号',
                        manufacturer:'生产厂家',
                        place:'产地',
                        time:'创建时间'
                    }
                ]
            }
        },
        methods:{
            addCultivar(){
                this.$router.push({path:'/admin/cultivar/detail'})
            }
        }
    }
</script>