var state = {
    db:undefined
}
const config = require('./config')
const connect = (callback) => {

    if (state && state.db && callback) {
        return callback(db);
    } 

    const MongoClient = require("mongodb").MongoClient;

    MongoClient.connect(config.db, { useNewUrlParser: true },(error, result)=>{
        if (error) {
            console.log('====================================');
            console.log('Error on DB connection',error);
            console.log('====================================');
            throw error;
        }
        var db = result.db('todo');
        state.db = db;
        if (callback) {
            callback(db);    
        }        
        // console.log('====================================');
        // console.log('db connected');
        // console.log('====================================');
    });

}

const get = () => {
    return state.db;
}

module.exports = {
    connect,
    get
}


