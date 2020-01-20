<template>
    <div>
        <GoBack v-if="$store.state.UA !== 1">首页</GoBack>
        <div class="header">
            <div class="block_user_pic">
                <img :src="image" v-if="image !== 'data:image/jpeg;base64,' &&  image !== ''">
                <img src="../assets/defaultAvator.png" v-else>
            </div>
            <p class="user_name">
                {{personData.name || '金茂员工'}}
            </p>
            <p class="user_org">
                {{selectedName||'中国金茂控股集团有限公司'}}
            </p>
            <!--<a href="javascript:void(0)" onclick="" class="user_orgchange"></a>-->

            <div class="user_orgchange">
                <select v-model="companyId">
                <option :value="item.id" v-for="item in FIENTITYRange">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="body">
            <!--<div class="enter enter-ygbx">-->
            <!--<p>员工报销</p>-->
            <!--</div>-->
            <router-link :to="{name:'list',params:{userId,companyId,name:'PersonExpense',billStatus:'SUBMIT'}}"
                         class="enter enter-ygbx" tag="div">
                <p>员工报销</p>
            </router-link>
            <router-link :to="{name:'travelApplyList',params:{userId,companyId,name:'TravelApply',billStatus:'SUBMIT'}}"
                         class="enter enter-ccsq" tag="div">
                <p>出差申请</p>
            </router-link>
            <router-link
                    :to="{name:'travelAccountList',params:{userId,companyId,name:'TravelAccount',billStatus:'SUBMIT'}}"
                    class="enter enter-clbx" tag="div">
                <p>差旅报销</p>
            </router-link>
            <router-link :to="{name:'creditScore',params:{userId,companyId}}" class="enter enter-xydj" tag="div">
                <p>信用等级</p>
            </router-link>
            <router-link :to="{name:'add',params:{name:'TravelApply',userId,companyId}}" tag="div" class="add">
                <!--<i class="icon"></i>-->
            </router-link>
            <!--<a href="alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Fwww.baidu.com%2F" class="add"></a>-->
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import sino from '../sinochem.des1'
  import Upload from './upload'
  import GoBack from './goBack'

  export default {
    name: "index",
    components: {
      Upload,
      GoBack
    },
    data() {
      return {
        selectedName: '',
        emailEncrypted: '',
        emailDecode: '',
        personData: {},
        imageBase: 'data:image/jpeg;base64,',
        image: '',
        userId: '',
        companyId: '',
        FIENTITYRange: [],
        code:''
      }
    },
    created() {
      console.log('this.$route.query.email',this.$route.query.email)
      if (this.$route.query.email) {
        this.emailEncrypted = this.$route.query.email
        // console.log("this.email", this.emailEncrypted)
        this.emailDecode = this.decryptText(this.emailEncrypted)
        // console.log(this.jiami1("houweigao"))
        console.log(this.jiami1("wangweihan"))
        // console.log(this.jiami2("houweigao"))
        // console.log(this.jiami2("wangweihan"))
        console.log(this.jiami1("sun_guodong"))
        // console.log(this.jiami2("sun_guodong"))
        console.log('---------')
        console.log(this.jiami2("wenguoquan"))

        axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getUser', {  //?path=getUserDataByMail&mail=fengyanjing%40sinochem.com
        // axios.get(this.$url, {
          params: {
            path: 'getUserDataByMail',
            mail: this.emailDecode
            // mail:'fengyanjing%40sinochem.com'
          }
        })
          .then((response) => {
            console.log(response.data)
            if(response.data.data.success === false || response.data.result === 'failed'){
              alert('网络有点问题，没有获取到数据，请您稍后重试')
            }
            else{
              this.personData = response.data.data.data[0]
              if (JSON.stringify(this.personData.image) !== '{}') {
                this.image = this.imageBase + this.personData.image.image
              }

              // localStorage.setItem('image', this.personData.image.image)
              localStorage.setItem('image', this.image)
              // this.userId = encodeURIComponent(this.personData.id)
              // this.companyId = encodeURIComponent(this.personData.deftCompany.id)
              this.userId = this.personData.id
              this.companyId = this.personData.deftCompany.id

              this.$store.commit('setUserId',this.userId)
              localStorage.setItem('companyId', this.companyId)

              this.selectedName = this.personData.deftCompany.name

              localStorage.setItem('applicantName', this.personData.name)

              //获取财务公司实体
              axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getOrgRangeFIENTITYNew', {
              // axios.get(this.$url, {
                params: {
                  path: 'getOrgRange',
                  orgType: 'FIENTITY',
                  dataType: 'ID',
                  data: this.userId,
                  companyId: this.companyId
                }
              })
                .then((response) => {
                  console.log(response.data.data.data)
                  this.FIENTITYRange = response.data.data.data
                }).catch((error) => {

              })
            }

          })
          .catch((error) => {
            alert('获取信息失败，请重试')
          })
      }
      else if(this.$route.query.code){

        this.code = 'code_'+this.$route.query.code
        axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getUser', {
        // axios.get(this.$url, {
          params: {
            path: 'getUserDataByMail',
            mail: this.code
            // mail:'fengyanjing%40sinochem.com'
          }
        })
          .then((response) => {
            console.log(response.data)
            if(response.data.data.success === false || response.data.result === 'failed'){
              alert('网络有点问题，没有获取到数据，请您稍后重试')
            }else{
              this.personData = response.data.data.data[0]
              if (JSON.stringify(this.personData.image) !== '{}') {
                this.image = this.imageBase + this.personData.image.image
              }

              // localStorage.setItem('image', this.personData.image.image)
              localStorage.setItem('image', this.image)
              // this.userId = encodeURIComponent(this.personData.id)
              // this.companyId = encdeURIComponent(this.personData.deftCompany.id)
              this.userId = this.personData.id
              this.companyId = this.personData.deftCompany.id
              localStorage.setItem('companyId', this.companyId)

              this.selectedName = this.personData.deftCompany.name

              localStorage.setItem('applicantName', this.personData.name)

              //获取财务公司实体
              // axios.get(this.$url, {
              axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getOrgRangeFIENTITY', {
                params: {
                  path: 'getOrgRange',
                  orgType: 'FIENTITY',
                  dataType: 'ID',
                  data: this.userId,
                  companyId: this.companyId
                }
              })
                .then((response) => {
                  console.log(response.data.data.data)
                  this.FIENTITYRange = response.data.data.data
                }).catch((error) => {

              })
            }

          })
          .catch((error) => {
            alert('获取信息失败，请重试')
          })
      }
    },
    methods: {
      //解密url中的邮箱参数方法
      decryptText(text) {
        var str = text;
        var key1 = "HCxI2sag";//测试
        // var key1 = "qHJjp06X";//正式
        var key2 = "ecology";
        var key3 = "sinochem";
        var enResult = sino.strDec(str, key1, key2, key3);
        return enResult + '@sinochem.com';
      },
      //正式
      jiami1(email){
        return sino.strEnc(email,"qHJjp06X","ecology","sinochem")
      },
      //测试
      jiami2(email){
        return sino.strEnc(email,"HCxI2sag","ecology","sinochem")
      }
    },
    watch: {
      companyId() {
        console.log(this.companyId)
        this.FIENTITYRange.forEach((item) => {
          if (this.companyId === item.id) {
            localStorage.setItem('companyId', this.companyId)
            this.selectedName = item.name
          }
        })
      }
    }
  }
