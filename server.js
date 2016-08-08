const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const server = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', {root: __dirname})
})

server.listen(port, () => {
  console.log(`server listening on port: ${port}`)
})
