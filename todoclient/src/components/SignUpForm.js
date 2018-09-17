import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField from './Field'
import {required,validEmail} from '../validations/validation'

const validate = values => {
    const errors = {}
    if (values.password1 && values.password2 && values.password1 != values.password2) {
        errors.password1 = 'Password does not match';
    }
    return errors
}

let SignUpForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return <form onSubmit={handleSubmit}>
        <Field name="email" type="email" component={renderField} label="Email" validate={[required,validEmail]} />
        <Field name="password1" type="password" component={renderField} label="Password" validate={[required]} />
        <Field name="password2" type="password" component={renderField} label="Retype Password" validate={[required]} />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>;
}

SignUpForm = reduxForm({
    // a unique name for the form
    form: 'SignUp',
    validate
})(SignUpForm)

export default SignUpForm