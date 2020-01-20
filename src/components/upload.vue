<template>
    <div class="wrap">
        <div @click="onClickUpload" class="submit">
            <div class="style">
                <i class="icon"></i>
                <slot></slot>
            </div>
        </div>
        <div ref="temp" class="hidden"></div>
        <!--<form id="form"-->
        <!--action="http://localhost:3000/upload"-->
        <!--method="post"-->
        <!--enctype="multipart/form-data"-->
        <!--@submit="submit">-->
        <!--<input type="file" name="JMFile">-->
        <!--<input type="submit" value="提交">-->
        <!--</form>-->
        <ol>
            <li v-for="item in fileList" :key="item.id">
                <div class="item-wrap">
                    <div class="loading" v-if="item.status === 0">
                        <i class="icon"></i>
                    </div>
                    <div class="img-wrap" v-if="item.status === 1">
                        <img :src="item.url" v-if="item.type.substring(0,item.type.indexOf('/')) === 'image'">
                        <img src="../assets/zanwushuju.png" v-else>
                        <i class="icon" @click="doRemove(item)"></i>
                    </div>
                    <div class="desc" v-if="item.status === 1">
                        <span>{{item.name}}</span>
                        <span>{{item.type}}</span>
                        <span>{{item.size}}</span>
                    </div>
                </div>
                <!--<div class="item-wrap">-->
                <!--<div class="img-wrap" v-if="item.type.substring(0,item.type.indexOf('/')) !== 'image'">-->
                <!--<img :src="item.url">-->
                <!--<i class="icon" @click="doRemove(item)" v-if="!flag"></i>-->
                <!--</div>-->
                <!--<div class="desc">-->
                <!--<span>{{item.name}}</span>-->
                <!--<span>{{item.type}}</span>-->
                <!--<span>{{item.size}}</span>-->
                <!--</div>-->
                <!--</div>-->
            </li>
        </ol>
    </div>
</template>

