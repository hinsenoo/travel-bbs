/* eslint-disable */
import axios from 'axios';
import storage from '../../storage'
// import qs from 'qs';
import store from '../../../store/index';
import router from '../../../router/router';
// import { Message } from 'element-ui'
// import {
//   setCookie,
//   delCookie
// } from '@/common/js/common';

let cancel = {};
const promiseArr = {};
const CancelToken = axios.CancelToken;

// 请求超时时间
axios.defaults.timeout = 10000;

axios.defaults.baseURL = '/api/';

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 附带 token 请求头
  if(config.method !== 'get') {
    const token = storage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  }
  // 发起请求时，取消掉当前正在进行的相同请求
  // if (promiseArr[config.url]) {
  //   promiseArr[config.url]('操作取消');
  //   promiseArr[config.url] = cancel;
  // } else {
  //   promiseArr[config.url] = cancel;
  // }
//   let token = store.getters.token;
//   for (let i = 0; i < 5; i++) {
//     if (document.cookie.indexOf('token') > -1) {
//       delCookie('token');
//     } else {
//       break;
//     }
//   }
//   setCookie('token', token);
//   config.url = config.url + (config.url.indexOf('?') > -1 ? 'token=' : '?token=') + token;
  return config;
}, error => Promise.reject(error));

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // TODO: 正确响应处理
  if(response.data){
      return response.data;
  }
}, (error) => {
  /* eslint no-param-reassign: ["error", { "props": false }] */
  if (error.message === '操作取消') {
    return false;
    // return Promise.reject(error);
  }
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        // error.message = '错误请求';
        // break;
        return false;
      case 401:
        // type: 1——登录过期
        if(error.response.data.originalError) {
          store.commit('saveLogoutStatus');
          error.message = { status: error.response.data.status, msg: '登录过期，请重新登录', type: 1 }
          store.dispatch('saveLoginModal', 1);
        }else {
          error.message = { status: error.response.data.status, msg: error.response.data.message }
        }
        // if(error.response.data.originalError)
        break;
        // error.message = '未授权，请重新登录';
        // break;
        // return false;
      case 403:
        // error.message = '拒绝访问';
        // break;
        return false;
      case 404:
        // error.message = '请求错误,未找到该资源';
        // break;
        return false;
      case 405:
        // error.message = '请求方法未允许';
        // break;
        return false;
      case 408:
        // error.message = '请求超时';
        // break;
        return false;
      case 409:
        error.message = { status: error.response.data.status, msg: error.response.data.message }
        break;
        // return false;
      case 500:
        //   error.message = _this.$t('tip.Servererror');
        //   error.message = '服务器端出错';
        // break;
        return false;
      case 501:
        // error.message = '网络未实现';
        // break;
        return false;
      case 502:
        // error.message = '网络错误';
        // break;
        return false;
      case 503:
        // error.message = '服务不可用';
        // break;
        return false;
      case 504:
        // error.message = '网络超时';
        // break;
        return false;
      case 505:
        // error.message = 'http版本不支持该请求';
        // break;
        return false;
      default:
        return false;
      // error.message = `${error.response.status}`;
    }
  } else {
    // error.message = '服务器连接失败';
    // error.message = this.$t('tip.Servermessage');
    // console.log('err', error)
    // return false;
  }
  return Promise.resolve(error.message);
});

const httpServer = (opts, data, time) => {
  const Public = { // 公共参数
    _: new Date().getTime(),
  };

  const httpDefaultOpts = { // http默认配置
    method: opts.method,
    baseURL: '/api/',
    // eslint-disable-next-line
    url: opts.url,
    params: Object.assign(Public, data),
    timeout: time ? time : 120000,
    // withCredentials: true, // 允许携带cookie,但会影响本地跨域
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    } : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    cancelToken: new CancelToken((c) => {
      cancel = c;
    }),
  };

  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  const promise = new Promise(((resolve, reject) => {
    axios(httpDefaultOpts).then(
      (res) => {
        if (res.data) {
        //   if (typeof res.data.status !== "undefined" && typeof res.data.data !== "undefined" && res.data.status === 1 && res.data.data.indexOf("LOGINOUT") > -1) {
        //     store.commit('logout');
        //     if (router.currentRoute.path !== '/login') {
        //       router.replace({
        //         path: '/login',
        //       });
        //     }
        //   }
          resolve(res.data);
        } else if (res) {
          resolve(res);
        }

      },
    ).catch(
      (response) => {
        reject(response);
      },
    );
  }));
  return promise;
};

export default axios;
