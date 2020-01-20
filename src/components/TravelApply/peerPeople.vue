<template>
    <div class="wrap" v-show="peerPeopleVisible">
        <div class="head">
            <div class="left">
                <span>已选{{selectedPeerPeopleListChild.length}}人</span>
                <span>(多选)</span>
            </div>
            <div class="right" @click.stop="sendTo">
                <span>确定</span>
            </div>
        </div>
        <div class="body">
            <div class="title">部门成员</div>
            <div class="list-wrap" ref="wrapper">
                <div class="list">
                    <div class="item" v-for="item in peerPeopleList" :key="item.id" @click="addToSelectedList(item)">
                        <div class="left" :class="{'active':item.selected}">
                            <i class="icon"></i>
                        </div>
                        <div class="right">
                            <div class="top">
                                <span>{{item.name}}</span>
                                <!--<span>{{item.number}}</span>-->
                            </div>
                            <div class="bottom">
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'

  export default {
    name: "peerPeople",
    props: {
      peerPeopleVisible: {
        type: Boolean
      },
      userId: {
        type: String
      },
      deptId: {
        type: String
      },
      selectedPeerPeopleList:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
        peerPeopleList: [],
        selectedPeerPeopleListChild: [],
        scroll: null
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //
    //     if (from.path === '/add' || from.path === '/' || from.path === '/index') {
    //       vm.userId = vm.$route.params.userId
    //       vm.deptId = vm.$route.params.deptId
    //
    //       localStorage.setItem('userId', vm.userId)
    //       localStorage.setItem('deptId', vm.deptId)
    //     } else {
    //       vm.userId = localStorage.getItem('userId')
    //       vm.deptId = localStorage.getItem('deptId')
    //     }
    //
    //     axios.get(this.$url, {
    //       params: {
    //         path: 'getTogetherInfo',
    //         userId: vm.userId,
    //         deptId: vm.deptId
    //       }
    //     })
    //       .then((response) => {
    //         console.log(response.data)
    //         console.log(response.data.data)
    //         vm.peerPeopleList = response.data.data.data
    //         console.log(vm.peerPeopleList)
    //         vm.peerPeopleList.forEach((item) => {
    //           vm.$set(item, 'selected', false)
    //         })
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   })
    // },
    mounted() {
      // axios.get(this.$url, {
      axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getTogetherInfoNew', {
        params: {
          path: 'getTogetherInfo',
          userId: this.userId,
          deptId: this.deptId
        }
      })
        .then((response) => {
          console.log(response.data)
          console.log(response.data.data)
          this.peerPeopleList = response.data.data.data
          console.log(this.peerPeopleList)
          this.peerPeopleList.forEach((item) => {
            this.$set(item, 'selected', false)
          })
          // this.$nextTick(()=>{
          //   if (!this.scroll) {
          //     this.scroll = new BScroll(this.$refs.wrapper, {
          //       // click: true,
          //     })
          //     console.log(this.scroll)
          //   } else {
          //     this.scroll.refresh()
          //   }
          // })
          this.peerPeopleList.forEach((item1)=>{
            this.selectedPeerPeopleList.forEach((item2)=>{
              if (item1.id === item2.id) {
                item1.selected = true
              }
            })
          })
          this.selectedPeerPeopleListChild = JSON.parse(JSON.stringify(this.selectedPeerPeopleList))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updated(){
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     console.log('this.$refs.wrapper', this.$refs.wrapper)
      //     if (!this.scroll) {
      //       this.scroll = new BScroll(this.$refs.wrapper, {
      //         click: true,
      //         pullUpLoad: {
      //           threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
      //         }
      //       })
      //     } else {
      //       this.scroll.refresh()
      //     }
      //   }, 0)
      //
      // })
    },
    methods: {
      addToSelectedList(item) {
        item.selected = !item.selected
        console.log(item.selected)
        if (item.selected) {
          this.selectedPeerPeopleListChild.push(item)
        } else {
          this.selectedPeerPeopleListChild.splice(this.selectedPeerPeopleListChild.indexOf(item), 1)
        }
      },
      sendTo() {

        this.$emit('update:selectedPeerPeopleList', this.selectedPeerPeopleListChild)
        this.$emit('update:peerPeopleVisible', false)
      }
    },
    watch:{
      peerPeopleVisible(){
        //组件显示后刷新scroll
        if(this.peerPeopleVisible){
          this.$nextTick(()=>{
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
              })
              console.log(this.scroll)
            } else {
              this.scroll.refresh()
            }
          })
        }
      },
      selectedPeerPeopleList:{
        handler(){
          this.peerPeopleList.forEach((item1)=>{
              this.selectedPeerPeopleListChild.forEach((item2)=>{
                if (item1.id === item2.id) {
                  item1.selected = true
                }
              })
          })
        },
        deep:true,
        immediate:true
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        /*bottom: 0;*/
        z-index: 1111;
        width: 100%;
        background: #fff;
        height: 100%;
    }

    .head {
        padding-top: 0.16rem;
        padding-bottom: 0.16rem;
        padding-right: 0.12rem;
        margin-left: 0.12rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        .left {
            span:first-child {
                font-size: 0.15rem;
                color: #6e6e6e;
            }
            span:last-child {
                font-size: 0.13rem;
                color: #6e6e6e;
            }
        }
        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #599bff;

            border-radius: 0.165rem;
            width: 0.6rem;
            height: 0.28rem;
            font-size: 0.14rem;
            color: #ffffff;
        }
    }

    .body {
        height: calc(100% - 0.61rem);
        .title {
            margin-left: 0.1rem;
            padding-top: 0.1rem;
            padding-bottom: 0.16rem;
            font-size: 0.15rem;
            color: #000000;
        }
        .list-wrap{
            /*height: calc(100% - 1.49rem);*/
            height: calc(100% - 0.41rem);
            overflow: hidden;
        }
    }

    .item {
        padding-top: 0.08rem;
        padding-bottom: 0.12rem;
        margin-right: 0.1rem;
        margin-left: 0.1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        .left {
            margin-right: 0.1rem;
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
        .right {
            flex: 1;
            .top {
                padding-bottom: 0.06rem;
                span:first-child {
                    padding-right: 0.04rem;
                    font-size: 0.15rem;
                    color: #000000;
                }
                span:last-child {
                    font-size: 0.13rem;
                    color: #6e6e6e;
                }
            }
            .bottom {
                span {
                    font-size: 0.13rem;
                    color: #6e6e6e;
                }
            }
        }
    }

</style>