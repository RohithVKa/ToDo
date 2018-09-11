const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const dbConnect = require('../db').get;
const server = require('../server')
const should = chai.should()
const expect = chai.expect;
const db = require('../db')

const todosCollection = () => {
    return dbConnect().collection("todos");
};

describe('ToDo', () => {
    let token;
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

    describe('Add ToDo', () => {

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
                    expect(response.body).to.have.nested.property('result.data._id')
                    expect(response.body).to.have.nested.property("result.data.completed", true);
                    done()
                });
        })
    })


      describe('Add ToDo', () => {

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
                    expect(response.body).to.have.nested.property('result.data._id')
                    expect(response.body).to.have.nested.property("result.data.completed", true);
                    done()
                });
        })
    })
})