</script>

<style scoped>
    html {
        font-size: 100px;
        font-family: PingFangSC-Regular;
        background-color: #f2f6f9
    }

    .header {
        /*height: 1.32rem;*/
        width: 100%;
        display: flex;
        flex-flow: column;
        background-image: linear-gradient(-135deg, #488cf8 0%, #367be7 100%);
        align-items: center;

    }

    .header .block_user_pic {
        width: 0.58rem;
        height: 0.58rem;
        overflow: hidden;
        border-radius: 50%;
        margin-top: 0.15rem;
    }

    .header img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .header .user_name {
        font-size: 0.15rem;
        color: #fff;
        margin-top: 0.08rem;
        line-height: 0.2rem;
        font-family: PingFangSC-Regular;
        letter-spacing: -0.36px;
    }

    .header .user_org {
        font-size: 0.12rem;
        color: #fff;
        line-height: 0.17rem;
        margin-top: 0.08rem;
        padding-bottom: 0.38rem;
        font-family: PingFangSC-Regular;
        letter-spacing: -0.36px;
    }

    .header .user_orgchange {
        background-image: url(../assets/duorenyuan-.png);
        background-color: #599bff;
        width: 0.54rem;
        height: 0.38rem;
        border-top-left-radius: 0.19rem;
        border-bottom-left-radius: 0.19rem;
        background-repeat: no-repeat;
        background-size: 0.19rem;
        background-position: center;
        position: absolute;
        right: 0;
        top: 0.55rem;
    }

    .header .user_orgchange select {
        font-size: 0.16rem;
        position: absolute;
        top: 50%;
        right: 0;
        /*transform: translate(-50%, -50%);*/
        transform: translateY(-50%);
        opacity: 0;
        width: 100%;
    }

    .body {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: center;
        background-color: transparent;

    }

    .body .enter {
        width: 93.6%;
        height: 0.64rem;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 #e3eef5;
        border-radius: 0.09rem;
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        margin-bottom: 0.17rem;
    }

    .enter-ygbx p {
        background-image: url(../assets/renyuan.png)
    }

    .enter-ccsq p {
        background-image: url(../assets/chuchai.png);
        background-size: 0.18rem 0.22rem !important;
    }

    .enter-clbx p {
        background-image: url(../assets/chalv.png)
    }

    .enter-xydj p {
        background-image: url(../assets/xinyongdengjichayan.png)
    }

    .body .enter:first-child {
        margin-top: -0.26rem;
    }

    .enter p {
        color: #3f3f3f;
        letter-spacing: -0.36px;
        text-align: center;
        font-size: 0.15rem;
        line-height: 0.22rem;
        background-size: 0.22rem;
        background-position: left;
        background-repeat: no-repeat;
        display: block;
        width: auto;
        text-indent: 0.3rem;
    }

    .body .add {
        display: block;
        width: 0.78rem;
        height: 0.78rem;
        border-radius: 100%;
        background-image: url(../assets/add.png);
        background-color: #599bff;
        box-shadow: 0 2px 2px 0 #e9f2f8;
        background-size: 0.22rem;
        margin-top: 0.15rem;
        background-position: center;
        background-repeat: no-repeat
    }
</style>