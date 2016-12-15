import CallClient from './CallClient.js'

class RestClient {
  constructor(appId, certId, apiUrl, secreKey) {
    this.appId = appId
    this.certId = certId
    this.apiUrl = apiUrl
    this.secreKey = secreKey

    this.calls = new CallClient(appId, certId, apiUrl, secreKey)
  }
}
export default RestClient
