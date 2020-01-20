<template>
    <div class="select-wrapper">
        <span v-if="selectedHotel.length<=0">{{chooseHotelVisible||(hotelList.length>0?'请点击选择':'暂无数据')}}</span>
        <span v-if="selectedHotel.length>0">{{selectedHotel[0].name}}</span>
        <!--<div class="select-block">-->
            <!--<i class="triangle-down" v-if="orgRange.length>0"></i>-->
            <!--<select v-model="itemObj" @change="send">-->
                <!--&lt;!&ndash;<option value="">无</option>&ndash;&gt;-->
                <!--<option :value="item" v-for="item in orgRange">-->
                    <!--<span>{{item.name}}</span>-->
                    <!--<span v-if="item.accountView">{{item.accountView.number}}</span>-->
                    <!--<span v-if="item.number">{{item.number}}</span>-->
                <!--</option>-->
            <!--</select>-->
        <!--</div>-->

        <div class="body" v-show="chooseHotelVisible" @click.stop ref="body">
            <!--<div class="placeholder" :class="{'hiddenNav':$store.state.UA===1}"></div>-->
            <div class="list-wrap" ref="wrapper" :class="{'hiddenNav':$store.state.UA===1}">
                <div class="list">
                    <div class="item" v-for="item in hotelList" :key="item.id" @click="addToSelectedList(item)">
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
    name: "JMSelectHotel",
    props: {
      chooseHotelVisible: {
        type: Boolean
      },
    },
    data() {
      return {
        hotelList:[],
        selectedHotel:[]
      }
    },
    watch:{
      chooseHotelVisible(){
        console.log('chooseHotelVisible changed')
        console.log(this.chooseHotelVisible)
      }
    },
    mounted(){
      // axios.get(this.$url, {
      axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getHotelInfo', {
        params: {
          path: 'getTogetherInfo',
          // userId: this.userId,
          // deptId: this.deptId
        }
      })
        .then((response) => {
          console.log(response.data)
          console.log(response.data.data)
          this.hotelList = response.data.data.data
          console.log(this.hotelList)
          this.hotelList.forEach((item) => {
            this.$set(item, 'selected', false)
          })
          this.$nextTick(()=>{
            // if (!this.scroll) {
            //   this.scroll = new BScroll(this.$refs.wrapper, {
            //     click: false,
            //   })
            //   console.log(this.scroll)
            // } else {
            //   this.scroll.refresh()
            // }

            // document.body.appendChild(this.$refs.body)

          })

          // document.getElementById('add').appendChild(this.$refs.body)

        })
        .catch((error) => {
          console.log(error)
        })
    },
    methods:{
      // send(){
      //   console.log(this.defaultkey)
      //   this.$emit('update:itemObj',JSON.parse(JSON.stringify(this.itemObj)))
      //   this.$emit('change',JSON.parse(JSON.stringify(this.itemObj)))
      // }
      addToSelectedList(item) {
        console.log('xxxx')
        this.$emit('update:chooseHotelVisible', false)

        if(item.selected === false){
          item.selected = true
        }
        this.hotelList.forEach((hotelObj)=>{
          if(hotelObj.id !== item.id){
            hotelObj.selected = false
          }
        })
        this.selectedHotel.length = 0
        this.selectedHotel.push(item)
      },
      sendTo() {
        this.$emit('update:selectedHotel', this.selectedHotel)
        this.$emit('update:chooseHotelVisible', false)
        let a = "移动端vue单页应用，在页面中使用了better-scroll，这个页面是一个单据的新增页面，分为单头和分录，分录可以动态增加，" +
          "每个分录都要求可以单选协议酒店，因为每个分录选择协议酒店后都要保存已选的数据，所以我设计这个单选组件的用法就是写在循环里，可以被动态添加。" +
          "这个组件的弹出层要占满整个页面，所以我在弹出层上用了position:fixed。不过问题出现了，在better-scroll的作用下，" +
          "容器上被添加了transform:translate" +
          "而子元素的position:fixed在发现父元素上有一层用了transform:translate，" +
          "就不会相对视口定位，而是相对这个有transform:translate属性的元素定位，" +
          "如果这个元素被滚动了，那么弹出层就显示不完整" +
          "请问一下您，这个问题有什么解决思路吗，还是说我的组件不应该设计成"
      }
    }
  }
</script>

<style lang="scss" scoped>
    .select-wrapper {
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
        .body-wrap{
            transform: translate(0,0);
        }



    }
    .body{
        position: fixed;
        top: 0;
        left: 0;
        /*bottom: 0;*/
        z-index: 1111;
        width: 100%;
        background: #fff;
        height: 100%;
        .placeholder{
            height: 0.88rem;
            &.hiddenNav{
                height: 0.44rem;
            }
        }
        /*&.hiddenNav{*/
        /*top: 0.44rem;*/
        /*}*/
        .title {
            margin-left: 0.1rem;
            padding-top: 0.1rem;
            padding-bottom: 0.16rem;
            font-size: 0.15rem;
            color: #000000;
        }
        .list-wrap{
            /*height: calc(100% - 0.88rem);*/
            height: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
            /*&.hiddenNav{*/
                /*height: calc(100% - 0.44rem);*/
            /*}*/
            .list{
                /*height: calc(100% + 1px);*/
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
                            background: url("../assets/selected.png") no-repeat;
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
        }
    }
</style>