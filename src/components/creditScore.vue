<template>
    <div class="wrap">
        <GoBack v-if="$store.state.UA !== 1">信用等级</GoBack>
        <div class="head-background"></div>
        <div class="main-wrap">
            <div class="head">
                <div class="avator">
                    <!--<img src="../assets/cuowu.png" alt="">-->
                    <img :src="image" v-if="image !== 'data:image/jpeg;base64,' && image">
                    <img src="../assets/defaultAvator.png" v-else>
                </div>
                <div class="name">{{applicantName}}</div>
            </div>
            <div class="bottom">
                <div class="block">
                    <div class="num">{{creditScore}}</div>
                    <div class="desc">当前信用等级</div>
                </div>
                <div class="block">
                    <div class="num">{{countRow}}</div>
                    <div class="desc">信用足迹次数</div>
                </div>
            </div>
        </div>
        <div class="title">
            <i class="icon"></i>
            <span>信用足迹</span>
        </div>
        <div class="list-wrap" ref="wrapper"  :class="{'hiddenNav':$store.state.UA===1}">
            <ul>
                <li class="item-wrap" v-for="item in list" :key="item.id">
                    <div class="top">
                        <div class="date">{{item.billDate}}</div>
                        <div class="desc">
                            <span>信用积分</span>
                            <span :class="Number(item.score)>0?'green':'gray'">{{item.score}}</span>
                        </div>
                    </div>
                    <div class="body-wrap">


                    </div>
                    <div class="body">
                        <div class="avator">
                            <img :src="image" v-if="image !== 'data:image/jpeg;base64,' &&  image">
                            <img src="../assets/defaultAvator.png" v-else>
                        </div>
                        <div class="content">
                            <div class="row">
                                <span>单据编号：</span>
                                <span>{{item.billNumber}}</span>
                            </div>
                            <div class="row">
                                <span>信用值说明：</span>
                                <span>{{item.remark}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Loading from './Loading'
  import GoBack from './goBack'

  export default {
    name: "creditScore",
    components: {
      Loading,
      GoBack
    },
    data() {
      return {
        list: [],
        scroll: null,
        userId: '',
        companyId: '',
        showLoadingWrap: false,
        showLoadingImg: false,
        creditScore: '',
        countRow: '',
        image: '',
        applicantName: ''
      }
    },
    methods: {
      loadData(userId, companyId, fromRow, toRow) {
        this.showLoadingWrap = true;
        this.showLoadingImg = true
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getCreditInfo', {
          params: {
            path: 'getCreditInfo',
            userId: userId,
            companyId: companyId,
            fromRow: fromRow,
            toRow: toRow,
          }
        })
          .then((response) => {
            console.log(response.data)
            if (response.data.data.data[0].countRow > 0) {
              this.showLoadingWrap = false;
              this.list = response.data.data.data[0].bills.concat(this.list);
              this.creditScore = response.data.data.data[0].creditScore;
              this.countRow = response.data.data.data[0].countRow;

              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true,
                    pullUpLoad: {
                      threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                    }
                  })
                  this.scroll.on('pullingUp', () => {
                    this.loadData(this.userId, this.companyId, fromRow += 10, toRow += 10)
                    this.scroll.finishPullUp()
                    // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                  })
                } else {
                  this.scroll.refresh()
                }
              })
            } else {
              this.showLoadingImg = false
            }

          })
          .catch((error) => {
            this.showLoadingImg = false
          })

      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.applicantName = localStorage.getItem('applicantName')
        if (from.path === '/') {
          vm.image = localStorage.getItem('image')
          console.log('vm.image',vm.image)
          if (vm.$route.params.userId) {
            let { userId, companyId } = vm.$route.params

            vm.userId = userId
            vm.companyId = companyId

            if (vm.userId) {
              localStorage.setItem('userId', vm.userId)
            }
            if (vm.companyId) {
              localStorage.setItem('companyId', vm.companyId)
            }
          } else {
            vm.userId = localStorage.getItem('userId')
            vm.companyId = localStorage.getItem('companyId')
          }
        } else {
          vm.userId = localStorage.getItem('userId')
          vm.companyId = localStorage.getItem('companyId')
        }

        vm.loadData(vm.userId, vm.companyId, 1, 10)
      })
    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        height: 100%;
        background: #f2f6f9;
    }

    .head-background {
        height: 1.2rem;
        background-color: #367be7;
    }

    .main-wrap {
        margin: 0 auto;
        margin-top: -1rem;
        width: 3.5rem;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 #e3eef5;
        border-radius: 4px;
        .head {
            padding-top: 0.3rem;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .avator {
                display: inline-flex;
                width: 0.5rem;
                height: 0.5rem;
                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
            .name {
                padding-top: 0.15rem;
                font-size: 0.18rem;
                color: #333333;
            }

        }
        .bottom {
            padding-bottom: 0.34rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            padding-top: 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .block {
                .num {
                    text-align: center;
                    font-size: 0.28rem;
                    color: #ff832f;
                }
                .desc {
                    padding-top: 0.04rem;
                    font-size: 0.13rem;
                    color: #939393;
                }
            }
        }
    }

    .title {
        padding: 0.1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            display: inline-block;
            width: 0.11rem;
            height: 0.15rem;
            background: url("../assets/foot.png") no-repeat;
            background-size: contain;
        }
        span {
            font-size: 0.15rem;
            color: #494a4a;
        }
    }

    .list-wrap {
        margin: 0 0.12rem;
        /*padding: 0.15rem;*/

        height: calc(100% - 3.21rem);
        /*height: calc(100% - 2.77rem);*/
        /*height: 100%;*/
        overflow: hidden;

        background-color: #f2f6f9;
        /*background-color: #fff;*/
        box-shadow: 0 2px 4px 0 #e3eef5;
        border-radius: 0.04rem;

        &.hiddenNav{
            height: calc(100% - 2.77rem)
        }
        .item-wrap {
            margin-bottom: 0.1rem;
            background-color: #fff;
            overflow: hidden;
            .top {
                padding-left: 0.15rem;
                padding-right: 0.15rem;
                padding-top: 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .desc {
                    font-size: 0.12rem;
                    color: #565656;
                    span{
                        padding-left: 0.04rem;
                        &.green{
                            color:#16b685;
                        }
                        &.gray{
                            color: #999999;
                        }
                    }
                }
                .date {
                    font-size: 0.12rem;
                    color: #565656;
                }
            }
            .body {
                padding-left: 0.1rem;
                padding-top: 0.16rem;
                padding-bottom: 0.16rem;
                margin-top: 0.08rem;
                margin-left: 0.15rem;
                margin-right: 0.15rem;
                margin-bottom: 0.13rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                opacity: 0.85;
                background: #f2f6f9;
                .avator {
                    margin-right: 0.12rem;
                    width: 0.3rem;
                    height: 0.3rem;
                    min-width: 0.3rem;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%
                    }
                }
                .content {
                    .row {
                        margin-bottom: 0.04rem;
                        span:first-child {
                            font-size: 0.12rem;
                            color: #999999;
                        }
                        span:last-child {
                            font-size: 0.12rem;
                            color: #333333;
                            line-height: 1.5;
                        }
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }

            }

        }

    }
</style>