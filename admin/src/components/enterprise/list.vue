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
        <div class="mb10"><i-button @click.native="toAddDetail">新增企业</i-button></div>
        <Table border :columns="columns" :data="resp"></Table>
        <div class="pagination">
            <Page :current="2" :total="500" simple></Page>
        </div>
    </div>
</template>

<script>
    export default {
        name :'enterpriseList',
        data () {
            return {
                columns: [
                    {
                        title: '企业名称',
                        key: 'name'
                    },
                    {
                        title: '生产许可证',
                        key: 'production_license'
                    },
                    {
                        title: '生产许可证有效期至',
                        key: 'term_of_validity'
                    },
                    {
                        title: '生产许可证发证日期',
                        key: 'date_of_issue'
                    },
                    {
                        title: '营业执照',
                        key: 'business_license'
                    },
                    {
                        title: '生产地址',
                        key: 'address'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
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
                       time:'创建时间'
                    },
                    {
                       name:'企业名称',
                       production_license:'生产许可证',
                       term_of_validity:'生产许可证有效期至',
                       date_of_issue:'生产许可证发证日期',
                       business_license:'营业执照',
                       address:'生产地址',
                       time:'创建时间'
                    }
                ]
            }
        },
        methods:{
          toAddDetail(){
            this.$router.push({path:'/admin/enterprise/detail'})
          }
        }
    }
</script>