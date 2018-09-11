const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const dbConnect = require('../db').get;
const server = require('../server')
const should = chai.should()
const expect = chai.expect;
const db = require('../db')

const usersCollection = () => {
    return dbConnect().collection("users");
};

describe('User',()=>{
    before((done)=>{
            usersCollection().drop()
            done()
    })

    let user = {
        email: 'rithick',
        password: 'yes'

    }

    describe('Sign up',()=>{

        it('should sign up a new user',(done)=>{
            chai
              .request(server)
              .post("/signUp")
              .send(user)
              .end((error, response) => {
                response.should.have.status(201)
                expect(response.body).to.have.nested.property('result.data.email',user.email)
                done()
              });
        })

        user.email = undefined
        it("should check email input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = 'rithick'
        user.password = undefined
        it("should check password input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = undefined
        user.password = undefined

        it("should check email/password input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = 'rithick';
        user.password = 'yes';

        it('should NOT allow existing user to sign up again', (done) => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409)
                    done()
                });
        })
       
    })

    describe('Sign in', () => {

        it('should allow sign in a existing user', (done) => {
            chai
                .request(server)
                .post("/signIn")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200)
                    expect(response.body).to.have.nested.property('result.data.email', user.email)
                    expect(response.body).to.have.nested.property("result.data.token");
                    done()
                });
        })

        user.email = undefined
        it("should check email input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = 'rithick'
        user.password = undefined
        it("should check password input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = undefined
        user.password = undefined

        it("should check email/password input existance", done => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

        user.email = 'rithickunknown';
        user.password = 'yes';


        it('should NOT allow unknown user to sign in', (done) => {
            chai
                .request(server)
                .post("/signUp")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(409)
                    done()
                });
        })

    })
})