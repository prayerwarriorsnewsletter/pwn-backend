const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require("./config/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://prayerwarriorsnewsletter.firebaseio.com"
});

const server = express();

server.use(cors())
server.use(express.json())
server.options('*', cors())


// authorized = true

function checkAuth(req, res, next){
    if (req.headers.authtoken){
        admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
            next()
        }).catch(() => {
            res.status(403).send("Unauthorized")
        })
    }else{
        res.status(403).send("Unauthorized")
    }
}

server.use('/', checkAuth)
server.get('/', (req, res) => {
    res.status(200).json({message: 'testing get endpoint'})
})

module.exports = server