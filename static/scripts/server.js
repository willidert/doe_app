const create = require('./controller').cadastrarDoador
const read = require('./controller').buscarDoadores

const express = require("express")

const server = express()

// configurando o servidor p .js e .css
server.use(express.static('static'))

// server.use(express.static(__dirname + '../../index.html'))
server.use(express.urlencoded({ extend: true }))

// template
const nunjucks = require("nunjucks")

nunjucks.configure("./", {
    express: server,
    noCache: true,
})

server.get("/", read)
// server.get('/', (req, res) => {
//     res.send('Testando')
// })
server.post("/", create)

server.listen(3000)
