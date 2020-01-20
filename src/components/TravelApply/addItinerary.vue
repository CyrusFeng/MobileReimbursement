<template>
    <div class="panel" v-show="childVisible">
        <div class="wrap">
            <div class="head-icon">
                <img src="../../assets/add-invoice.png" alt="">
            </div>
            <div class="head">
                <div class="left">请选择出差申请单</div>
                <div class="right">
                    <div class="icon-wrap" @click="doClose">
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="list-wrap" ref="wrapper">
                    <div class="list">
                        <div class="tips" v-if="billList.length<=0">暂无出差申请单</div>
                        <div class="item" v-else v-for="item in billList" :key="item.id" @click="doChoose(item)">
                            <div class="left" :class="{'active':item.selected}">
                                <i class="icon"></i>
                            </div>
                            <div class="right">
                                <div class="content">
                                    <div class="top">
                                        <div class="left">
                                            <span>{{item.tripList}}</span>
                                        </div>
                                        <div class="right">
                                            <span>{{item.number}}</span>
                                        </div>
                                    </div>
                                    <!--<div class="line">-->
                                        <!--<span>2015-15-15</span>-->
                                    <!--</div>-->
                                    <div class="line">
                                        <span>制单人:</span>
                                        <span v-if="item.applicant">{{item.applicant.name}}</span>
                                    </div>
                                    <div class="line">
                                        <span>同行人:</span>
                                        <span>{{item.togetherName || '无'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="removeBtn btn" v-if="billList.length>0" :class="{'active':true}" @click="send">选择</div>
            </div>
        </div>
    </div>

</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'

  export default {
    name: "addItinerary",
    data() {
      return {
        panelVisible: true,
        scroll: null,
        billList: [],
        selectedTravelApplyList:[]
      }
    },
    props: {
      childVisible: {
        type: Boolean,
      },
      userId: {
        type: String,
        default: 'xxx'
      },
      companyId: {
        type: String,
        default: 'xxx'
      },
    },
    methods: {
      doClose() {
        this.$emit('update:childVisible', false)
      },
      addToSelectedList(item) {
        item.selectedFormCloud = !item.selectedFormCloud;

        if (item.selectedFormCloud) {
          this.willBeSelectedList.push(item)
        } else {
          this.willBeSelectedList.splice(this.willBeSelectedList.indexOf(item), 1)
        }
      },
      add() {
        this.$emit('update:willBeSelectedList', JSON.parse(JSON.stringify(this.willBeSelectedList)))
      },
      loadData(userId, companyId) {
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getTravelApplyInfoNew', {
          params: {
            path: 'getTravelApplyInfo',
            userId,
            companyId
          }
        })
        // axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getItinerary', {})
          .then((response) => {

            this.billList = response.data.data.data.concat(this.billList)
            // this.billList = response.data.data.concat(this.billList)
            this.billList.forEach((item) => {
              this.$set(item, 'selected', false)
              if(item.entrys.length>0){
                item.entrys.forEach((entry)=>{
                  this.$set(entry,'invoices',[])
                  this.$set(entry,'amountVeh',0)
                  this.$set(entry,'amountTaxi',0)
                  this.$set(entry,'amountHotel',0)
                  this.$set(entry,'amountOther',0)
                  this.$set(entry,'amountRec',0)
                  this.$set(entry,'amountSubsidy',0)
                  this.$set(entry,'vehicle','')
                })
              }

            })
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper, {
                  // click: true,
                })
              } else {
                this.scroll.refresh()
              }
            })
          })
          .catch((error) => {

          })
      },
      doChoose(item){
        // 单选
        // this.billList.forEach((item) => {
        //   item.selected = false
        // })
        // this.selectedTravelApplyList.length = 0
        // item.selected = !item.selected
        // if(item.selected){
        //   this.selectedTravelApplyList.push(item)
        // }
        //多选
        item.selected = !item.selected
        if(item.selected){
          this.selectedTravelApplyList.push(item)
        }else{
          this.selectedTravelApplyList.splice(this.selectedTravelApplyList.indexOf(item),1)
        }
      },
      send(){
        this.$emit('update:selectedTravelApplyList',JSON.parse(JSON.stringify(this.selectedTravelApplyList)))
        this.$emit('update:childVisible', false)
      }
    },
    watch: {
      userId() {
        this.loadData(this.userId, this.companyId)

      }
    }
  }
