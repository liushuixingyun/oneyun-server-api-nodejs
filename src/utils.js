import crypto from 'crypto'
import url from 'url'

// const METHODS_ALLOW = ['post', 'put']

export class Encrypt {

  static create(options, secret) {
    const method = 'POST'
    const sign = Encrypt.getSign(method, options)
    return this.calculateHMAC(sign, secret)
  }

  // 获取签名数据
  static getSign(method, options) {
    const md5 = crypto.createHash('md5')
    md5.update(JSON.stringify(options.body))
    const contentMd5 = md5.digest('hex')

    // get url path
    const urlObject = url.parse(options.url)
    const signString = method + '\n' + contentMd5 + '\n' +
                       options.headers['Content-Type'] + '\n' +
                       options.headers['Timestamp'] + '\n' +
                       options.headers['AppID'] + '\n' +
                       urlObject.path
    return signString
  }

  // 获取签名算法
  static calculateHMAC(sign, secret) {
    const hhmac = crypto.createHmac('sha256', secret)
    hhmac.update(sign)
    const base64Hhmac = hhmac.digest('base64')
    return base64Hhmac
  }
}
