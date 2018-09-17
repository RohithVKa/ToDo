import { doPost } from "../fetch";
import config from '../config'
import error from './Errors'
export function signIn(email, password) {
    return (dispatch) => {
        return doPost(`${config.baseUrl}\signIn`,undefined, {email, password} )
            .then(response => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (response.status == 200) {
                    dispatch(signInAction(response.result.data));
                }
            })
            .catch(reason=>{
                dispatch(error(reason.message))
            })
    }
}


export function signUp(email, password) {
    return (dispatch) => {
        return doPost(`${config.baseUrl}\signUp`, undefined, { email, password })
            .then(response => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (response.status == 201) {
                    dispatch(signUpAction(response.result.data));
                }
            })
            .catch(reason => {
                dispatch(error(reason.error))
            })

    }
}

const signInAction = function receivedToDos(payload) {
    return {
        type: 'SIGN_IN',
        payload
    }
}

const signUpAction = function receivedToDos(payload) {
  return {
    type: 'SIGN_UP',
    payload
  };
};

