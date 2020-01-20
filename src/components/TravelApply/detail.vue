<template>
    <div style="height: 100%;">
        <GoBack v-if="$store.state.UA !== 1">出差申请单详情</GoBack>
        <div class="tab-title-wrap">
            <div class="tab-title">
                <div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"
                     :key="index" @click="changeIndex(index,$event)" ref="nav_item">
                    <span>{{item.name}}</span>
                </div>
                <span class="line" ref="line"></span>
            </div>
        </div>
        <div class="parent-swiper swiper-container swiper-no-swiping" :class="{'hiddenNav':$store.state.UA===1}">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="list-wrap" ref="wrapper1">
                        <div class="wrap">
                            <div class="new-data">
                                <div class="head">
                                    <div class="left">
                                        <div class="name" v-if="detailData.applicant">{{detailData.applicant.name}}
                                        </div>
                                        <span>(申请人)</span>
                                    </div>
                                    <router-link :to="{name:'add',params:{name:'TravelApply',detailData}}"
                                                 tag="div" class="right" v-if="billStatus === 'SAVE'">
                                        <span>编辑</span>
                                    </router-link>
                                    <!--<div class="right" v-if="">-->
                                    <!--<span>编辑</span>-->
                                    <!--</div>-->

                                </div>
                                <div class="content" :class="{folded:!folded}">
                                    <div class="row">
                                        <div class="label">单据状态</div>
                                        <div class="right">{{getStatus(billStatus)}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请日期</div>
                                        <div class="right" v-if="detailData.applyDate">
                                            {{detailData.applyDate.substr(0,detailData.applyDate.indexOf(' '))}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">财务组织</div>
                                        <div class="right" v-if="detailData.company">{{detailData.company.name}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请部门</div>
                                        <div class="right" v-if="detailData.applyDept">{{detailData.applyDept.name}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">同行人</div>
                                        <div class="right" v-if="detailData.together&&detailData.together.length>0">
                                            {{detailData.together.reduce((prev,current)=>{return prev +
                                            current.name+' | '},'').replace(/(\s*$)/g,"").replace(/(\|*$)/g,"").replace(/(\s*$)/g,"")}}
                                        </div>
                                    </div>
                                    <!--<div class="row">-->
                                    <!--<div class="label">收款银行</div>-->
                                    <!--<div class="right">{{detailData.bankName}}</div>-->
                                    <!--</div>-->
                                    <!--<div class="row">-->
                                    <!--<div class="label">收款账号</div>-->
                                    <!--<div class="right">{{detailData.accountNum}}</div>-->
                                    <!--</div>-->
                                </div>
                                <div class="bottom">
                                    <div @click="folded = !folded">
                                        <p v-if="folded">
                                            <span>展开</span>
                                            <i class="icon"></i>
                                        </p>
                                        <p v-else class="unfolded">
                                            <span>收起</span>
                                            <i class="icon"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="reimburse-info info-wrap">
                                <div class="head">
                                    <i class="icon"></i>
                                    <span>出差行程</span>
                                </div>
                                <div class="travel-list">
                                    <div class="travel-item" v-for="item in detailData.entrys">
                                        <div class="row">
                                            <div class="block">
                                                <span>{{item.startPlace}}</span>
                                                <span>{{item.startTime.substr(0,item.startTime.indexOf(' '))}}</span>
                                                <!--<span>{{item.startTime}}</span>-->
                                            </div>
                                            <div class="line"></div>
                                            <div class="type">行程</div>
                                            <div class="line"></div>
                                            <div class="block">
                                                <span>{{item.endPlace}}</span>
                                                <!--<span>{{item.endTime}}</span>-->
                                                <span>{{item.endTime.substr(0,item.endTime.indexOf(' '))}}</span>
                                            </div>
                                        </div>
                                        <div class="remark">{{item.explain}}</div>
                                    </div>

                                </div>
                            </div>
                            <div class="desc info-wrap">
                                <div class="head">
                                    <i class="icon"></i>
                                    <span>出差理由</span>
                                </div>
                                <div class="text">
                                    <span>{{detailData.remark}}</span>
                                </div>
                            </div>
                            <!--<div class="btns-wrap">-->
                            <!--<span>保存</span>-->
                            <!--<span>提交</span>-->
                            <!--</div>-->

                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap" ref="wrapper2">
                        <div class="timeline">
                            <div class="tips" v-if="approvalData.length<=0">暂无审批信息</div>
                            <div class="item" v-else v-for="item in approvalData">
                                <div class="block">
                                    <div class="avatar">
                                        <img :src="item.approver.image.image" alt="" v-if="item.approver.image.image">
                                        <img src="../../assets/defaultAvator.png" alt="" v-else>
                                    </div>
                                    <div class="detail">
                                        <div class="head">
                                            <span>{{item.approver.name}}</span>
                                            <span>{{item.option}}</span>
                                        </div>
                                        <div class="post">{{item.nodeName}}</div>
                                        <div class="time">{{item.approveTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FullPageLoading :loading="loading"></FullPageLoading>

    </div>
</template>

<script>
  const titlebar = [
    {
      name: '出差申请',
    },
    {
      name: '审批信息',
    }
  ]

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import GoBack from '../goBack'
  import FullPageLoading from '../fullPageLoading'


  export default {
    name: "detail",
    components: {
      GoBack,
      FullPageLoading
    },
    data() {
      return {
        titlebar,
        detailSwiper: null,
        currentIndex: 0,
        date: '',
        folded: true,
        itemFolded: true,

        detailData: {},
        approvalData: [],
        imageBase: 'data:image/jpeg;base64,',
        billId: '',
        billStatus: '',
        infoScroll: null,
        detailScroll: null,
        loading:false
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {

        if (from.path === '/travelApplyList') {
          vm.billId = vm.$route.params.billId
          vm.billStatus = vm.$route.params.billStatus
          localStorage.setItem('billId', vm.billId)
          localStorage.setItem('billStatus', vm.billStatus)
        } else if (from.name && from.name.indexOf('add') > -1) {
          vm.billId = localStorage.getItem('billId')
          vm.billStatus = localStorage.getItem('billStatus')
        } else if(from.path === '/'){
          vm.billId = localStorage.getItem('billId')
          vm.billStatus = localStorage.getItem('billStatus')
        }

        vm.$nextTick(() => {
          vm.detailSwiper = new Swiper('.parent-swiper', {
            on: {
              slideChangeTransitionStart: function () {
                vm.currentIndex = vm.detailSwiper.activeIndex
              }
            }
          })

          // console.log()
          // let { right } = dom.getBoundingClientRect()
          // vm.$refs.line.style.left = right / 2 + 'px'
          vm.$refs.line.style.transform = 'translateX(-50%)'
          vm.$refs.line.style.visibility = 'visible'

          let { width, left } = vm.$refs.nav_item[0].getBoundingClientRect()
          // this.$refs.line.style.width = width+'px'
          vm.$refs.line.style.left = left + width / 2 + 'px'
          vm.$refs.line.style.transition = 'all 350ms'


          vm.loadData(vm.billId)
          vm.$nextTick(() => {
            if (!vm.infoScroll) {
              vm.infoScroll = new BScroll(vm.$refs.wrapper1, {
                click: true,
                pullUpLoad: {
                  threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                }
              })
            } else {
              vm.infoScroll.refresh()
            }
          })
        })
      })
    },
    methods: {
      changeIndex(index, $event) {
        this.currentIndex = index;
        this.detailSwiper.slideTo(this.currentIndex);

        console.log($event.target)
        let { width, left } = $event.target.getBoundingClientRect()
        // this.$refs.line.style.width = width+'px'
        this.$refs.line.style.left = left + width / 2 + 'px'
        this.$refs.line.style.transition = 'all 350ms'
      },
      // loadData(type, page, pageAmount, materiel, organization, date, supplier) {
      loadData(billId) {
        this.loading = true
        // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillInfo', {
        //   params: {}
        // })
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBillInfoTravelApplyNew', {
          params: {
            path: 'getBillInfo',
            billId,
          }
        })
          .then((response) => {
            this.loading = false
            console.log(response.data)
            this.detailData = response.data.data.data[0]


          })
          .catch((error) => {

          })
      },
      getApprovalInfo(billId) {
        this.loading = true
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getTravelApplyInfo', {
          params: {
            path: 'getApprovalInfo',
            billId,
          }
        })
          .then((response) => {
            this.loading = false
            this.approvalData = response.data.data.data
            this.approvalData.forEach((item) => {
              if (item.approver.image.image) {
                item.approver.image.image = this.imageBase + item.approver.image.image

              }
            })
            this.$nextTick(() => {
              if (!this.detailScroll) {
                this.detailScroll = new BScroll(this.$refs.wrapper2, {
                  click: true,
                  pullUpLoad: {
                    threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                  }
                })
              } else {
                this.detailScroll.refresh()
              }
            })
          })
          .catch((error) => {

          })
      },
      getTotal(list, attribute) {
        return list.reduce((prev, current) => {
          let x = 0
          if (current[attribute] && current[attribute] !== 'undefined' && current[attribute] !== 'null') {
            x = Number(current[attribute])
          }
          return prev + x
        }, 0)
      },
      getStatus(status) {
        if (status === 'AUDIT') {
          return '审核'
        } else if (status === 'SAVE') {
          return '保存'
        } else if (status === 'SUBMIT') {
          return '提交'
        }
      }
    },
    watch: {
      currentIndex() {
        if (this.currentIndex === 1) {
          this.getApprovalInfo(this.billId)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .swiper-container {
        height: calc(100% - 0.88rem);
        /*height: calc(100% - 0.44rem);*/
        &.hiddenNav{
            height: calc(100% - 0.44rem);
        }
        .swiper-wrapper {
            height: 100%;
            .swiper-slide {
                height: 100%;
            }
        }
    }

    .tab-title-wrap {
        padding: 0.05rem 0;
        background-color: #367be7;
    }

    .tab-title {
        background-color: #367be7;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        .line {
            background: #fff;
            border-radius: 0.015rem;
            width: 0.21rem;
            height: 0.03rem;
            position: absolute;
            visibility: hidden;
            bottom: 0;
        }
        .nav-item {
            padding: 0 0.14rem;
            width: auto !important;
            font-size: 0.16rem;
            flex: 1;
            span {
                display: inline-block;
                line-height: 0.32rem;
                border-bottom: 0.02rem solid rgba(237, 91, 0, 0);
                color: #fff;
                opacity: 0.4;
                width: 100%;
                text-align: center;
            }
            &.nav_active {
                span {
                    color: #fff;
                    opacity: 1;
                }
            }
        }
    }

    .swiper-slide:last-child {
        > .list-wrap {
            background-color: #fff;
        }
    }

    .list-wrap {
        /*height: calc(100% - 0.34rem);*/
        height: 100%;
        overflow: hidden;
        background-color: #F1F5F8;
        > .wrap {
            /*height: 100%;*/
            .new-data {
                background-color: #fff;
                .head {
                    margin-left: 0.12rem;
                    margin-right: 0.12rem;
                    padding: 0.1rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    .left {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-end;
                        .name {
                            margin-right: 0.05rem;
                            font-size: 0.14rem;
                            color: #000000;
                            flex: 1;
                        }
                        span {
                            font-size: 0.12rem;
                            color: #a0a0a0;
                        }
                    }
                    .right {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #478af2;
                        border-radius: 0.105rem;
                        width: 0.55rem;
                        height: 0.21rem;
                        span {
                            font-size: 0.11rem;
                            color: #ffffff;
                        }
                    }
                }
                .content {
                    margin-left: 0.12rem;
                    margin-right: 0.12rem;
                    height: 0.47rem;
                    overflow: hidden;
                    .row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .label {
                            padding: 0.16rem 0;
                            padding-right: 0.3rem;
                            font-size: 0.14rem;
                            color: #000000;
                            /*border-bottom: 1px solid #fff;*/
                            width: 4em;
                        }
                        .right {
                            padding: 0.16rem 0;
                            font-size: 0.14rem;
                            color: #6e6e6e;
                            /*border-bottom: 1px solid #f0f0f0;*/
                            /*flex: 1;*/
                            .active {
                                color: #b4b4b4;
                            }
                        }
                    }
                    &.folded {
                        height: 2.28rem;
                    }
                }
                .bottom {
                    text-align: right;
                    div {
                        > p {
                            margin-left: auto;
                            padding: 0.07rem 0.1rem 0.11rem;
                            display: inline-flex;
                            justify-content: flex-end;
                            align-items: center;
                            span {
                                font-size: 0.10rem;
                                color: #007aff;
                            }
                            .icon {
                                margin-left: 0.04rem;
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.1rem;
                                background: url("../../assets/xia.png") no-repeat;
                                background-size: contain;
                            }

                            &.unfolded {
                                .icon {
                                    display: inline-block;
                                    width: 0.14rem;
                                    height: 0.1rem;
                                    background: url("../../assets/shang.png") no-repeat;
                                    background-size: contain;
                                }
                            }
                        }
                    }

                }
            }
            .info-wrap {
                margin-top: 0.1rem;
                background-color: #fff;
                overflow: hidden;
                &.reimburse-info {
                    > .head {
                        border: 0;
                    }
                    .travel-list {
                        > .travel-item {
                            background: #fbfbfc;
                            border: 1px solid #c7cbd3;
                            border-radius: 6px;
                            margin: 0 0.1rem;
                            margin-bottom: 0.1rem;
                            padding: 0.2rem 0.14rem;
                            > .row {

                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                > .block {
                                    width: 1rem;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    align-items: center;
                                    span:first-child {
                                        margin-bottom: 0.04rem;
                                        font-size: 0.16rem;
                                        color: #333333;
                                    }
                                    span:last-child {
                                        font-size: 0.14rem;
                                        color: #9f9f9f;
                                        word-break: break-all;
                                    }
                                }
                                .line {
                                    margin: 0 0.06rem;
                                    height: 1px;
                                    width: 0.43rem;
                                    background-color: #aaaaaa;
                                }
                                .type {
                                    font-size: 0.14rem;
                                    color: #6c6c6e;
                                    word-break: keep-all;
                                }
                            }
                            > .remark {
                                margin-top: 0.1rem;
                                font-size: 0.12rem;
                                color: #6c6c6e;
                            }
                        }
                    }
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
                                background: url("../../assets/triangle-down.png") no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
                &.invoice-info {
                    .list {
                        .item {
                            /*padding: 0.1rem 0.14rem 0.064rem 0.14rem;*/
                            padding: 0.1rem 0.14rem 0 0.14rem;
                            margin: 0.12rem;
                            background: url(../../assets/invoice-small.png) no-repeat;
                            background-size: contain;
                            .head {
                                height: 0.34rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .left {
                                    font-size: 0.14rem;
                                    color: #000000;
                                    span {
                                        padding-right: 0.08rem;
                                    }
                                }
                                .right {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background: #ff832f;
                                    width: 0.21rem;
                                    height: 0.21rem;
                                    border-radius: 50%;
                                    color: #fff;
                                    font-size: 0.14rem;
                                }
                            }
                            .body {
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-start;
                                height: 0.954rem;
                                .row {
                                    padding-bottom: 0.04rem;
                                    padding-top: 0.08rem;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    /*height: 0.22rem;*/
                                    .left {
                                        span:first-child {
                                            padding-right: 0.08rem;
                                            font-size: 0.13rem;
                                            color: #808081;
                                        }
                                        span:last-child {
                                            font-size: 0.13rem;
                                            color: #585858;
                                        }
                                    }
                                    .right {
                                        font-size: 0.13rem;
                                        color: #9b9b9b;
                                    }
                                }
                            }
                        }
                    }
                }
                &.desc {
                    > .head{
                        .icon{
                            display: inline-block;
                            width: 0.2rem;
                            height: 0.16rem;
                            background: url("../../assets/explain.png") no-repeat !important;
                            background-size: contain !important;
                        }
                    }
                    .text {
                        margin-top: 0.1rem;
                        margin-bottom: 0.2rem;
                        margin-left: 0.12rem;
                        position: relative;
                        span {
                            font-size: 0.14rem;
                            color: #b3b3b3;
                            word-break: break-all;
                        }
                        textarea {
                            font-size: 0.12rem;
                        }
                    }
                }
                > .head {
                    /*margin-left: auto;*/
                    /*padding: 0.16rem 0 0.16rem 0.1rem;*/
                    /*display: inline-flex;*/
                    /*justify-content: flex-end;*/
                    /*align-items: center;*/
                    margin-left: 0.12rem;
                    padding: 0.16rem 0 0.16rem 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    .icon {
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.16rem;
                        background: url("../../assets/chucha-2.png") no-repeat;
                        background-size: contain;
                    }
                    span {
                        font-size: 0.14rem;
                        color: #000000;
                    }
                }
                .summary {
                    margin: 0 0.1rem 0.1rem 0.1rem;
                    padding: 0.11rem 0.65rem 0.13rem 0.65rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #f2f6f9;
                    box-shadow: 0 2px 4px 0 #e3eef5;
                    border-radius: 4px;
                    .block {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        .label {
                            font-size: 0.12rem;
                            color: #6e6e6e;
                        }
                        .num {
                            font-size: 0.26rem;
                            line-height: 1.46;
                            color: #333333;
                        }
                    }
                    .line {
                        width: 0.01rem;
                        height: 0.3rem;
                        background-color: #e3dede;
                    }
                }
                .reimburse-list {
                    margin-left: 0.12rem;
                    .reimburse-item {
                        .head {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .left {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .line {
                                    margin-right: 0.05rem;
                                    background: #228cff;
                                    width: 0.03rem;
                                    height: 0.13rem;
                                    display: inline-block;
                                }
                                span {
                                    font-size: 0.14rem;
                                    color: #000000;
                                }
                            }
                            .right {
                                div {
                                    > p {
                                        margin-left: auto;
                                        padding: 0.07rem 0.1rem 0.11rem;
                                        display: inline-flex;
                                        justify-content: flex-end;
                                        align-items: center;
                                        span {
                                            font-size: 0.10rem;
                                            color: #007aff;
                                        }
                                        .icon {
                                            margin-left: 0.04rem;
                                            display: inline-block;
                                            width: 0.14rem;
                                            height: 0.1rem;
                                            background: url("../../assets/xia.png") no-repeat;
                                            background-size: contain;
                                        }

                                        &.unfolded {
                                            .icon {
                                                display: inline-block;
                                                width: 0.14rem;
                                                height: 0.1rem;
                                                background: url("../../assets/shang.png") no-repeat;
                                                background-size: contain;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .content {
                            /*margin-left: 0.12rem;*/
                            /*height: 0.47rem;*/
                            height: 0;
                            overflow: hidden;
                            .row {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .label {
                                    padding: 0.16rem 0;
                                    padding-right: 0.3rem;
                                    font-size: 0.14rem;
                                    color: #000000;
                                    border-bottom: 1px solid #fff;
                                    width: 4em;
                                }
                                .right {
                                    padding: 0.16rem 0;
                                    font-size: 0.14rem;
                                    color: #6e6e6e;
                                    border-bottom: 1px solid #f0f0f0;
                                    flex: 1;
                                    .active {
                                        color: #b4b4b4;
                                    }
                                }
                            }
                            &.itemFolded {
                                height: auto;
                            }
                        }
                    }
                }
            }
            .btns-wrap {
                font-size: 0;
                span {
                    width: 50%;
                    height: 0.5rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.16rem;
                    color: #ffffff;
                    background-image: linear-gradient(-130deg, #488cf8 0%, #367be7 100%);
                }
            }
        }
    }

    .timeline {
        padding-top: 0.3rem;
        .item {
            margin-bottom: 0.2rem;
            &::before {
                content: '';
                position: absolute;
                top: 0px;
                left: 0.38rem;
                bottom: 0px;
                width: 4px;
                background: #ddd;
            }
            .block {
                margin-right: 0.12rem;
                margin-left: 0.62rem;
                padding: 0.1rem 0.12rem 0 0.2rem;
                /*position: relative;*/
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                background: #f2f6f9;
                border: 1px solid #efefef;
                &::before {
                    content: '';
                    position: absolute;
                    width: 0.12rem;
                    height: 0.12rem;
                    border: 0.04rem solid salmon;
                    background-color: #fff;
                    border-radius: 100%;
                    /*top: 15%;*/
                    left: 0.3rem;
                    z-index: 99;
                }
                .avatar {
                    margin-right: 0.05rem;
                    width: 0.28rem;
                    height: 0.28rem;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .detail {
                    flex: 1;
                    .head {
                        padding-bottom: 0.1rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span:first-child {
                            font-size: 0.14rem;
                            color: #030303;
                        }
                        span {
                            font-size: 0.16rem;
                            color: #999999;
                        }
                    }
                    .post {
                        padding-bottom: 0.1rem;
                        font-size: 0.13rem;
                        color: #999999;
                    }
                    .time {
                        padding-bottom: 0.12rem;
                        font-size: 0.12rem;
                        color: #BCBCBC;;
                    }
                }
            }
        }
        .tips {
            text-align: center;
            font-size: 0.14rem;
            color: #999;
        }
    }

</style>