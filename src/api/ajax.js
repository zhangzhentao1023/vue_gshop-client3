/*
一个能发送ajax请求函数
*/
import axios from 'axios'
// const qs = require('qs')
import qs from 'qs'

import store from '../vuex/store'
import router from '../router'


// 请求超时的全局配置
axios.defaults.timeout = 20000 // 20s

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const {method, data} = config
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase() === 'post' && data && typeof data === 'object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }

  //如果浏览器有token，就自动携带上token
  const token = localStorage.getItem('token_key')
  if (token) {
    config.headers.Authorization = 'token ' + token
  }

  return config
})

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => { // 请求异常
  
  const status = error.response.status
  const msg = error.message
  if (status===401) { //未授权
    //退出登录
    store.dispatch('logout')
    router.replace('/login')
    alert(error.response.data.message)
  } else if (status===404) {
    alert('请求的资源不存在')
  } else {
    alert('请求异常: ' + msg)
  }

  // return error
  // return Promise.reject(error)
  return new Promise(() => {})
  // 中断promise链
})

export default axios
