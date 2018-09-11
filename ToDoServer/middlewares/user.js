const db = require("../db").get;


const usersCollection = () => {
  return db().collection("users");
};

const isValidUser = (req, res, next)=>{
    usersCollection().findOne({ email: req.body.email }, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            req.user = result
            next()
        } else {
            res.status(401).send({ error: 'Sorry! Please try again!' })
        }
    })
}

const isValidUserToSignUp = (req, res, next) => {

    usersCollection().findOne({ email: req.body.email }, (error, result) => {
        if (error) {
            return next(error);
        }

        if (!result) {
            next()
        } else {
            res.status(409).send({error:'Sorry! already you are with us! please try to login!'})
        }
    })
}


module.exports = {
  isValidUser,
  isValidUserToSignUp
};