<script>
  export default {
    name: "upload",
    props: {
      method: {},
      action: {},
      name: {},
      type: {},
      fileList: {
        type: Array,
        default: () => []
      }
      // parseResponse(){
      //   return {
      //     type:Function
      //   }
      // }
    },
    data() {
      return {
        url: '',
        inputFileData: []
      }
    },
    watch: {
      fileList() {
        console.log('watch', this.fileList)
      }
    },
    methods: {
      formatPart(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + this.add0(m) + this.add0(d);
      },
      formatAll(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s);
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      submit($event) {
        $event.preventDefault()
        let formData = new FormData()
        let fileInput = document.querySelector('input[name="JMFile"]')
        // console.log(fileInput)
        // console.log(fileInput.JMFile)
        // console.log(fileInput.file[0])
        formData.append('JMFile', fileInput.files[0]);

        let xhr = new XMLHttpRequest()
        console.log(form.action)
        xhr.open('POST', form.action)
        xhr.onload = () => {

          this.url = JSON.parse(xhr.response).url
          console.log(this.url)
          console.log(this)
        }
        xhr.send(formData)
      },
      onClickUpload() {
        //创建input标签
        let inputDom = document.createElement('input')
        inputDom.type = 'file'
        inputDom.multiple = true
        this.$refs.temp.appendChild(inputDom)

        //监听input的change事件
        inputDom.addEventListener('change', () => {

          let localFiles = inputDom.files

          for (let i = 0; i < localFiles.length; i++) {
            console.log(localFiles[i])
            let { name, type, size } = localFiles[i]
            // localFiles[i].name = `M${this.formatPart(Date.nows)}${Math.floor(Math.random() * 100000000)}_${this.formatAll(Date.now)}`
            // M${formatPart(Date.now)}${Math.floor(Math.random()*100000000)}_${formatAll(Date.now)}

            // 防止本地文件与已上传的文件重名
            let j = 1
            while (this.fileList.filter((item) => item.name === name).length > 0) {

              let dotindex = name.indexOf('.')

              let firstHalf = name.substring(0, dotindex)
              let secondHalf = name.substring(dotindex)
              let num = `(${j})`
              name = firstHalf + num + secondHalf
              j++
            }


            //给本地文件增加status属性，并且暂时将本地文件放入已上传文件列表中，
            //获取到已上传的文件后,再将这个文件替换掉，目的是通过status字段显示正在上传的状态
            //注：此时的name可能是一个新的name
            // console.log('父组件给子组件传的数组（开始）',JSON.stringify(this.fileList))
            setTimeout(() => {
              this.$emit('update:fileList', [...this.fileList, { name, type, size, status: 0 }])
            }, 0)


            let formData = new FormData()
            formData.append(this.name, localFiles[i])

            // ajax上传本地文件到服务器
            let xhr = new XMLHttpRequest()
            xhr.open(this.method, this.action + '?type=' + this.type)
            xhr.onload = () => {
              // console.log('-------------------')
              // console.log(xhr.response)
              let backFile = JSON.parse(xhr.response)

              // let obj = {}
              // obj.file = backFile.newPath+'/'+backFile.originalname
              // obj.fileName = backFile.originalname.substring(0,backFile.originalname.lastIndexOf('.'))
              // obj.fileType = backFile.originalname.substring(backFile.originalname.lastIndexOf('.')+1,backFile.originalname.length)
              // obj.fileSize = backFile.size
              //
              // setTimeout(()=>{
              //   this.$emit('update:fileParam', obj)
              // },0)

              this.url = `http://10.189.99.43:3000/preview/${backFile.originalname}?type=${this.type}`

              //通过名称找到刚才放进fileList中的本地文件
              // console.log('父组件给子组件传的数组（子组件向父组件发送数据后）',this.fileList)
              let toUpdateFile = this.fileList.filter((item) => item.name === name)[0]

              let index = this.fileList.indexOf(toUpdateFile)
              console.log('-------------------')
              //拷贝一份本地文件对象并增加一些属性
              let copyToUpdateFile = JSON.parse(JSON.stringify(toUpdateFile))
              copyToUpdateFile.url = this.url
              copyToUpdateFile.id = backFile.id
              copyToUpdateFile.status = backFile.status
              copyToUpdateFile.file = backFile.file
              copyToUpdateFile.fileName = backFile.fileName
              copyToUpdateFile.fileType = backFile.fileType
              copyToUpdateFile.fileSize = backFile.fileSize

              console.log('-------------------')
              //拷贝一份已上传文件数组，在该拷贝数组中用新的本地文件对象替换之前的本地文件对象
              let copyFileList = JSON.parse(JSON.stringify(this.fileList))
              copyFileList.splice(index, 1, copyToUpdateFile)
              console.log('-------------------')
              this.$emit('update:fileList', copyFileList)

            }
            xhr.send(formData)

          }


        })
        inputDom.click()
//在页面中移除input标签
        inputDom.remove()
      },
      doRemove(item) {
        let copy = [...this.fileList]
        copy.splice(copy.indexOf(item), 1)
        this.$emit('update:fileList', copy)

        let xhr = new XMLHttpRequest()
        xhr.open('GET', `http://10.189.99.43:3000/delete/${item.name}` + '?type=' + this.type)
        xhr.onload = () => {

        }
        xhr.send()
      }
    }
  }
</script>

<style scoped lang="scss">
    .style {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            background: url("../assets/fileupload.png") no-repeat;
            background-size: contain;
        }
    }

    .wrap {
        padding-top: 0.12rem;
        padding-left: 0.12rem;
        padding-right: 0.12rem;
        position: relative;
    }

    .submit {
        position: absolute;
        /*top: 0.12rem;*/
        top: -0.36rem;
        right: 0.12rem;
        font-size: 0.12rem;
    }

    .hidden {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    ol {
        min-height: 1rem;
        li {
            padding-bottom: 0.08rem;
            .item-wrap {
                padding-left: 0.24rem;
                height: 0.68rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background: #fbfbfc;
                border: 1px solid #c7cbd3;
                .loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 0.47rem;
                    height: 0.47rem;
                    .icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../assets/loading-bottom.gif") no-repeat;
                        background-size: contain;
                    }
                }
                .img-wrap {
                    position: relative;
                    width: 0.47rem;
                    height: 0.47rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        /*width: auto;*/
                        /*height: 100%;*/
                        max-height: 100%;
                        max-width: 100%;
                    }
                    .icon {
                        position: absolute;
                        right: 0;
                        top: 0;
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.14rem;
                        background: url("../assets/remove.png") no-repeat;
                        background-size: contain;
                    }
                }
                .desc {
                    padding-left: 0.12rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    span {
                        font-size: 0.12rem;
                        color: #030303;
                    }
                    span:last-child {
                        font-size: 0.09rem;
                        color: #929292;
                    }
                }
            }
        }
    }


</style>