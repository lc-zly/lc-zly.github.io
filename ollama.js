const expressWs = require('express-ws')(express())
const oo = expressWs.app
//通过langchain对接ollama框架
const { Ollama } = require('@langchain/community/llms/ollama')

app.ws('/ollama', (ws, req) => {
  //由web传来的消息，有消息传来再通过ollama框架调用ds
  ws.on('message', async (msg) => {
    const stream = await model.stream(msg)
    for await (const str of stream) {
      console.log(str)
      //后端给前端传递字符串数据，并且判断是否完结
      ws.send(JSON.stringify({ data: str, isEnd: false }))
    }
    ws.send(JSON.stringify({ data: '', isEnd: true }))
  })
  ws.on('open', () => {
    console.log('ws.open')
  })
  ws.on('error', () => {
    console.log('ws.error')
  })
  ws.on('close', () => {
    console.log('ws.close')
  })


})


module.exports = oo