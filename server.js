const express = require('express')
const compression = require('compression')  

const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')

const nextI18next = require('./src/i18n')


const port = parseInt(process.env.PORT, 10) || 3003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(compression()) 
  server.use(nextI18NextMiddleware(nextI18next))


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})