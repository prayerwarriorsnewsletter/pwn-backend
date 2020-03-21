const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const server = express();

server.use(cors())
server.use(express.json())
server.options('*', cors())


authorized = true

function checkAuth(req, res, next){
    if (authorized){
        next()
    }else{
        res.status(403).send("Unauthorized")
    }
}

server.use('/', checkAuth)
server.get('/', (req, res) => {
    res.status(200).json({message: 'testing get endpoint'})
})

module.exports = server