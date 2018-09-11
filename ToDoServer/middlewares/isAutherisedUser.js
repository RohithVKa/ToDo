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
                    res.status(403).send( { error: 'Token Expired' })    
                } else {
                    res.status(401).send({ error: 'Failed to authenticate token' })
                }                
            }

            if (!decoded) {
                res.status(500).send({ error: 'Invalid token' })
            }

            usersCollection().findOne({ _id: ObjectId(decoded.id) }, (error, result) => {
                if (error) {
                    return res.status(500).send({ error: 'Failed to authenticate token' })
                }

                if (result) {
                    req.user = result
                    next()
                } else {
                    res.status(401).send({ error: 'Sorry! Please try again!' })
                }
            })

        })
    } else {
        res.status(401).send("You are not autherised user!");
    }
    
}

module.exports = isAutherisedUser;