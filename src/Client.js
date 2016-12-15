/**
 * 所有 业务的基础类
 */

import {version} from '../package.json'
import request from 'request'
import {Encrypt} from './utils.js'
import moment from 'moment'


export default class Client {

  constructor(appId, certId, apiUrl, secreKey) {
    if(!appId || !certId || !apiUrl || !secreKey) {
      throw new Error('缺少构造参数, 请检查是否缺少 appId, certId, apiUrl, secreKey 之一')
    }
    this.appId = appId
    this.certId = certId
    this.apiUrl = apiUrl
    this.secreKey = secreKey
  }

  getBaseUrl() {
    return this.apiUrl
  }

  /*
   * [create 发出呼叫请求]
   * @param  {options} options options for HTTP request
   * @return {promise}
   */
  request(options, appendUrl) {
    options.url = this.apiUrl + appendUrl
    options.json = true

    options.headers = {
     'Accept': 'application/json',
     'Accept-Charset': 'utf-8',
     'Content-Type': 'application/json; charset=utf-8',
     'User-Agent': 'oneyun-node/' + version,
     'Timestamp': moment().format('YYYYMMDDkkmmss'), // 24小时制
     'AppID': this.appId,
     'CertID': this.certId,
    }
    const signature = Encrypt.create(options, this.secreKey)
    options.headers['Signature'] = signature

    return new Promise((resolve, reject)=> {
      request.post(options, function(err, response, body) {
        // let data
        // try {
        //   if(err) {
        //     data = err
        //   } else {
        //     data = body
        //   }
        // } catch (e) {
        //   data = {status: 500, message: (e.message || 'Invalid JSON body')}
        // }

        if(err) {
          reject(err)
        } else {
          resolve(body)
        }
      })
    })
  }
}
