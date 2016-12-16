import Client from './Client'
const CALL_URL = 'call/duo_callback'
const CALL_CANCEL_URL = 'call/duo_callback_cancel'

export default class CallClient extends Client {

  constructor(appId, certId, apiUrl, secreKey) {
    super(appId, certId, apiUrl, secreKey)
  }

  /**
   * 呼叫方法
   *
   * @param {any} to1
   * @param {any} to2
   * @param {any} options
   * @return {pormise}
   *
   * @memberOf CallClient
   */
  create(to1, to2, options) {
    if (!to2 || !to1) {
      throw new Error('呼出缺少参数 (to1|to2)')
    }
    options.body = Object.assign({}, {
        to1: to1,
        to2: to2,
        max_dial_duration: 30,
        from1: null,
        from2: null,
        ring_tone: null,
        ring_tone_mode: 0,
        max_call_duration: 3600,
        recording: 0,
        record_mode: 0,
        user_data: '',
      },
      options
    )
    return this.request(options, CALL_URL)
  }

  cancel(callId) {
    if(!callId) {
      throw new Error('呼叫ID必填')
    }

    const options = {
      body: {
        callId,
			},
    }

    return this.request(options, CALL_CANCEL_URL)
  }
}
