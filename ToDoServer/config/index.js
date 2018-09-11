
const common = require('./config_common')
var currentConfig = require("./config_" + (!process.env.NODE_ENV ? 'development' : process.env.NODE_ENV));

module.exports = (() => {
    return Object.assign({}, common, currentConfig);
})()
