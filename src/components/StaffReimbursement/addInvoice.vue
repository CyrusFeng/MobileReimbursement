<template>
    <div class="panel" :class="{'active':!childVisible}">
        <div class="wrap" :class="{'active':!childVisible}">
            <div class="head-icon">
                <img src="../../assets/add-invoice.png" alt="">
            </div>
            <div class="head">
                <div class="left">添加发票</div>
                <div class="right">
                    <div class="num">
                        <span>已选{{selectedInvoice.length}}条</span>
                        <span>(多选)</span>
                    </div>
                    <div class="icon-wrap" @click="doClose">
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="change-btn">
                    <span @click="changeIndex(index,$event)"
                          v-for="(item,index) in titleData"
                          :class="{'nav_active':index == currentIndex}"
                    >{{item.name}}</span>
                </div>
                <div class="child-container swiper-container swiper-no-swiping">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide alternative">
                            <div class="list-wrap" ref="wrapper2">
                                <!--<div class="tips" v-if="billList.length<=0">暂无发票数据</div>-->
                                <div class="list">
                                    <div class="item" v-for="item in billList" :key="item.id"  @click="addToSelectedCloudList(item)">
                                        <div class="left" :class="{'active':item.selectedFormCloud}">
                                            <!--<i class="icon" @click="addToSelectedCloudList(item)"></i>-->
                                            <i class="icon"></i>
                                        </div>
                                        <div class="right">
                                            <div class="head">
                                                <div class="left">
                                                    <span>发票号码</span>
                                                    <span>{{item.invNumber}}</span>
                                                </div>
                                                <div class="shortname">{{item.shortName}}</div>
                                                <div class="right">{{item.isSpecialInv==='是'?'专':'普'}}</div>
                                            </div>
                                            <div class="body">
                                                <div class="row">
                                                    <div class="left">
                                                        <span>销方名称：</span>
                                                        <span>{{item.invOutName}}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="left">
                                                        <span>购方名称：</span>
                                                        <span>{{item.invInName}}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="left">
                                                        <span>发票金额：</span>
                                                        <span>{{item.invAmount}}</span>
                                                    </div>
                                                    <div class="right" v-if="item.invDate">{{item.invDate.substr(0,item.invDate.indexOf(' '))}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
                            </div>
                            <div class="addBtn btn" :class="{active:willBeSelectedList.length>0}"
                                 @click="add(willBeSelectedList.length)">添加
                            </div>
                        </div>
                        <div class="swiper-slide selected">
                            <div class="list-wrap" ref="wrapper1">
                                <div class="tips" v-if="selectedInvoice.length<=0">暂未选择发票</div>
                                <div class="list">
                                    <div class="item" v-for="item in selectedInvoice" :key="item.id" @click="addToRemoveList(item)">
                                        <div class="left">
                                            <i class="icon" :class="{'active':item.selectedFormChosenList}"></i>
                                        </div>
                                        <div class="right">
                                            <div class="head">
                                                <div class="left">
                                                    <span>发票号码</span>
                                                    <span>{{item.invNumber}}</span>
                                                </div>
                                                <div class="shortname">{{item.shortName}}</div>
                                                <div class="right">{{item.isSpecialInv==='是'?'专':'普'}}</div>
                                            </div>
                                            <div class="body">
                                                <div class="row">
                                                    <div class="left">
                                                        <span>销方名称：</span>
                                                        <span>{{item.invOutName}}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="left">
                                                        <span>购方名称：</span>
                                                        <span>{{item.invInName}}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="left">
                                                        <span>发票金额：</span>
                                                        <span>{{item.invAmount}}</span>
                                                    </div>
                                                    <div class="right" v-if="item.invDate">{{item.invDate.substr(0,item.invDate.indexOf(' '))}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="removeBtn btn" :class="{'active':willBeRemovedList.length>0}" @click="remove">
                                删除
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  const titleData = [
    {
      name: '我的发票',
    },
    {
      name: '已选发票',
    }
  ]

  import Swiper from 'swiper'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Loading from '../Loading'

  export default {
    name: "addInvoice",
    components:{
      Loading
    },
    data() {
      return {
        titleData,
        currentIndex: 0,
        detailSwiper: null,
        panelVisible: true,
        scroll1: null,
        scroll2: null,
        billList: [],
        willBeSelectedList: [],
        willBeRemovedList: [],
        allBeSelectedList: [],
        allBeSelectedStringList:[],
        showLoadingWrap: false,
        showLoadingImg: false,
      }
    },
    props: {
      childVisible: {
        type: Boolean,
        default: true
      },
      userId: {
        type: String
      },
      companyId: {
        type: String
      },
      selectedInvoice: {
        type: Array
      },
    },
    mounted() {
      this.detailSwiper = new Swiper('.child-container', {
        on: {
          slideChangeTransitionStart: () => {
            this.currentIndex = this.detailSwiper.activeIndex
          }
        },
      })

    },
    methods: {
      changeIndex(index, $event) {
        this.currentIndex = index;
        this.detailSwiper.slideTo(this.currentIndex);
      },
      doClose() {
        this.$emit('update:childVisible', false)
      },
      addToSelectedCloudList(item) {
        item.selectedFormCloud = !item.selectedFormCloud;

        if (item.selectedFormCloud) {
          //以下字段是为了在add组件中循环发票时，将被选择的下拉选项赋值给每个发票时候可以触发响应式
          // item.orgRangeItem = ''
          item.costCenter = ''
          // item.purposeInfoItem = ''
          item.purpose = ''
          // item.budgetItemInfoItem = ''
          this.willBeSelectedList.unshift(item)
          // if(this.allBeSelectedList.indexOf(item) === -1){
          //   this.willBeSelectedList.push(item)
          //   this.allBeSelectedList.push(item)
          // }
        } else {
          this.willBeSelectedList.forEach((option,index)=>{
            if(option.id === item.id){
              this.willBeSelectedList.splice(index, 1)
            }
          })
          // this.willBeSelectedList.splice(this.willBeSelectedList.indexOf(item), 1)
        }
      },
      addToRemoveList(item) {
        item.selectedFormChosenList = !item.selectedFormChosenList;
        console.log('item.selectedFormChosenList',item.selectedFormChosenList)
        if (item.selectedFormChosenList) {
          this.willBeRemovedList.push(item)
        }
      },
      add(len) {

        if (len > 0) {
          //从所有被选择过的发票列表和将被选择发票列表进行对比，在willBeSelectedList中删除被选择过的发票
          this.willBeSelectedList.forEach((item) => {

            // let copy = JSON.stringify(item)
            // if (this.allBeSelectedStringList.indexOf(copy) !== -1) {
            //   this.willBeSelectedStringList = this.willBeSelectedList.map((item)=>JSON.stringify(item))
            //   this.willBeSelectedStringList.splice(this.willBeSelectedStringList.indexOf(copy), 1)
            //   this.willBeSelectedList = this.willBeSelectedStringList.map((item)=>JSON.parse(item))
            // }
            this.allBeSelectedList.forEach((i,index)=>{
              if(item.id === i.id){
                this.willBeSelectedList.splice(index,1)
              }
            })
          })

          this.$emit('update:willBeSelectedList', JSON.parse(JSON.stringify(this.willBeSelectedList)))
          //数据发送后将willBeSelectedList中的发票存入所有被选择过的发票列表，并清空willBeSelectedList
          this.allBeSelectedList = [...this.allBeSelectedList, ...JSON.parse(JSON.stringify(this.willBeSelectedList))]
          // this.allBeSelectedStringList = this.allBeSelectedList.map((item)=>JSON.stringify(item))
          this.willBeSelectedList.length = 0

          this.$emit('update:childVisible', false)


          // this.$nextTick(() => {
          //   if (!this.scroll1) {
          //     this.scroll1 = new BScroll(this.$refs.wrapper1, {
          //       click: true,
          //     })
          //     console.log(this.scroll1)
          //   } else {
          //     this.scroll1.refresh()
          //   }
          // })
        }
      },
      remove() {
        this.$emit('update:willBeRemovedList', JSON.parse(JSON.stringify(this.willBeRemovedList)))

        //删除已选发票后，将发票云中的已选发票改为未选中状态
        this.billList.forEach((billItem) => {
          this.willBeRemovedList.forEach((removeItem) => {
            if (billItem.id === removeItem.id) {
              billItem.selectedFormCloud = false
            }
          })
        })

        this.willBeSelectedList.forEach((item) => {
          this.willBeRemovedList.forEach((removeItem) => {
            if (item.id === removeItem.id) {
              this.willBeSelectedList.splice(this.willBeSelectedList.indexOf(item), 1)
            }
          })
        })

        //将删除的发票放回发票云
        this.willBeRemovedList.forEach((removeItem) => {
          this.billList.push(removeItem)
        })

        //将被删除的发票从allBeSelectedList移除
        this.willBeRemovedList.forEach((item) => {
          this.allBeSelectedList.forEach((i,index)=>{
            if(i.id === item.id){
              this.allBeSelectedList.splice(index, 1)
            }
          })
        })
        // this.allBeSelectedStringList = this.allBeSelectedList.map((item)=>JSON.stringify(item))

        if(this.willBeRemovedList.length>0){
          // this.willBeRemovedList.forEach((item)=>{
          //   this.billList.push(item)
          // })
          this.willBeRemovedList.length = 0
        }
      },
      loadData(userId, companyId, billType = 'PersonExpense', deptId = '', fromRow, toRow) {
        this.showLoadingWrap = true;
        this.showLoadingImg = true

        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getInvoiceInfoNew', {
          params: {
            path: 'getInvoiceInfo',
            userId,
            companyId,
            billType,
            deptId,
            fromRow,
            toRow
          }
        })
        // axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getInvoiceList', {})
                .then((response) => {
            if(Number(response.data.data.data[0].countRow)>0){
              this.showLoadingWrap = false;
              response.data.data.data[0].bills.forEach((item) => {
                this.$set(item, 'selectedFormCloud', false)
                this.$set(item, 'selectedFormChosenList', false)
                this.$set(item, 'fold', true)
              })
              this.billList = response.data.data.data[0].bills.concat(this.billList)
              this.$nextTick(() => {
                // console.log(fromRowSelf,toRowSelf);
                if (!this.scroll2) {
                  this.scroll2 = new BScroll(this.$refs.wrapper2, {
                    click: true,
                    pullUpLoad: {
                      threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                    }
                  })
                  this.scroll2.on('pullingUp', () => {
                    this.loadData(userId, companyId, 'PersonExpense', deptId, fromRow += 10, toRow += 10)
                    this.scroll2.finishPullUp()
                    // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                  })
                } else {
                  this.scroll2.refresh()
                }


              })
            }else{
              this.showLoadingImg = false
            }

          })
          .catch((error) => {
            this.showLoadingImg = false

          })
      },
      getPersonExpenseInvoice(deptId){
        this.loadData(this.userId, this.companyId, 'PersonExpense', deptId, 1, 10)
      }
    },
    watch: {
      // currentIndex() {
      //   let deptId = localStorage.getItem('deptId')
      //   if (this.currentIndex === 0) {
      //     if (this.billList.length < 1) {
      //       this.loadData(this.userId, this.companyId, 'PersonExpense', deptId, 1, 10)
      //     }
      //   }
      // },
      // currentIndex:{
      //   handler(){
      //     let deptId = localStorage.getItem('deptId')
      //     if (this.currentIndex === 0) {
      //       if (this.billList.length < 1) {
      //         this.loadData(this.userId, this.companyId, 'PersonExpense', deptId, 1, 10)
      //       }
      //     }
      //   },
      //   immediate:true
      // }
      // userId:{
      //   handler(){
      //     let deptId = localStorage.getItem('deptId')
      //     this.loadData(this.userId, this.companyId, 'PersonExpense', deptId, 1, 10)
      //   },
      //   // immediate:true
      // },
      selectedInvoice:{
        handler(){
          this.$nextTick(() => {
            if (!this.scroll1) {
              this.scroll1 = new BScroll(this.$refs.wrapper1, {
                click: true,
              })
              console.log(this.scroll1)
            } else {
              this.scroll1.refresh()
            }
          })
        },
      },
    }
  }
</script>

<style scoped lang="scss">
    .panel {
        position: fixed;
        bottom: 0;
        /*left: 0;*/
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 80%);
        &.active{
            position: fixed;
            bottom: -100%;
        }
        > .wrap {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 80%;
            background: #f2f6f9;
            border-top-left-radius: 0.06rem;
            border-top-right-radius: 0.06rem;
            &.active{
                position: fixed;
                bottom: -100%;
            }
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
                padding: 0.08rem 0.04rem 0.04rem 0;
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
                        padding: 0.08rem;
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
                .change-btn {
                    /*margin: 0 auto;*/
                    margin-top: 0.1rem;
                    margin-bottom: 0.1rem;
                    display: inline-block;
                    border: 1px solid #fff;
                    border-radius: 0.32rem/50%;
                    font-size: 0;
                    background-color: #fff;
                    span {
                        display: inline-block;
                        width: 4em;
                        padding: 0.12rem 0.12rem;
                        border-radius: 0.2rem/50%;
                        font-size: 0.14rem;
                        color: #367be7;
                        background-color: #fff;
                        &.nav_active {
                            background: #367be7;
                            color: #fff;
                        }
                    }
                }
                .swiper-container {
                    height: calc(100% - 0.6rem);
                    .swiper-wrapper {
                        height: 100%;
                        .swiper-slide {
                            height: 100%;
                            padding-bottom: 0.08rem;
                            .list-wrap {
                                height: calc(100% - 0.5rem);
                                overflow: hidden;
                                .tips{
                                    text-align: center;
                                    font-size:0.10rem;
                                    color:#bcc7d2;
                                }
                                .list {
                                    .item {
                                        margin-bottom: 0.1rem;
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
                                                &.active {
                                                    background: url("../../assets/selected.png") no-repeat;
                                                    background-size: contain;
                                                }
                                            }
                                        }
                                        > .right {
                                            padding: 0 0.14rem 0 0.14rem;
                                            /*margin: 0.12rem;*/
                                            background: url(../../assets/invoice-small.png) no-repeat;
                                            background-size: cover;
                                            /*flex: 1;*/
                                            width: 2.9rem;
                                            > .head {
                                                height: 0.4rem;
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: center;
                                                > .left {
                                                    font-size: 0.14rem;
                                                    color: #000000;
                                                }
                                                > .shortname{
                                                    font-size: 0.14rem;
                                                    color: #000000;
                                                }
                                                > .right {
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
                                            > .body {
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: flex-start;
                                                height: 0.85rem;
                                                .row {
                                                    padding-top: 0.1rem;
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                    /*height: 0.22rem;*/
                                                    .left {
                                                        display: flex;
                                                        justify-content: flex-start;
                                                        align-items: flex-start;
                                                        span:first-child {
                                                            font-size: 0.13rem;
                                                            color: #808081;
                                                            min-width: 5em;
                                                        }
                                                        span:last-child {
                                                            font-size: 0.13rem;
                                                            color: #181818;
                                                            text-align: left;
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
                            }
                            &.alternative {
                                .list {
                                    .item {
                                        > .left {
                                            width: 0.2rem;
                                            height: 0.2rem;
                                            border: 1px solid #367be7;
                                            border-radius: 50%;
                                            .icon {
                                                display: inline-block;
                                                width: 0.2rem;
                                                height: 0.2rem;
                                                background: none;

                                            }
                                            &.active {
                                                border: 0;
                                                .icon {
                                                    background: url("../../assets/selected.png") no-repeat;
                                                    background-size: contain;
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
            }
        }
    }


</style>