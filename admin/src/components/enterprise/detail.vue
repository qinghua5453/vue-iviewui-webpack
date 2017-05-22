<!-- detail.vue -->
<style scoped>
.form {
    width: 50%;
}
</style>
<template>
  <div class="relative">
       <div class="form">
            <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                <Form-item label="企业名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="企业名称"></Input>
                </Form-item>
                <Form-item label="法人代表" prop="representative">
                    <Input v-model="formValidate.representative" placeholder="法人代表"></Input>
                </Form-item>
                <Form-item label="企业负责人" prop="business_manager">
                    <Input v-model="formValidate.business_manager" placeholder="企业负责人"></Input>
                </Form-item>
                <Form-item label="社会信用代码" prop="social_code">
                    <Input v-model="formValidate.social_code" placeholder="社会信用代码"></Input>
                </Form-item>
                <Form-item label="生产许可证" prop="production_license">
                    <Input v-model="formValidate.production_license" placeholder="生产许可证"></Input>
                </Form-item>
                <Form-item label="发证机关" prop="issuing_authority">
                    <Input v-model="formValidate.issuing_authority" placeholder="发证机关"></Input>
                </Form-item>
                <Form-item label="签发人" prop="issuer">
                    <Input v-model="formValidate.issuer" placeholder="签发人"></Input>
                </Form-item>
                <Form-item label="日常监督人员" prop="daily_supervisor">
                    <Input v-model="formValidate.daily_supervisor" placeholder="日常监督人员"></Input>
                </Form-item>
                <Form-item label="生产许可证有效期至" prop="until_date">
                    <Form-item prop="date">
                            <Date-picker type="date" placeholder="生产许可证有效期至" v-model="formValidate.until_date"></Date-picker>
                    </Form-item>
                </Form-item>
                <Form-item label="生产许可证发证日期" prop="issuing_date">
                    <Form-item prop="date">
                            <Date-picker type="date" placeholder="生产许可证发证日期" v-model="formValidate.issuing_date"></Date-picker>
                    </Form-item>
                </Form-item>
                <Form-item label="生产地址" prop="production_address">
                    <Cascader placeholder="生产地址(省-市-县)" :data="address" trigger="click" v-model="formValidate.production_address"></Cascader>
                </Form-item>

                <Form-item  prop="pro_address_street">
                    <Input v-model="formValidate.pro_address_street" placeholder="生产地址(街道地址)"></Input>
                </Form-item>

                <Form-item label="注册地址" prop="registered_address">
                    <Cascader placeholder="注册地址(省-市-县)" :data="address" trigger="click" v-model="formValidate.registered_address"></Cascader>
                </Form-item>

                <Form-item prop="reg_address_street">
                    <Input v-model="formValidate.reg_address_street" placeholder="注册地址(街道地址)"></Input>
                </Form-item>

                <Form-item label="生产范围" prop="production_range">
                    <Input v-model="formValidate.production_range" placeholder="生产范围"></Input>
                </Form-item>
                <Form-item>
                    <i-button type="primary" @click.native="handleSubmit('formValidate')">提交</i-button>
                    <i-button type="ghost" @click.native="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
                </Form-item>
            </i-form>
       </div>
 </div>
</template>

<script>
    export default {
        data () {
            return {
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
                   representative:'',
                   business_manager:'',
                   social_code:'',
                   production_license:'',
                   issuing_authority:'',
                   until_date:'',
                   issuing_date:'',
                   production_address:[],
                   pro_address_street:'',
                   registered_address:[],
                   reg_address_street:'',
                   production_range:''
                },
                ruleValidate: {
                    name:[
                       {required:true,message:'企业名称不能为空',trigger: 'blur'}
                    ],
                    representative:[
                       {required:true,message:'法人代表不能为空',trigger: 'blur'}
                    ],
                    business_manager:[
                       {required:true,message:'企业负责人不能为空',trigger: 'blur'}
                    ],
                    social_code:[
                       {required:true,message:'社会信用代码不能为空',trigger: 'blur'}
                    ],
                    production_license:[
                       {required:true,message:'生产许可证号不能为空',trigger: 'blur'}
                    ],
                    issuing_authority:[
                       {required:true,message:'发证机关不能为空',trigger: 'blur'}
                    ],
                    until_date:[
                       {required:true,type:'date',message:'生产许可有效期不能为空',trigger: 'change'}
                    ],
                    issuing_date:[
                       {required:true,type:'date',message:'生产许可发证日期不能为空',trigger: 'change'}
                    ],
                    production_address:[
                       {required:true,type:'array',min:1,message:'生产地址至少选择省市',trigger: 'blur'}
                    ],
                    registered_address:[
                       {required:true,type:'array',min:1,message:'注册地址至少选择省市',trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
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