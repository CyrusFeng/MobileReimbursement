<template>
    <!--<div class="select-wrap">-->
        <!--<span>{{selectedName||'请下拉选择费用承担部门'}}</span>-->
        <!--<div class="select-block">-->
            <!--<i class="triangle-down"></i>-->
            <!--<select v-model="orgId" @change="send">-->
                <!--<option value="">无</option>-->
                <!--<option :value="item.id" v-for="item in orgRange">-->
                    <!--{{item.name}}-->
                <!--</option>-->
            <!--</select>-->
        <!--</div>-->
    <!--</div>-->
    <div class="select-wrap">
        <span>{{showSelected||(orgRange.length>0?'请下拉选择':'暂无数据')}}</span>
        <div class="select-block">
            <i class="triangle-down" v-if="orgRange.length>0"></i>
            <select v-model="itemObj" @change="send">
                <!--<option value="">无</option>-->
                <option :value="item" v-for="item in orgRange">
                    <span>{{item.name}}</span>
                    <span v-if="item.accountView">{{item.accountView.number}}</span>
                    <span v-if="item.number">{{item.number}}</span>
                </option>
            </select>
        </div>
    </div>
</template>

<script>
  export default {
    name: "JMSelected",
    props: {
      orgRange: {
        type: Array,
      },
      defaultValue:{
        // type:Object,
        default:()=>{return {}}
      },
      defaultValueId:{
        type:String
      },
      defaultkey:{
        type:String
      },
      clear:{
        type:Boolean
      }
    },
    data() {
      return {
        orgId: '',
        selectedName: '',
        selectedNumber: '',
        showSelected:'',
        itemObj:{}
      }
    },
    mounted(){
      // console.log('defaultkey mounted',this.defaultkey)
      // console.log('defaultValueId mounted',this.defaultValueId)
      // console.log('defaultValue mounted',this.defaultValue)
      if(this.defaultValue.id){
        this.orgRange.forEach((item) => {
          if (this.defaultValue.id === item.id) {
            // this.itemObj = item
            this.itemObj = JSON.parse(JSON.stringify(item))
            this.$emit('update:itemObj',this.itemObj)
          }
        })
      }
    },
    watch: {
      // orgId() {
      //   this.orgRange.forEach((item) => {
      //     if (this.orgId === item.id) {
      //       this.selectedName = item.name
      //     }
      //   })
      // },
      // defaultValueId(){
      //   console.log('watch defaultValueId',this.defaultValueId)
      //   this.orgRange.forEach((item) => {
      //     console.log('this.defaultValueId',this.defaultValueId)
      //     console.log('item.id',item.id)
      //     if (this.defaultValueId === item.id) {
      //       console.log('item',item)
      //       this.itemObj = item
      //       this.$emit('update:itemObj',this.itemObj)
      //     }
      //   })
      // },
      orgRange:{
        //orgRange是异步获取的数据，所以在这里操作保证orgRange有值
        handler(newValue,oldValue){
          // console.log('watch',this.defaultkey,this.defaultValueId)
          // console.log('watch',JSON.stringify(this.orgRange))
          this.orgRange.forEach((item) => {
            // console.log('this.defaultValueId',this.defaultValueId)
            // console.log('item.id',item.id)
            // console.log('item.name',item.name)
            if (this.defaultValueId === item.id) {
              // console.log('watch',this.defaultkey,this.defaultValueId)
              // this.itemObj = item
              this.itemObj = {}
              this.itemObj = JSON.parse(JSON.stringify(item))
              // console.log('watch',this.defaultkey,this.itemObj)
              this.$emit('update:itemObj',this.itemObj)
            }
          })
        },
        immediate:true,
        deep:true,
      },
      defaultValueId:{
        handler(newValue,oldValue){
          // console.log('watch',this.defaultkey,this.defaultValueId)
          // console.log('watch',JSON.stringify(this.orgRange))
          this.orgRange.forEach((item) => {
            // console.log('this.defaultValueId',this.defaultValueId)
            // console.log('item.id',item.id)
            // console.log('item.name',item.name)
            if (this.defaultValueId === item.id) {
              // console.log('watch',this.defaultkey,this.defaultValueId)
              // this.itemObj = item
              this.itemObj = {}
              this.itemObj = JSON.parse(JSON.stringify(item))
              // console.log('watch',this.defaultkey,this.itemObj)
              this.$emit('update:itemObj',this.itemObj)
            }
          })
        },
        immediate:true,
        deep:true,
      },
      // itemObj(){
      //   this.orgRange.forEach((item) => {
      //     if (this.itemObj.id === item.id) {
      //       console.log('gggggggg!!!!!!!!!!!!!!')
      //       console.log('item',item)
      //       this.selectedName = item.name
      //       if(item.accountView){
      //         this.selectedNumber = item.accountView.number
      //         this.showSelected =  this.selectedName + this.selectedNumber
      //       }
      //       // else if(item.number){
      //       //   this.selectedNumber = item.number
      //       //   this.showSelected =  this.selectedName + this.selectedNumber
      //       // }
      //       else{
      //         this.showSelected =  this.selectedName
      //       }
      //     }
      //   })
      // },
      itemObj:{
        handler(newValue,oldValue){
          this.orgRange.forEach((item) => {
            if(this.itemObj){
              if (this.itemObj.id === item.id) {
                // console.log('gggggggg!!!!!!!!!!!!!!')
                // console.log('itemObj',item)
                this.selectedName = item.name

                if(item.accountView){
                  this.selectedNumber = item.accountView.number
                  this.showSelected =  this.selectedName + this.selectedNumber
                }
                // else if(item.number){
                //   this.selectedNumber = item.number
                //   this.showSelected =  this.selectedName + this.selectedNumber
                // }
                else{
                  this.showSelected =  this.selectedName
                }

                if(this.defaultkey === '差旅报销单费用名称'){
                  this.selectedNumber = item.number
                  this.showSelected =  this.selectedName + this.selectedNumber
                }
              }
            }
          })
        },
        deep:true,
        immediate:true
      },
      defaultkey:{
        handler(newValue,oldValue){
          if(this.defaultkey === '差旅报销单费用名称'){

          }
        },
      },
      clear(){
        if(this.clear){
          this.selectedName = ''
          this.selectedNumber=""
          this.showSelected=""
          this.itemObj = {}
          this.$emit('update:clear',false)
        }
      }
    },
    methods:{
      send(){
        console.log(this.defaultkey)
        this.$emit('update:itemObj',JSON.parse(JSON.stringify(this.itemObj)))
        this.$emit('change',JSON.parse(JSON.stringify(this.itemObj)))
      }
    }
  }
</script>

<style scoped lang="scss">
    .select-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .select-block {
            margin-right: 0.12rem;
            position: relative;
            select {
                height: 0.2rem;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                opacity: 0;
            }
            .triangle-down {
                display: inline-block;
                width: 0.12rem;
                height: 0.07rem;
                background: url("../assets/triangle-down.png") no-repeat;
                background-size: contain;
            }
        }
    }
</style>