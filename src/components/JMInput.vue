<template>
    <div class="select-wrap">
        <div class="select-block">
            <span :class="type=='1'?'active':''">{{inputValue===0||inputValue?inputValue:tips}}</span>
            <!--<span :style="styles">{{inputValue===0||inputValue?inputValue:tips}}</span>-->
            <!--<span :style="styles">{{tips}}</span>-->
            <input :type="defaultType"
                   @input="changeValue"
                   :class="{'hidden':defaultType==='date','active':type=='1'}"
                   :placeholder="tips" :value="inputValue">
            <i class="triangle-down" v-if="defaultType === 'date'"></i>
        </div>
    </div>
</template>

<script>
  export default {
    name: "JMInput",
    props: {
      defaultValue: {
        default: ''
      },
      defaultType: {
        type: String,
        default: 'text'
      },
      tips: {
        type: String
      },
      styles: {
        type: String
      },
      type: {}
    },
    data() {
      return {
        date: '',
        inputValue: '',
        visible: true
      }
    },
    methods: {
      changeValue($event) {
        this.inputValue = $event.target.value
        this.$emit('update:inputValue', this.inputValue)
      }
    },
    watch: {
      // defaultValue(){
      //   console.log('watch',this.defaultValue)
      //   this.inputValue = this.defaultValue
      // },
      defaultValue: {
        handler(newValue, oldValue) {
          this.inputValue = newValue
          console.log('this.styles', this.styles)
          console.log('this.inputValue', this.inputValue)
        },
        immediate: true
      }
    }
  }
</script>

<style scoped lang="scss">
    .select-wrap {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .select-block {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            input {
                padding: 0.06rem 0;
                width: calc(100% - 0.12rem);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                height: 0.2rem;
                z-index: 11;
                border: 0;
                &.hidden {
                    opacity: 0;
                }
                &.skin {

                }
                &.active {
                    /*margin-top: 0.06rem;*/
                    width: 100% !important;
                    line-height: 1.46;
                    font-size: 0.2rem;
                    color: #333333;
                    background: #f2f6f9;
                    text-align: center;
                }
            }
            span {
                /*font-size: 0.12rem;*/
                /*color: #c4c4c4;*/
                /*overflow: hidden;*/
                &.active {
                    display: inline-flex;
                    height: 0.32rem;
                    font-size: 0.12rem;
                    color: #c4c4c4;
                    opacity: 0;
                }
            }
            .triangle-down {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0.12rem;
                display: inline-block;
                width: 0.12rem;
                height: 0.07rem;
                background: url("../assets/triangle-down.png") no-repeat;
                background-size: contain;
            }
        }

    }
</style>