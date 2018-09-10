const handlers = require("../handlers");
const usersHandler = handlers.users;
const middlewares = require("../middlewares");
const user = middlewares.user;

const users = server => {
  server.post("/signUp", user.isValidUserToSignUp, usersHandler.signUp);
  server.post("/signIn", usersHandler.signIn);
};

module.exports = users;
