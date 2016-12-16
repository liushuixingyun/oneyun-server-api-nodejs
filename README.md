# ONEYUN NODE SDK

## 快速开始

### 语音回拨

语音回拨

```js
import Client from '../src/index.js'

const appId = ""

const certId = ""

const apiUrl = ""

const secreKey = ""

const client = new Client.RestClient(appId, certId, apiUrl, secreKey)

client.calls.create(
  '17606661993',
  '13611460986',
  {
    user_data: '',
    max_dial_duration: 30
  }
).then( (data) => {
	console.log(data);
}).catch((err)=>{
	console.log(err);
})
```

语音挂断

```js
client.calls.cancel(callId).then( (data)=> {
	console.log(data)
}).catch((err) => {
	console.log(err)
})
```

## 其它

aws-sign2@0.6.0 有bug，作者已经更新到0.6.1但未publish，需要手动安装修复
```
npm install git+ssh://git@github.com/request/aws-sign.git --save
```
