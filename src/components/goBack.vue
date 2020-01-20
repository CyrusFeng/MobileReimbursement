<template>
    <div class="back">
        <div class="back-btn-wrap">
            <i class="icon" @click="back"></i>
        </div>
        <div class="title">
            <slot></slot>
        </div>
        <div class="refresh-btn-wrap" @click="close">
            <i class="icon" @click="close"></i>
            <!--<span>关闭</span>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: "goBack",
    methods: {
      back() {
        window.history.back(-1);
      },
      reflashPage() {
        this.$router.push({ name: 'blankPage' })
        this.$router.go(-1);
      },
      reload() {
        location.reload()
      },
      close(){
        // if( typeof uexWindow == 'undefined'){
        //
        // }
        uexWindow.evaluateScript('','0','goBack()')
      },
    }
  }
</script>
<!--background-image: linear-gradient(-131deg, #3d81eb 0%, #367be7 100%);-->
<style scoped lang="scss">
    .back {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #214387;
        width: 100%;
        height: 0.44rem;
        .back-btn-wrap {
            padding: 0.13rem 0.16rem 0.1rem 0.16rem;
            .icon {
                display: inline-block;
                width: 0.12rem;
                height: 0.21rem;
                background: url("../assets/back.png") no-repeat;
                background-size: contain;
            }
        }
        .refresh-btn-wrap {
            padding-right: 0.16rem;
            /*padding: 0.13rem 0.16rem 0.1rem 0.16rem;*/
            /*visibility: hidden;*/
            .icon {
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                background: url("../assets/close.png") no-repeat;
                background-size: contain;
            }
            span{
                font-size:0.17rem;
                color:#ffffff;
            }
        }
        .title {
            font-size: 0.17rem;
            color: #ffffff;
        }
    }
</style>
