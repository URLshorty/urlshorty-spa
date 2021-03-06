const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'client', 'data', 'favicon.ico')))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3002, 'localhost', (err) => {
  if (err) {
    console.log(err) // switch to Debug
    return
  }

  console.log('Listening at http://localhost:3002')
})
