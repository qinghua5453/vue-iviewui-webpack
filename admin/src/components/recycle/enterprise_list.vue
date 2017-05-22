<!-- enterprise_list.vue -->
<!-- cultivar_list.vue -->
<style scoped>
  .pagination{
     float: right;
     margin-right: 30px;
     margin-top: 10px;
  }
</style>
<template>
    <div>
        <Table border :columns="columns" :data="resp"></Table>
        <div class="pagination">
            <Page :current="2" :total="500" simple></Page>
        </div>
    </div>
</template>

<script>
    export default {
        name :'recycleEnterpriseList',
        data () {
            return {
                columns: [
                     {
                        title:'企业名称',
                        key: 'name'
                     },
                     {
                        title:'生产许可证',
                        key: 'production_license'
                     },
                     {
                        title:'生产许可证有效期至',
                        key: 'term_of_validity'
                     },
                     {
                        title:'生产许可证发证日期',
                        key: 'date_of_issue'
                     },
                     {
                        title:'营业执照',
                        key: 'business_license'
                     },
                     {
                        title:'生产地址',
                        key: 'address'
                     },
                     {
                        title:'删除时间',
                        key: 'delete_time'
                     },
                     {
                        title:'操作',
                        key: 'operation'
                     }
                ],
                resp: [
                     {
                       name:'企业名称',
                       production_license:'生产许可证',
                       term_of_validity:'生产许可证有效期至',
                       date_of_issue:'生产许可证发证日期',
                       business_license:'营业执照',
                       address:'生产地址',
                       delete_time:'删除时间',
                       operation:'操作'
                     },
                     {
                       name:'企业名称',
                       production_license:'生产许可证',
                       term_of_validity:'生产许可证有效期至',
                       date_of_issue:'生产许可证发证日期',
                       business_license:'营业执照',
                       address:'生产地址',
                       delete_time:'删除时间',
                       operation:'操作'
                     }
                ]
            }
        }
    }
</script>