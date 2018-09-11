const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const dbConnect = require('../db').get;
const server = require('../server')
const should = chai.should()
const expect = chai.expect;
const db = require('../db')

const todosCollection = ( ) => {
    return dbConnect().collection("todos");
};
 
describe('ToDo', () => {
    let token;
    let pulledTodo;
    before((done) => {
        db.connect(() => {
            todosCollection().drop()

            chai
                .request(server)
                .post("/signUp")
                .send({ email: 'rithickunknodwn'+Date.now(), password: 'yes' })
                .end((error, response) => {
                    token = response.body.result.data.token
                    done();
                });
            
        })
    })

    let todo = {
        message: 'a message',
        completed: false
    }

    describe('Add a ToDo', () => {

        it("should check token input existance", done => {
            chai
                .request(server)
                .post("/todo")
                .send(todo)
                .end((error, response) => {
                    response.should.have.status(401);
                    done();
                });
        });   
        
        it("should check message input existance", done => {
            todo.message = undefined;
            chai
                .request(server)
                .post("/todo")
                .set({token:token})
                .send(todo)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });   

        it("should add todo by default as not completed", done => {
            todo.message = 'a message'
            todo.completed = undefined

            chai
                .request(server)
                .post("/todo")
                .set({ token: token })
                .send(todo)
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.nested.property("result.data.completed",false);
                    expect(response.body).to.have.nested.property("result.data._id");
                    done();
                });
        });   


        it('should add a todo', (done) => {
            todo.message = 'a message'
            todo.completed = true

            chai
                .request(server)
                .post("/todo")
                .set({ token: token })
                .send(todo)
                .end((error, response) => {
                    response.should.have.status(201)
                    pulledTodo = response.body.result.data._id
                    expect(response.body).to.have.nested.property('result.data._id')
                    expect(response.body).to.have.nested.property("result.data.completed", true);
                    done()
                });
        })
    })


      describe('Get ToDos', () => {

        it("should check token input existance", done => {
            chai
                .request(server)
                .get("/todos")
                .end((error, response) => {
                    response.should.have.status(401);
                    done();
                });
        });   
        
        it("should allow user to get todo list", done => {
            chai
                .request(server)
                .get("/todos")
                .set({token:token})
                .end((error, response) => {
                    response.should.have.status(200);
                    done();
                });
        });   

        it("should throw error on invalid user id", done => {
            chai
                .request(server)
                .get("/todos")
                .set({ token: 'sfsdfdfdsfdsfsd' })
                .end((error, response) => {
                    response.should.have.status(401);
                    done();
                });
        });   
    })

    describe('Update a ToDo', () => {

        it("should check token input existance", done => {
            chai
                .request(server)
                .patch(`/todo/${pulledTodo}`)
                .end((error, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

        it("should allow user to update(completed) a todo", done => {
            chai
                .request(server)
                .patch(`/todo/${pulledTodo}`)
                .set({ token: token })
                .send({completed: true})
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.nested.property("result.data.completed", true);
                    done();
                });
        });


        it("should allow user to update(message) a todo", done => {
            chai
              .request(server)
              .patch(`/todo/${pulledTodo}`)
              .send({ message: 'updated message' })
              .set({ token: token })
              .end((error, response) => {
                response.should.have.status(200);
                expect(response.body).to.have.nested.property("result.data.message", 'updated message');
                done();
              });
        });


        it("should throw error on invalid user id", done => {
            chai
              .request(server)
              .patch(`/todo/${pulledTodo}`)
              .set({ token: "sfsdfdfdsfdsfsd" })
              .send({ message: 'updated message' })
              .end((error, response) => {
                response.should.have.status(401);
                done();
              });
        });
    })

    describe('Delete a ToDo', () => {

        it("should check token input existance", done => {
            chai
                .request(server)
                .delete(`/todo/${pulledTodo}`)
                .end((error, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

        it("should allow user to delete a todo", done => {
            chai
              .request(server)
              .delete(`/todo/${pulledTodo}`)
              .send({ message: 'updated message' })
              .set({ token: token })
              .end((error, response) => {
                response.should.have.status(200);
                done();
              });
        });

        it("should throw error on invalid user id", done => {
            chai
              .request(server)
              .delete(`/todo/${pulledTodo}`)
              .set({ token: "sfsdfdfdsfdsfsd" })
              .send({ message: 'updated message' })
              .end((error, response) => {
                response.should.have.status(401);
                done();
              });
        });
    })
})