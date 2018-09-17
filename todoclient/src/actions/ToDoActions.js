import { doGet } from "../fetch";
import config from '../config'

export function getToDos() {
    return (dispatch)=>{
        return doGet(`${config.baseUrl}\todos`)
        .then(response=>{
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            if (response.status == 200) {
                dispatch(receivedAction(response.result.data));    
            }
            
        })
    }
}


const receivedAction = function receivedToDos(todos){
    return {
        type: 'GOT_TODO',
        payload: {todos}
    }
}