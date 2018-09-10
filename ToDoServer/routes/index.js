const routes = (server) => {
    require('./todo')(server)   
    require('./user')(server)    
}
module.exports = routes