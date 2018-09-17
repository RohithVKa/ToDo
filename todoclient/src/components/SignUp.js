import React, { Component } from 'react'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
    submit = (values)=> {
        console.log('====================================');
        console.log(values);
        console.log('====================================');
    }
    render() {
        return <div>
            <SignUpForm onSubmit={this.submit}>

            </SignUpForm>
        </div>
    }
}

export default SignUp;