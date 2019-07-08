/*
一个能发送ajax请求函数
*/
import axios from 'axios'
// const qs = require('qs')
import qs from 'qs'

// 请求超时的全局配置
axios.defaults.timeout = 20000 // 20s

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const {method, data} = config
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase() === 'post' && data && typeof data === 'object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }
  return config
})

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => {
  // 请求异常
  alert('请求异常: ' + error.message)

  // return error
  // return Promise.reject(error)
  return new Promise(() => {})
  // 中断promise链
})

export default axios
