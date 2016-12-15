import Client from './Client'
const CALL_URL = 'call/duo_callback'
const CALL_CANCEL_URL = 'call/duo_callback_cancel'

export default class CallClient extends Client {
  constructor(appId, certId, apiUrl, secreKey) {
    super(appId, certId, apiUrl, secreKey)
  }
  
  /**
   * @param {object} options
   *        - @param {string} from
   *        - @param {string} to
   *        - @param {string} body
   * @return {promise}
   */
  create(options) {
    if (!options.to2 || !options.to1 || !options.body) {
      throw new Error('呼出缺少参数 (from|to|body)')
    }
    options.body = Object.assign({}, {
        to1: options.to1,
        to2: options.to2,
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
      options.body
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
