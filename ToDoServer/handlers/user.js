const db = require('../db').get;
const middlewares = require('../middlewares')
const user = middlewares.user;
var ObjectId = require('mongodb').ObjectID;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

const usersCollection = () => {
    return db().collection('users')
}

const hashedPassword = (password) => {
    const key = crypto.pbkdf2Sync(password, config.salt, 100000, 64, 'sha512');
    // console.log(key.toString('hex'));  // '3745e48...08d59ae'
    return key.toString('hex')
}

const hasCredentialInputs = (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return false
    }
    return true
}

const hookJwtToken = (user) => {
    var user = user;

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    });
    user.token = token;
    user._id = undefined;
    user.password = undefined;
    return user
}

const signUp = (req, res, next) => {
    
    if (!hasCredentialInputs(req, res, next)){
        return res.send(409, { error: 'email and password are mandatory!'})
    }

    req.body.password = hashedPassword(req.body.password)

    usersCollection().insertOne(req.body,{}, (error, result) => {
        if (error) {
            return next(error);
        }

        const user = hookJwtToken(result.ops[0])
        res.send(201, { result: { message: 'Signed up successfully!', data: user } });
    })

};

const signIn = (req, res, next) => {

    if (!hasCredentialInputs(req, res, next)) {
        return res.send(409, { error: 'email and password are mandatory!'})
    }

    usersCollection().findOne({email:req.body.email},(error, result)=>{
        if (error) {
            return next(error);
        }

        if (result && result.password == hashedPassword(req.body.password)) {
            const user = hookJwtToken(result)
            res.send(200, { result: { message: 'Signed in successfully!', data: user } })
        } else {
            res.send(401,{ error: 'Sorry! Invalid email / password' })
        }
    })

};

module.exports = {
    signIn,
    signUp
}