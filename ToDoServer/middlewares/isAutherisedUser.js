const jwt = require('jsonwebtoken')
const db = require("../db").get;
var ObjectId = require("mongodb").ObjectID;
const config = require("../config");

const usersCollection = () => {
    return db().collection("users");
};

const isAutherisedUser = (req, res, next) => {
    const token = req.headers && req.headers["token"];

    if (token && token.length > 0) {

        jwt.verify(token, config.jwtSecret,(error, decoded)=>{
            if (error) {
                if (error.name == 'TokenExpiredError') {
                    res.send(403, { error: 'Token Expired' })    
                } else {
                    res.send(500, { error: 'Failed to authenticate token' })
                }                
            }

            if (!decoded) {
                res.send(500, { error: 'Invalid token' })
            }

            usersCollection().findOne({ _id: ObjectId(decoded.id) }, (error, result) => {
                if (error) {
                    return res.send(500, { error: 'Failed to authenticate token' })
                }

                if (result) {
                    req.user = result
                    next()
                } else {
                    res.send(401, { error: 'Sorry! Please try again!' })
                }
            })

        })
    } else {
        res.send(401, "You are not autherised user!");
    }
    
}

module.exports = isAutherisedUser;