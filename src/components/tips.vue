<template>
    <div class="wrap" v-if="tipVisible">
        <div class="icon">
            <img src="../assets/cuowu.png" alt="" v-if="!success">
            <img src="../assets/chenggong.png" alt="" v-if="success">
        </div>
        <div class="desc">{{desc}}&nbsp;&nbsp;{{count}}秒后跳转</div>
        <div class="guide" v-if="!success">上传失败请重新上传</div>
        <div class="guide" v-if="!success">{{tipFailedDesc}}</div>
    </div>
</template>

<script>
  export default {
    name: "tips",
    props: {
      tipVisible: {
        type: Boolean
      },
      success: {
        type: Boolean
      },
      desc: {
        type: String
      },
      tipFailedDesc:{
        type:String
      },
      billType: {
        type: String
      },
      billStatus: {
        type: String
      }
    },
    data() {
      return {
        count: 3,
        userId:'',
        companyId:''
      }
    },
    watch: {
      tipVisible() {
        if (this.tipVisible) {

          let timer = setInterval(() => {
            this.count--
            if (this.count === 0) {
              clearInterval(timer)
              this.count = 3
              this.$emit('update:tipVisible', false)
              if (this.billStatus === 'SUBMIT' && this.success === true) {
                if (this.billType === 'TravelApply') {
                  this.$router.push({
                    name: 'travelApplyList',
                    params: {
                      userId: this.userId,
                      companyId: this.companyId,
                      name: this.billType,
                      billStatus: this.billStatus
                    }
                  })
                }else if(this.billType === 'PersonExpense'){
                  this.$router.push({
                    name: 'list',
                    params: {
                      userId: this.userId,
                      companyId: this.companyId,
                      name: this.billType,
                      billStatus: this.billStatus
                    }
                  })
                }else if(this.billType === 'TravelAccount'){
                  this.$router.push({
                    name: 'travelAccountList',
                    params: {
                      userId: this.userId,
                      companyId: this.companyId,
                      name: this.billType,
                      billStatus: this.billStatus
                    }
                  })
                }
              }
            }
          }, 1000)
        }
      }
    },
    created() {
      this.userId = localStorage.getItem('userId')
      this.companyId = localStorage.getItem('companyId')
    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .icon {
            padding-top: 0.5rem;
            margin: 0 auto;
            width: 0.6rem;
            height: 0.6rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .desc {
            padding-top: 0.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.20rem;
            color: #333333;
        }
        .guide {
            padding-right: 0.2rem;
            padding-left: 0.2rem;
            padding-top: 0.06rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.12rem;
            line-height: 1.5;
            color: #939393;
        }
    }
</style>