<template>
    <div class="loading" v-if="loading">
        <img src="../assets/loading-bottom.gif" alt="">
    </div>
</template>

<script>
  export default {
    name: "fullPageLoading",
    props:{
      loading:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped lang="scss">
.loading{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    img{
        margin: 0 0.08rem;
        width: 0.25rem;
        height: 0.25rem;
    }
}
</style>