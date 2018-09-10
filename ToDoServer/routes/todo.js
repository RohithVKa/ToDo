const handlers = require('../handlers')
const todosHandler = handlers.todos;
const middlewares = require("../middlewares");
const isAutherisedUser = middlewares.isAutherisedUser;

const todos = (server) => {
    server.post("/todo", isAutherisedUser, todosHandler.addToDo);
    server.get("/todos", isAutherisedUser, todosHandler.getTodos);
    server.patch("/todo/:id", isAutherisedUser, todosHandler.updateToDo);
    server.delete("/todo/:id", isAutherisedUser, todosHandler.deleteToDo);
}

module.exports = todos;