</script>

<style scoped lang="scss">
    .panel {
        position: fixed;
        bottom: 0;
        z-index: 11;
        /*left: 0;*/
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 80%);
        > .wrap {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 80%;
            background: #f2f6f9;
            border-top-left-radius: 0.06rem;
            border-top-right-radius: 0.06rem;
            .head-icon {
                margin-top: -0.22rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                border: 0.02rem solid #f2f6f9;
                width: 0.39rem;
                height: 0.39rem;
                border-radius: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            > .head {
                margin-left: 0.12rem;
                padding: 0.1rem 0.12rem 0.06rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e9e9e9;
                .left {
                    font-size: 0.14rem;
                    color: #000000;
                }
                .right {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .num {
                        margin-right: 0.16rem;
                        span:first-child {
                            font-size: 0.15rem;
                            color: #6e6e6e;
                        }
                        span:last-child {
                            font-size: 0.12rem;
                            color: #6e6e6e;
                        }
                    }
                    .icon-wrap{
                        padding: 0.06rem;
                        .icon {
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../../assets/cancel.png") no-repeat;
                            background-size: contain;
                        }
                    }


                }
            }
            .body {
                height: calc(100% - 0.45rem);
                text-align: center;
                .list-wrap {
                    height: calc(100% - 0.5rem);
                    overflow: hidden;
                    .list {
                        .tips{
                            padding-top: 0.2rem;
                            text-align: center;
                            font-size: 0.14rem;
                            color: #999;
                        }
                        .item {
                            margin-top: 0.1rem;
                            margin-right: 0.1rem;
                            margin-left: 0.1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            > .left {
                                width: 0.2rem;
                                height: 0.2rem;
                                /*border: 1px solid #367be7;*/
                                border-radius: 50%;
                                .icon {
                                    display: inline-block;
                                    width: 0.2rem;
                                    height: 0.2rem;
                                    background: url("../../assets/selected-default.png") no-repeat;
                                    background-size: contain;
                                    /*&.active {*/
                                    /*background: url("../../assets/selected.png") no-repeat;*/
                                    /*background-size: contain;*/
                                    /*}*/
                                }
                                &.active {
                                    border: 0;
                                    .icon {
                                        background: url("../../assets/selected.png") no-repeat;
                                        background-size: contain;
                                    }
                                }
                            }
                            > .right {
                                margin-left: 0.12rem;
                                background: #ffffff;
                                border: 1px solid #e0e3e8;
                                border-radius: 10px;
                                /*padding: 0 0.14rem 0 0.14rem;*/
                                /*!*margin: 0.12rem;*!*/
                                /*background: url(../../assets/invoice-small.png) no-repeat;*/
                                /*background-size: cover;*/
                                flex: 1;
                                /*width: 2.9rem;*/
                                > .content {
                                    padding-top: 0.18rem;
                                    padding-left: 0.12rem;
                                    .top {
                                        padding-right: 0.1rem;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: flex-start;
                                        flex-direction: column;
                                        .left {
                                            span {
                                                font-size: 0.16rem;
                                                color: #333333;
                                            }
                                        }
                                        .right {
                                            padding-top: 0.06rem;
                                            span {
                                                font-size: 0.16rem;
                                                color: #333333;
                                            }
                                        }
                                    }
                                    .line {
                                        padding-top: 0.09rem;
                                        text-align: left;
                                        span {
                                            padding-right: 0.04rem;
                                            font-size: 0.13rem;
                                            color: #707072;
                                        }
                                        &:last-child {
                                            padding-bottom: 0.12rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .btn {
                    margin: 0.08rem auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #b4b4b4;
                    border-radius: 0.165rem;
                    width: 1.6rem;
                    height: 0.34rem;
                    font-size: 0.14rem;
                    color: #ffffff;
                    &.active {
                        background: #367be7
                    }
                }

            }
        }
    }


</style>