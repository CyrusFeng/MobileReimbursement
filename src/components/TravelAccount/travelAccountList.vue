<template>
    <div style="height: 100%;">
        <GoBack v-if="$store.state.UA !== 1">差旅报销单列表</GoBack>
        <div class="tab-title-wrap">
            <div class="tab-title">
                <div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"
                     :key="index" @click="changeIndex(index,$event)" ref="nav_item">
                    <span>{{item.name}}</span>
                </div>
                <span class="line" ref="line"></span>
            </div>
        </div>

        <div class="swiper-container swiper-no-swiping" :class="{'hiddenNav':$store.state.UA===1}">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="list-wrap" ref="wrapper1">
                        <div class="wrap">
                            <ul class="content">
                                <router-link
                                        tag="li"
                                        v-for="(item,index) in submitList"
                                        :key="index"
                                        :to="{name:'travelAccountDetail',params:{billId:item.id,billStatus:'SUBMIT'}}"
                                >
                                    <div class="head">
                                        <div class="left">
                                            <span class="materiel-name">{{item.number}}</span>
                                            <!--<span class="materiel-id">({{controlLength(item.tabNumber,20)}})</span>-->
                                        </div>
                                    </div>
                                    <div class="middle">
                                        <div class="item">
                                            <span class="left">申请部门:</span>
                                            <span class="right">{{item.applyDept.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">申请人:</span>
                                            <span class="right">{{item.applicant.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">报销金额:</span>
                                            <span class="right">{{item.applyAmount}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">业务日期:</span>
                                            <span class="right">{{item.applyDate.split(' ')[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="label-wrap">
                                            <span class="label">{{getStatus(item.billStatus)}}</span>
                                        </div>
                                        <div class="more">
                                            <!--<router-link :to="">更多</router-link>-->
                                        </div>
                                    </div>
                                </router-link>
                            </ul>
                            <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap" ref="wrapper2">
                        <div class="wrap">
                            <ul class="content">
                                <router-link
                                        tag="li"
                                        v-for="(item,index) in saveList"
                                        :key="index"
                                        :to="{name:'travelAccountDetail',params:{billId:item.id,billStatus:'SAVE'}}"
                                >
                                    <div class="head">
                                        <div class="left">
                                            <span class="materiel-name">{{item.number}}</span>
                                            <!--<span class="materiel-id">({{controlLength(item.tabNumber,20)}})</span>-->
                                        </div>
                                    </div>
                                    <div class="middle">
                                        <div class="item">
                                            <span class="left">申请部门:</span>
                                            <span class="right">{{item.applyDept.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">申请人:</span>
                                            <span class="right">{{item.applicant.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">报销金额:</span>
                                            <span class="right">{{item.applyAmount}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">业务日期:</span>
                                            <span class="right">{{item.applyDate.split(' ')[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="label-wrap">
                                            <span class="label">{{getStatus(item.billStatus)}}</span>
                                        </div>
                                        <div class="more">
                                            <!--<router-link :to="">更多</router-link>-->
                                        </div>
                                    </div>
                                </router-link>
                            </ul>
                            <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap" ref="wrapper3">
                        <div class="wrap">
                            <ul class="content">
                                <router-link
                                        tag="li"
                                        v-for="(item,index) in auditList"
                                        :key="index"
                                        :to="{name:'travelAccountDetail',params:{billId:item.id,billStatus:'AUDIT'}}"
                                >
                                    <div class="head">
                                        <div class="left">
                                            <span class="materiel-name">{{item.number}}</span>
                                            <!--<span class="materiel-id">({{controlLength(item.tabNumber,20)}})</span>-->
                                        </div>
                                    </div>
                                    <div class="middle">
                                        <div class="item">
                                            <span class="left">申请部门:</span>
                                            <span class="right">{{item.applyDept.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">申请人:</span>
                                            <span class="right">{{item.applicant.name}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">报销金额:</span>
                                            <span class="right">{{item.applyAmount}}</span>
                                        </div>
                                        <div class="item">
                                            <span class="left">业务日期:</span>
                                            <span class="right">{{item.applyDate.split(' ')[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="label-wrap">
                                            <span class="label">{{getStatus(item.billStatus)}}</span>
                                        </div>
                                        <div class="more">
                                            <!--<router-link :to="">更多</router-link>-->
                                        </div>
                                    </div>
                                </router-link>
                            </ul>
                            <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="add-btn">-->
        <!--<i class="icon"></i>-->
        <!--</div>-->
        <!--<div class="btn">-->
        <!---->
        <!--</div>-->
        <router-link :to="{name:'add',params:{name:'TravelAccount',userId,companyId}}" tag="div" class="btn">
            <!--<i class="icon"></i>-->
            <span class="icon">新增</span>
        </router-link>

    </div>
</template>

<script>
  const titlebar = [
    {
      name: '提交'
    },
    {
      name: '保存'
    },
    {
      name: '已审核'
    }
  ]

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Loading from '../Loading'
  import GoBack from '../goBack'

  export default {
    name: "travelAccountList",
    components: {
      Loading,
      GoBack
    },
    data() {
      return {
        titlebar,
        detailSwiper: null,
        currentIndex: 0,
        date: '',
        submitList: [],
        saveList: [],
        auditList: [],
        submitscroll: null,
        savescroll: null,
        auditscroll: null,
        showLoadingWrap: false,
        showLoadingImg: false,
        pageAmount: 10,
        userId: '',
        companyId: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {

        // if (from.name === 'index' || from.name === 'add' || from.name.indexOf('detail') > -1
        //   || from.name.indexOf('Detail') > -1|| from.name.indexOf('list') > -1|| from.name.indexOf('List') > -1) {

        if (from.name === 'index' || from.name === 'add') {
          if (vm.$route.params.userId && vm.$route.params.billStatus) {
            // let orgNum = vm.$route.params.orgNum
            let { userId, companyId, name, billStatus } = vm.$route.params
            vm.name = name
            vm.billStatus = billStatus
            vm.userId = userId
            vm.companyId = companyId

            if (vm.name) {
              localStorage.setItem('name', vm.name)
            }
            if (vm.userId) {
              localStorage.setItem('userId', vm.userId)
            }
            if (vm.companyId) {
              localStorage.setItem('companyId', vm.companyId)
            }
            if (vm.billStatus) {
              localStorage.setItem('billStatus', vm.billStatus)
            }
          } else {
            vm.name = localStorage.getItem('name')
            vm.billStatus = localStorage.getItem('billStatus')
            vm.userId = localStorage.getItem('userId')
            vm.companyId = localStorage.getItem('companyId')
          }
        } else {
          vm.name = localStorage.getItem('name')
          vm.billStatus = localStorage.getItem('billStatus')
          vm.userId = localStorage.getItem('userId')
          vm.companyId = localStorage.getItem('companyId')
        }

        if (from.name === 'index' || from.name === 'add' || from.name === 'detail') {

        }
        vm.$nextTick(() => {
          vm.detailSwiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination'
            },
            on: {
              slideChangeTransitionStart: function () {
                vm.currentIndex = vm.detailSwiper.activeIndex
              }
            },
          })


          let dom, index
          switch (vm.billStatus) {
            case 'SUBMIT': {
              dom = vm.$refs.nav_item[0]
              index = 0
              break
            }
            case 'SAVE': {
              dom = vm.$refs.nav_item[1]
              index = 1
              break
            }
            case 'AUDIT': {
              dom = vm.$refs.nav_item[2]
              index = 2
              break
            }
            default: {
              dom = vm.$refs.nav_item[0]
              break
            }
          }
          vm.currentIndex = index;
          vm.detailSwiper.slideTo(vm.currentIndex);

          // let { right } = dom.getBoundingClientRect()
          // vm.$refs.line.style.left = right / 2 + 'px'
          vm.$refs.line.style.transform = 'translateX(-50%)'
          vm.$refs.line.style.visibility = 'visible'

          let { width, left } = dom.getBoundingClientRect()
          // this.$refs.line.style.width = width+'px'
          vm.$refs.line.style.left = left + width / 2 + 'px'
          vm.$refs.line.style.transition = 'all 350ms'


          vm.loadData(vm.userId, vm.companyId, 'TravelAccount', 'SUBMIT', 1, 10)
        })

      })
    },
    mounted() {
      // let { right } = this.$refs.nav_item[0].getBoundingClientRect()
      // this.$refs.line.style.left = right / 2 + 'px'
      // this.$refs.line.style.transform = 'translateX(-50%)'
      // this.$refs.line.style.visibility = 'visible'
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
      loadData(userId, companyId, billType, billStatus, fromRow, toRow) {
        this.showLoadingWrap = true;
        this.showLoadingImg = true
        if (billStatus === 'SUBMIT') {
          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBillListTravelAccountNew', {
          // axios.get(this.$url, {
            params: {
              path: 'getBillList',
              userId: userId,
              companyId: companyId,
              billType: billType,
              billStatus: billStatus,
              fromRow: fromRow,
              toRow: toRow,
            }
          })
            .then((response) => {
              console.log(response.data)
              if (response.data.data.data[0].countRow > 0) {
                this.showLoadingWrap = false;
                this.submitList = response.data.data.data[0].bills.concat(this.submitList);

                // let fromRowSelf = fromRow
                // let toRowSelf = toRow
                // fromRowSelf += this.pageAmount
                // toRowSelf += this.pageAmount


                console.log('list', this.submitList)
                this.$nextTick(() => {
                  // console.log(fromRowSelf,toRowSelf);
                  if (!this.submitscroll) {
                    this.submitscroll = new BScroll(this.$refs.wrapper1, {
                      click: true,
                      pullUpLoad: {
                        threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                      }
                    })
                    this.submitscroll.on('pullingUp', () => {
                      // this.loadData('', '', 'PersonExpense', 'save', fromRowSelf, toRowSelf)
                      this.loadData(this.userId, this.companyId, 'TravelAccount', billStatus, fromRow += 10, toRow += 10)
                      this.submitscroll.finishPullUp()
                      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })
                  } else {
                    this.submitscroll.finishPullUp()
                    this.submitscroll.refresh()
                  }
                })
              } else {
                this.showLoadingImg = false
              }

            })
            .catch((error) => {
              this.showLoadingImg = false
            })

        }
        else if (billStatus === 'SAVE') {
          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBillListTravelAccountNew', {
          // axios.get(this.$url, {
            params: {
              path: 'getBillList',
              userId: userId,
              companyId: companyId,
              billType: billType,
              billStatus: billStatus,
              fromRow: fromRow,
              toRow: toRow,
            }
          })
            .then((response) => {
              console.log(response.data)
              if (response.data.data.data[0].countRow > 0) {
                this.showLoadingWrap = false;
                this.saveList = response.data.data.data[0].bills.concat(this.saveList);

                // let fromRowSelf = fromRow
                // let toRowSelf = toRow
                // fromRowSelf += this.pageAmount
                // toRowSelf += this.pageAmount


                console.log('list', this.saveList)
                this.$nextTick(() => {
                  // console.log(fromRowSelf,toRowSelf);
                  if (!this.savescroll) {
                    this.savescroll = new BScroll(this.$refs.wrapper2, {
                      click: true,
                      pullUpLoad: {
                        threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                      }
                    })
                    this.savescroll.on('pullingUp', () => {
                      // this.loadData('', '', 'PersonExpense', 'save', fromRowSelf, toRowSelf)
                      this.loadData(this.userId, this.companyId, 'TravelAccount', billStatus, fromRow += 10, toRow += 10)
                      this.savescroll.finishPullUp()
                      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })
                  } else {
                    this.savescroll.finishPullUp()
                    this.savescroll.refresh()
                  }
                })
              } else {
                this.showLoadingImg = false
              }

            })
            .catch((error) => {
              this.showLoadingImg = false
            })

        }
        else if (billStatus === 'AUDIT') {
          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBillListTravelAccountNew', {
          // axios.get(this.$url, {
            params: {
              path: 'getBillList',
              userId: userId,
              companyId: companyId,
              billType: billType,
              billStatus: billStatus,
              fromRow: fromRow,
              toRow: toRow,
            }
          })
            .then((response) => {
              if (response.data.data.data[0].countRow > 0) {
                this.showLoadingWrap = false;
                this.auditList = response.data.data.data[0].bills.concat(this.auditList);
                console.log('list', this.auditList)

                this.$nextTick(() => {
                  if (!this.auditscroll) {
                    this.auditscroll = new BScroll(this.$refs.wrapper3, {
                      click: true,
                      pullUpLoad: {
                        threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                      }
                    })
                    this.auditscroll.on('pullingUp', () => {
                      this.loadData(this.userId, this.companyId, 'TravelAccount', billStatus, fromRow += 10, toRow += 10)
                      this.auditscroll.finishPullUp()
                      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })
                  } else {
                    this.auditscroll.refresh()
                  }
                })
              } else {
                this.showLoadingImg = false
              }

            })
            .catch((error) => {
              this.showLoadingImg = false
            })
        }

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
        if (this.currentIndex === 2) {
          if (this.auditList.length === 0) {
            this.loadData(this.userId, this.companyId, this.name, 'AUDIT', 1, 10)
          }
        } else if (this.currentIndex === 1) {
          if (this.saveList.length === 0) {
            this.loadData(this.userId, this.companyId, this.name, 'SAVE', 1, 10)
          }
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
            /*height: 100%;*/
            .swiper-slide {
                /*height: 100%;*/
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

    .list-wrap {
        /*height: calc(100% - 0.34rem);*/
        height: 100%;
        overflow: hidden;
        background-color: #F1F5F8;
        ul {
            padding-top: 0.12rem;
        }
    }

    .list-wrap li {
        margin: 0.12rem;
        padding: 0.15rem;
        font-size: 0.1rem;
        background-color: #fff;
        box-shadow: 0 0.02rem 0.04rem 0 #e3eef5;
        border-radius: 0.06rem;
        .head {
            margin-bottom: 0.08rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .materiel-name {
                    font-size: 0.14rem;
                    color: #030303;
                }
            }
        }
        .middle {
            margin-bottom: 0.04rem;
            display: flex;
            flex-wrap: wrap;
            font-size: 0.13rem;
            .item {
                padding-bottom: 0.08rem;
                width: 50%;
                .left {
                    padding-right: 0.06rem;
                    color: #707070;
                }
                .right {
                    color: #666666;
                }
            }

        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .label-wrap {
                span {
                    margin-right: 0.14rem;
                    padding: 0.03rem 0.14rem;
                    display: inline-block;

                    background: #e4e7fd;
                    border-radius: 0.03rem;
                    font-size: 0.1rem;
                    color: #4e74ea;
                }
            }
        }
        &:first-child {
            margin-top: 0;
        }
    }

    .list-wrap .content li .bottom .more a {
        font-size: 0.09rem;
        color: #bbbbbb;
    }

    /*.add-btn{*/
    /*position: fixed;*/
    /*left: 0.12rem;*/
    /*bottom: 0.6rem;*/
    /*width: 0.4rem;*/
    /*height: 0.4rem;*/
    /*border-radius: 50%;*/
    /*background-color: #fff;*/
    /*.icon{*/
    /*display: inline-block;*/
    /*width: 0.12rem;*/
    /*height: 0.12rem;*/
    /*background: url("../../assets/add.png") no-repeat;*/
    /*background-size: contain;*/
    /*}*/
    /*}*/
    .btn {
        position: fixed;
        right: 0.12rem;
        bottom: 0.8rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        z-index: 9;
        background-color: #599bff;
        /*transform: translateY(20%);*/
    }

    .icon {
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
        transform: translate(-50%, -50%);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 0.24rem;
        /*height: 0.12rem;*/
        /*background: url("../../assets/add.png") no-repeat;*/
        /*background-size: contain;*/
        color: #fff;
        font-size: 0.12rem;
        z-index: 10;
    }
</style>