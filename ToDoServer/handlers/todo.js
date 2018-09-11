const db = require('../db').get;
var ObjectId = require('mongodb').ObjectID;

const todosCollection = () => {
    return db().collection('todos')
}

const getTodos = (req, res, next) => {

    todosCollection().find({ user: { $eq: req.user._id } },{user:0}).toArray((error, result)=>{
        if (error) {
          return next(error);
        }
        res.status(200).send({ result: { message: 'ToDo list', data: result} })
    })

}


const addToDo = (req, res, next) => {
    
    if (!req.body.message) {
        return res.status(409).send({ error: 'message is mandatory' });   
    }

    if (!req.body.completed) {
        req.body.completed = false
    }

    todosCollection().insertOne({...req.body,user:req.user._id}, (error, result) => {
        if (error) {
            return next(error);
        }
        let todo = result.ops[0];
        todo.user = undefined;
        res.status(201).send({ result: { message: 'Added', data: todo } });
    })

};

const deleteToDo = (req, res, next) => {

    todosCollection().deleteOne({_id: { $eq: ObjectId(req.params.id)}},(error, result)=>{
         if (error) {
             return next(error);
         }
        res.status(200).send({ result: { message: 'Deleted',data: req.params.id } })
     })

};

const updateToDo = (req, res, next) => {

    todosCollection().findOneAndUpdate({ _id: { $eq: ObjectId(req.params.id) } }, { $set: { ...req.body } }, { returnOriginal: false},(error, result) => {
        if (error) {
            return next(error);
        }
        if (result.value) {
            result.value.user = undefined;
            res.status(200).send({
              result: { message: "Updated", data: result.value }
            });    
        } else {
            res.status(404).send({ error: "Not found" });   
        }
    })

};

module.exports = {
    getTodos,
    addToDo,
    updateToDo,
    deleteToDo
}