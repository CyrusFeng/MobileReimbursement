<template>
    <div class="input-wrap">
        <div class="input-block">
            <i class="icon" :class="JSON.parse(selected).className"></i>
            <span v-if="selected">{{JSON.parse(selected).type}}</span>
            <select v-model="JSON.parse(selected)" @change="change($event)">
                <!--<select :value="item.vehicle"-->
                <!--@change="vehicle($event,item)">-->
                <option :value="JSON.stringify(item)"
                        v-for="item in list">
                    <span>{{item.type}}</span>
                </option>
            </select>
            <i class="triangle-down"></i>
        </div>
    </div>
    <!--<div class="input-wrap">-->
        <!--<div class="input-block">-->
            <!--<i class="icon" :class="selected.className"></i>-->
            <!--<span v-if="selected">{{selected}}</span>-->
            <!--<select v-model="selected" @change="change($event)">-->
                <!--&lt;!&ndash;<select :value="item.vehicle"&ndash;&gt;-->
                <!--&lt;!&ndash;@change="vehicle($event,item)">&ndash;&gt;-->
                <!--<option :value="item.type"-->
                        <!--v-for="item in list">-->
                    <!--<span>{{item.type}}</span>-->
                <!--</option>-->
            <!--</select>-->
            <!--<i class="triangle-down"></i>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
  export default {
    name: "JMSelectLittle",
    props: ['vehicle'],
    data() {
      return {
        // list: ['火车票', '飞机', '自驾', '其他'],
        list: [{type:'火车',className:'train'},{type:'飞机',className:'plane'},{type:'自驾',className:'car'},{type:'其他',className:'other'}],
        selected: ''
      }
    },
    created() {

    },
    methods: {
      change($event) {
        this.$emit('update:selected', JSON.parse($event.target.value).type)
        console.log('$event.type',JSON.parse($event.target.value).type)
      }
    },
    watch: {
      vehicle: {
        handler(newValue, oldValue) {
          console.log('newValue', newValue)
          console.log('oldValue', oldValue)
          if (!newValue) {
            this.selected = JSON.stringify(this.list[0])
            this.$emit('update:selected', JSON.parse(this.selected).type)
          }else{
            this.list.forEach((item)=>{
              if (item.type === this.vehicle){
                this.selected = JSON.stringify(item)
              }
            })

          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="scss">
    .input-wrap {
        flex: 1;
        height: 0.2rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .input-block {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 100%;
            span {
                display: inline-flex;
                justify-content: flex-start;
                align-items: flex-end;
                min-width: 10em;
                /*height: 100%;*/
                font-size: 0.14rem;
                color: #333333;
            }
            select {
                flex: 1;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                height: 0.2rem;
                z-index: 11;
                border: 0;
                font-size: 0.14rem;
                background-color: #fff8ec;
                opacity: 0;
                box-sizing: content-box;

                /*padding: 0.06rem 0;*/
                width: calc(100% - 0.12rem);
                /*position: absolute;*/
                /*top: 50%;*/
                transform: translateY(-50%);
                /*left: 0;*/
                /*height: 0.2rem;*/
                /*z-index: 11;*/
                /*border: 0;*/
            }
            .icon{
                margin-right: 0.08rem;
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                background: url("../assets/plane.png") no-repeat;
                background-size: contain;
                &.train{
                    background: url("../assets/train.png") no-repeat;
                    background-size: contain;
                }
                &.plane{
                    background: url("../assets/plane.png") no-repeat;
                    background-size: contain;
                }
                &.car{
                    background: url("../assets/car.png") no-repeat;
                    background-size: contain;
                }
                &.other{
                    background: url("../assets/otherTransport.png") no-repeat;
                    background-size: contain;
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