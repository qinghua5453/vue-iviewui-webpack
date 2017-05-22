<!-- detail.vue -->
<style scoped>
.form {
    width: 50%;
}
.searchIcon{
    position: absolute;
    right: 8px;
    top: 6px;
    width: 20px;
    display: inline-block;
}
</style>
<template>
  <div class="relative">
       <div class="form">
            <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="品种名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="品种名称"></Input>
                </Form-item>
                <Form-item label="产品类别" prop="category">
                    <i-select v-model="formValidate.category" placeholder="产品类别">
                        <i-option value="0">国药1</i-option>
                        <i-option value="1">国药2</i-option>
                        <i-option value="2">国药3</i-option>
                    </i-select>
                </Form-item>
                <!-- 剂型 -->
                <Form-item label="剂型">
                   <Row>
                        <i-col span="11">
                            <Form-item prop="dosage_1">
                                <Input v-model="formValidate.dosage_1" placeholder="剂型1(必填)"></Input>
                            </Form-item>
                        </i-col>
                        <i-col span="2" style="text-align: center">-</i-col>
                        <i-col span="11">
                            <Form-item prop="dosage_2">
                                <Input v-model="formValidate.dosage_2" placeholder="剂型2(非必填)"></Input>
                            </Form-item>
                        </i-col>
                   </Row>
                </Form-item>
                <Form-item label="规格" prop="specifications">
                    <Input v-model="formValidate.specifications" placeholder="规格"></Input>
                </Form-item>
                <Form-item label="批准文号" prop="approval_number">
                    <Input v-model="formValidate.approval_number" placeholder="批准文号"></Input>
                </Form-item>
                <Form-item label="批准日期" prop="approval_date">
                    <Form-item prop="date">
                            <Date-picker type="date" placeholder="选择日期" v-model="formValidate.approval_date"></Date-picker>
                    </Form-item>
                </Form-item>
                <Form-item label="药品本位码" prop="drug_code">
                    <Input v-model="formValidate.drug_code" placeholder="药品本位码"></Input>
                </Form-item>
                <Form-item class="relative" label="生产企业" prop="manufacturing_enterprise">
                    <Input v-model="formValidate.manufacturing_enterprise" placeholder="生产企业" readonly="readonly" @click.native="modal = true"></Input>
                    <span class="searchIcon"><Icon type="search" size="24" color="#dedede"></Icon></span>
                </Form-item>
                <!-- 生产地址 -->
                <Form-item label="生产地址" prop="pro_city_county_address" placeholder="请选择">
                    <Cascader :data="address" trigger="click" v-model="formValidate.pro_city_county_address"></Cascader>
                </Form-item>
                <Form-item label="" prop="street_address">
                    <Input v-model="formValidate.street_address" placeholder="街道地址"></Input>
                </Form-item>
                <Form-item>
                    <i-button type="primary" @click.native="handleSubmit('formValidate')">提交</i-button>
                    <i-button type="ghost" @click.native="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
                </Form-item>
            </i-form>
       </div>
       <!-- 关联生产企业 弹窗 -->
       <div>
          <Modal
                v-model="modal"
                title="关联企业"
                @on-ok="ok"
                @on-cancel="cancel">
                <div class="mb10">
                    <Row>
                        <i-col span="20"><Input v-model="searchVal" placeholder="请输入关联企业查询"></Input></i-col>
                        <i-col span="4"><Button class="r" type="primary" icon="ios-search">搜索</Button></i-col>
                    </Row>
                </div>
                <Table border :columns="columns" :data="tableResp"></Table>
          </Modal> 
       </div>
 </div>
</template>

<script>
    export default {
        data () {
            return {
                modal: false,
                searchVal:'',
                columns:[
                     {
                        title: '企业名称',
                        key: 'name'
                     },
                     {
                        title: '操作',
                        key: 'operation',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click.native="show(${index})">选择</i-button>`;
                        }
                     }
                ],
                tableResp:[
                    {
                        name:'黑龙江金九药业股份有限公司'
                    },
                    {
                        name:'黑龙江金九药业股份有限公司'
                    }
                ],
            	address: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
                formValidate: {
                   name:'',
                   category:'',
                   dosage_1:'', 
                   dosage_2:'',//第二个可以为空 input 只能是string or number
                   specifications:'',
                   approval_number:'',
                   approval_date:'',
                   drug_code:'', //可以为空
                   manufacturing_enterprise:'',
                   pro_city_county_address:[],
                   street_address:'' //可以为空
                },
                ruleValidate: {
                	name:[
                       {required:true,message:'品种名称不能为空',trigger: 'blur'}
                	],
                	category:[
                	   {required:true,message:'产品类别不能为空',trigger: 'change'}
                	],
                	dosage_1:[
                	   {required:true,message:'剂型1不能为空',trigger: 'blur'}
                	],
                	specifications:[
                	   {required:true,message:'规格不能为空',trigger: 'blur'}
                	],
                	approval_number:[
                	   {required:true,message:'批准文号不能为空',trigger: 'blur'}
                	],
                	approval_date:[
                	   {required:true,type:'date',message:'批准日期不能为空',trigger: 'change'}
                	],
                	manufacturing_enterprise:[
                	   {required:true,message:'生产企业不能为空',trigger: 'blur'}
                	],
                    pro_city_county_address:[
                	   {required:true,type:'array',min:1,message:'生产地址至少选择省市县',trigger: 'change'}
                	]
                }
            }
        },
        methods: {
            show(index){
               alert(index)
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    // valid is Boolean
                	// console.log('valid',valid)
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>