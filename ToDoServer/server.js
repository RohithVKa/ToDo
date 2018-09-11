const express = require('express');
const server = express();
const routes = require('./routes')

require('./db').connect();
server.use(express.json())
server.use(express.static("public"));

routes(server)

server.use((req, res, next)=>{
    res.status(404).send({ error: "Sorry not found" });
})

server.use((err, req, res, next)=>{
    res.status(500).send({ error: err.message });
})

server.listen(2410,()=>{
    console.log('====================================');
    console.log('listening in 2410');
    console.log('====================================');
})
module.exports = server;