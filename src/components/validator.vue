<template>
    <div class="wrap" v-if="validatorVisible">
        <div class="title">请将以下必填项填写完整</div>
        <ul>
            <li v-for="item,key,index in errors">
                <span>{{mapping(key,billType)}}</span>
                <span>{{item.required}}</span>
            </li>
        </ul>
        <div class="btn-wrap">
            <div class="btn" @click="sure">确定</div>
        </div>
    </div>
</template>

<script>
  // applicant
  // payee
  // applyDate
  // budget
  // accountView
  // company
  // applyDept
  // costCenter
  // accountNum
  // bankName
  // remark
  //
  // applicant
  // payee
  // applyDate
  // company
  // applyDept
  // bankName
  // accountNum
  // remark

  export default {
    name: "validator",
    props: {
      source: {
        type: Object
      },
      validatorVisible: {
        type: Boolean
      },
      billType: {
        type: String
      }
    },
    data() {
      return {
        rules1: [
          { key: 'applicant', required: true, owner: 'TravelAccount', entry: false },
          { key: 'payee', required: true, owner: 'TravelAccount', entry: false },
          { key: 'applyDate', required: true, owner: 'TravelAccount', entry: false },
          { key: 'budget', required: true, owner: 'TravelAccount', entry: false },
          { key: 'accountView', required: true, owner: 'TravelAccount', entry: false },
          { key: 'company', required: true, owner: 'TravelAccount', entry: false },
          { key: 'applyDept', required: true, owner: 'TravelAccount', entry: false },
          { key: 'costCenter', required: true, owner: 'TravelAccount', entry: false },
          { key: 'accountNum', required: true, owner: 'TravelAccount', entry: false },
          { key: 'bankName', required: true, owner: 'TravelAccount', entry: false },
          { key: 'remark', required: true, owner: 'TravelAccount', entry: false },
          { key: 'entrys', required: true, owner: 'TravelAccount', entry: false },
          // { key: 'invoices', required: true, owner: 'TravelAccount', entry: true },
        ],
        rules2: [
          { key: 'applicant', required: true, owner: 'PersonExpense', entry: false },
          { key: 'payee', required: true, owner: 'PersonExpense', entry: false },
          { key: 'applyDate', required: true, owner: 'PersonExpense', entry: false },
          { key: 'company', required: true, owner: 'PersonExpense', entry: false },
          { key: 'applyDept', required: true, owner: 'PersonExpense', entry: false },
          { key: 'bankName', required: true, owner: 'PersonExpense', entry: false },
          { key: 'accountNum', required: true, owner: 'PersonExpense', entry: false },
          { key: 'remark', required: true, owner: 'PersonExpense', entry: false },
          // { key: 'invoices', required: true, owner: 'PersonExpense', entry: false },
          { key: 'entrys', required: true, owner: 'PersonExpense', entry: false },
          { key: 'budgetItem', required: true, owner: 'PersonExpense', entry: true },
          { key: 'accountView', required: true, owner: 'PersonExpense', entry: true },
          { key: 'amount', required: true, owner: 'PersonExpense', entry: true },
        ],
        rules3: [
          { key: 'applicant', required: true, owner: 'TravelApply', entry: false },
          { key: 'applyDate', required: true, owner: 'TravelApply', entry: false },
          { key: 'applyDept', required: true, owner: 'TravelApply', entry: false },
          { key: 'company', required: true, owner: 'TravelApply', entry: false },
          { key: 'remark', required: true, owner: 'TravelApply', entry: false },
          { key: 'startTime', required: true, owner: 'TravelApply', entry: true },
          { key: 'startPlace', required: true, owner: 'TravelApply', entry: true },
          { key: 'endPlace', required: true, owner: 'TravelApply', entry: true },
          { key: 'endTime', required: true, owner: 'TravelApply', entry: true },
        ],
        entrys: [],
        errors: {},
        chinese: [
          { key: 'applicant', explain: '申请人' },
          { key: 'payee', explain: '领款人' },
          { key: 'applyDate', explain: '申请日期' },
          { key: 'budget', explain: '预算项目' },
          { key: 'accountView', explain: '费用名称' },
          { key: 'company', explain: '付款单位' },
          { key: 'applyDept', explain: '申请部门' },
          { key: 'costCenter', explain: '费用承担部门' },
          { key: 'bankName', explain: '收款银行' },
          { key: 'accountNum', explain: '收款账号' },
          { key: 'budgetItem', explain: '预算项目' },
          { key: 'accountView', explain: '费用名称' },
          { key: 'remark', explain: '出差理由', owner: 'TravelApply' },
          { key: 'remark', explain: '费用说明', owner: 'PersonExpense' },
          { key: 'remark', explain: '费用说明', owner: 'TravelAccount' },
          { key: 'endPlace', explain: '到达地点' },
          { key: 'endTime', explain: '离开时间' },
          { key: 'startPlace', explain: '出发地点' },
          { key: 'startTime', explain: '出发时间' },
          { key: 'invoices', explain: '发票' },
          { key: 'entrys', explain: '行程单' , owner: 'TravelAccount' },
          { key: 'entrys', explain: '分录', owner: 'PersonExpense' },
          { key: 'amountHotel', explain: '住宿费' },
          { key: 'amountOther', explain: '其他费用' },
          { key: 'amountRec', explain: '招待费' },
          { key: 'amountTaxi', explain: '市内交通费' },
          { key: 'days', explain: '出差天数' },
          { key: 'amount', explain: '含税金额' },
        ]
      }
    },
    methods: {
      sure() {
        this.$emit('update:validatorVisible', false)
        this.errors = {}
      },
      mapping(key, billType) {

        for (let i = 0; i < this.chinese.length; i++) {
          if (key === this.chinese[i]['key']) {
            if (key === 'remark' || key === 'entrys') {
              if (billType === this.chinese[i]['owner']) {
                return this.chinese[i]['explain']
              }
            } else {
              return this.chinese[i]['explain']
            }
          }
        }
      }
    },
    watch: {
      source: {
        handler() {
          if (this.billType === 'TravelAccount') {
            this.rules1.forEach((rule) => {
              let value = this.source[rule.key]
              console.log('rule.key', rule.key)
              if (rule.required) {
                if (value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
                  this.errors[rule.key] = { required: '为必填项' }
                }
              }

              if (rule.key === 'invoices') {
                let flag = true
                let amountHotelflag = true
                let amountOtherflag = true
                let amountRecflag = true
                let amountTaxiflag = true
                let daysflag = true
                this.source['entrys'].forEach((entry) => {
                  if(entry.invoices.length<=0){
                    flag = false
                  }
                  if(!entry.days){
                    daysflag = false
                  }
                  let obj = {
                    amountHotel: 0,
                    amountOther: 0,
                    amountRec: 0,
                    amountTaxi: 0,
                  }
                  entry.invoices.forEach((item)=>{
                    if(item.invType === '住宿费') {
                      obj.amountHotel += item.invAmount
                    }else if(item.invType === '其他费用'){
                      obj.amountOther += item.invAmount
                    }else if(item.invType === '招待费'){
                      obj.amountRec += item.invAmount
                    }else if(item.invType === '市内交通费'){
                      obj.amountTaxi += item.invAmount
                    }
                  })
                  if(entry.amountHotel>obj.amountHotel && obj.amountHotel !== 0){
                    amountHotelflag = false
                  }
                  if(entry.amountOther>obj.amountOther && obj.amountOther !== 0){
                    amountOtherflag = false
                  }
                  if(entry.amountRec>obj.amountRec && obj.amountRec !== 0){
                    amountRecflag = false
                  }
                  if(entry.amountTaxi>obj.amountTaxi && obj.amountTaxi !== 0){
                    amountTaxiflag = false
                  }

                })
                if(!flag){
                  this.errors['invoices'] = { required: '为必填项' }
                }else{
                  delete this.errors.invoices
                }
                if(!amountHotelflag){
                  this.errors['amountHotel'] = { required: '不得大于对应发票总金额' }
                }else{
                  delete this.errors.amountTaxi
                }
                if(!amountOtherflag){
                  this.errors['amountOther'] = { required: '不得大于对应发票总金额' }

                }else{
                  delete this.errors.amountOther
                }
                if(!amountRecflag){
                  this.errors['amountRec'] = { required: '大于对应发票总金额' }
                }else{
                  delete this.errors.amountRec
                }
                if(!amountTaxiflag){
                  this.errors['amountTaxi'] = { required: '不得大于对应发票总金额' }

                }else{
                  delete this.errors.amountTaxi
                }
                if(!daysflag){
                  this.errors['days'] = { required: '必填且不能为0' }

                }else{
                  delete this.errors.days
                }

              }
            })

          }
          else if (this.billType === 'PersonExpense') {
            this.rules2.forEach((rule) => {
              if (rule.entry === false) {
                let value = this.source[rule.key]

                if (rule.required) {
                  if (value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
                    this.errors[rule.key] = { required: '为必填项' }
                  }
                }
              }

            })
            this.rules2.forEach((rule) => {
              if (rule.entry === true) {
                this.source['entrys'].forEach((entry) => {
                  Object.keys(entry).forEach((key) => {
                    if (key === rule.key) {
                      let value = entry[rule.key]
                      if (rule.required) {
                        if (value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}') {
                          console.log(JSON.stringify(this.errors))
                          this.errors[rule.key] = { required: '为必填项' }
                        }
                      }
                    }

                  })
                })
              }
            })

          }
          else if (this.billType === 'TravelApply') {
            this.rules3.forEach((rule) => {
              if (rule.entry === false) {
                let value = this.source[rule.key]
                console.log('rule.key', rule.key)

                if (rule.required) {
                  console.log('value', value)
                  // if (!value && value !== 0) {
                  //   this.errors[rule.key] = { required: '为必填项' }
                  // }
                  if (value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}') {
                    this.errors[rule.key] = { required: '为必填项' }
                  }
                }
              }

            })
            this.rules3.forEach((rule) => {
              if (rule.entry === true) {
                this.source['entrys'].forEach((entry) => {
                  Object.keys(entry).forEach((key) => {
                    if (key === rule.key) {
                      let value = entry[rule.key]
                      if (rule.required) {
                        if (value === '' || value === undefined || value === 'undefined' || JSON.stringify(value) === '{}') {
                          console.log(JSON.stringify(this.errors))
                          this.errors[rule.key] = { required: '为必填项' }
                        }
                      }
                    }

                  })
                })
              }
            })

          }

          console.log(JSON.stringify(this.errors))
          this.$emit('update:validatorVisible', JSON.stringify(this.errors) !== '{}')
        },
        immediate: true,
        deep: true,
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.8);
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.4rem;
            padding: 0.16rem 0;
            font-size: 0.16rem;
            background: #3b80ec;
            color: #ffffff;
        }
        ul {
            width: 2.4rem;
            background: #fff;
            li {
                padding: 0.1rem 0.2rem;
                font-size: 0.14rem;
            }
        }
        .btn-wrap {
            padding: 0.1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.4rem;
            background: #fff;
        }
        .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #3b80ec;
            border-radius: 0.14rem;
            width: 0.75rem;
            height: 0.28rem;
            font-size: 0.14rem;
            color: #ffffff;
        }
    }
</style>