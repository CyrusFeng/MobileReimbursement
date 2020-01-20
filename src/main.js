// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import rem from './rem'
import './reset.css'

import $d from './devices.js'

Vue.config.devtools = true


let isReset = true;//是否归位
let h = document.documentElement.clientHeight || document.body.clientHeight;
var _focusElem = null; //输入框焦点
if ($d.device() === 'ios') {
  // alert('ios in')
  document.body.addEventListener('focusin', (e) => {
    //软键盘弹出的事件处理
    isReset = false;
    // document.body.scrollTop = h - e.target.getBoundingClientRect().bottom + 400
    // console.log(e.target.getBoundingClientRect())
    // console.log(e.target.offsetTop)
    // console.log(e.target.getBoundingClientRect())
    // window.scroll(0, h - e.target.getBoundingClientRect().bottom + 600)
    // alert('ios in in')
    // console.log(h - e.target.getBoundingClientRect().bottom)
    // console.log(h - e.target.getBoundingClientRect().bottom + 400)
    // e.target.style.marginBottom = '100px'
    // document.body.style.position = 'absolute'
    // document.body.style.transform = 'translateY(-300px);'
    // setTimeout(()=>{
    //   alert(11111)
    //   document.querySelector('#body').scrollTop(200);
    //   window.scroll(0, 600);
    //   e.target.scrollIntoView(true);
    //   document.body.scrollTop = h - e.target.getBoundingClientRect().bottom + 400
    //
    //   e.target.scrollIntoView(true);
    //
    //   e.target.scrollIntoViewIfNeeded();
    // }, 500);

    // document.body.scrollTop = document.body.scrollOffset;
    // setTimeout(function(){
    //   document.body.scrollTop = document.body.scrollHeight;
    // },300);

    // _focusElem = e.target || e.srcElement;
    // _focusElem.scrollIntoView(false);

    // if (_focusElem && document.body.clientHeight < clientHeight) {
    //   //焦点元素滚动到可视范围的底部(false为底部)
    //   _focusElem.scrollIntoView(false);
    // }
  });
  document.body.addEventListener('focusout', () => {
    //软键盘收起的事件处理
    isReset = true;
    setTimeout(() => {
      //当焦点在弹出层的输入框之间切换时先不归位
      if (isReset) {
        window.scroll(0, 0);//失焦后强制让页面归位
      }
    }, 300);
  });
}
else if ($d.device() === 'android') {
  // alert('android in')

  window.onresize = function () {
    // alert(22)
    //键盘弹起与隐藏都会引起窗口的高度发生变化
    let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < h) {
      //当软键盘弹起，在此处操作
      // alert(1)
      isReset = false;
      setTimeout(function () {
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    } else {
      //当软键盘收起，在此处操作
      isReset = true;
      setTimeout(() => {
        if (isReset) {
          window.scroll(0, 0);//失焦后强制让页面归位
        }
      }, 300);
    }
  }
}
// import sino from './sinochem.des1'

rem()
Vue.config.productionTip = false
Vue.prototype.$remove = function (arr, val) {
  if (val instanceof Object && val.id) {
    let index = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == val.id) index = i;
    }
    arr.splice(index, 1);
  }
  return arr
}
Vue.prototype.$controlLength = function (str, len) {
  if (str) {
    return str.length > 6 ? str.slice(0, len) + '...' : str
  }
}


let urlOptions = {
  // domain: '172.16.105.187',
  domain: '172.16.124.182',
  // domain:'10.6.21.29',
  // domain:'211.94.93.205',
  // port:'8081',
  port: '8080',
}
Vue.prototype.$url = `http://${urlOptions.domain}:${urlOptions.port}/jmapp/intf`
// Vue.prototype.$url = `/jmapp/intf`


// function accDiv(arg1, arg2) {
//   var t1 = 0,
//     t2 = 0,
//     r1, r2;
//   try {
//     t1 = arg1.toString().split(".")[1].length
//   } catch(e) {}
//   try {
//     t2 = arg2.toString().split(".")[1].length
//   } catch(e) {}
//   with(Math) {
//     r1 = Number(arg1.toString().replace(".", ""));
//     r2 = Number(arg2.toString().replace(".", ""));
//     return (r1 / r2) * pow(10, t2 - t1);
//   }
// }
/*给Number类型增加一个方法，调用起来更加方便。*/
// Number.prototype.div = function(arg) {
//   return accDiv(this, arg);
// }
// function accMul(arg1, arg2) {
//   var m = 0,
//     s1 = arg1.toString(),
//     s2 = arg2.toString();
//   try {
//     m += s1.split(".")[1].length
//   } catch(e) {}
//   try {
//     m += s2.split(".")[1].length
//   } catch(e) {}
//   return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
// }
// Number.prototype.mul = function(arg) {
//   return accMul(arg, this);
// }

let ua= window.navigator.userAgent.toLowerCase();
if( (ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork') ){
  // alert("企业微信客户端");
  store.commit('setUA',1)
}else {
  // alert("非微信客户端");
  store.commit('setUA',0)

}

function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch(e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch(e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
Number.prototype.add = function(arg) {
  return accAdd(arg, this);
}


Vue.prototype.$accAdd = function (arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch(e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch(e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



