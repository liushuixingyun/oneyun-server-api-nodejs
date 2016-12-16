import CallClient from './CallClient.js'

class RestClient {
  /**
   * Creates an instance of CallClient.
   *
   * @param {string} appId
   * @param {string} certId
   * @param {string} apiUrl
   * @param {string} secreKey
   *
   * @memberOf CallClient
   */
  constructor(appId, certId, apiUrl, secreKey) {
    this.appId = appId
    this.certId = certId
    this.apiUrl = apiUrl
    this.secreKey = secreKey

    this.calls = new CallClient(appId, certId, apiUrl, secreKey)
  }
}
export default RestClient
