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
        <!--<span>{{inputValue||'请输入'}}</span>-->
        <div class="select-block">
            <!--<i class="triangle-down"></i>-->
            <!--<textarea name="" cols="60" rows="3" @input="changeValue($event)"></textarea>-->
            <textarea name="" @input="changeValue($event)" v-if="inputValue">{{inputValue}}</textarea>
            <textarea name="" @input="changeValue($event)" v-else placeholder="请输入"></textarea>
        </div>
    </div>
</template>

<script>
  export default {
    name: "JMTextarea",
    props: {
      defaultValue: {
        type: String,
        default: ''
      },
      remark: {
        type: String
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    mounted() {

    },
    watch: {
      defaultValue() {
        if (!this.remark) {
          this.inputValue = this.defaultValue
        }
      },
      remark() {
        this.inputValue = this.remark
      }

    },
    methods: {
      changeValue($event) {
        this.inputValue = $event.target.value
        this.$emit('update:inputValue', this.inputValue)
      }
    }
  }
</script>

<style scoped lang="scss">
    .select-wrap {
        /*padding-left: 0.12rem;*/
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
        span {
            font-size: 0.14rem;
            color: #b3b3b3;
            word-break: break-all
        }
        .select-block {
            margin-right: 0.12rem;
            /*position: relative;*/
            display: flex;
            width: 100%;
            textarea {
                /*height: 3em;*/
                width: 100%;
                /*position: absolute;*/
                /*top: 50%;*/
                /*transform: translateY(-50%);*/
                /*right: 0;*/
                /*opacity: 0;*/
                font-size: 0.12rem;

                height: calc(3em + 0.16rem);
                border: 1px solid #999;
                border-radius: 0.04rem;
                margin: 0 0.1rem;
                padding: 0.08rem;
                box-sizing: border-box;
                &:hover {
                    border-color: #666;
                }
                /*&:focus {*/
                    /*box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);*/
                    /*outline: none;*/
                /*}*/
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