const initialState = {
   todos:[]
}
const todos = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODO:
            
            break;
        case GOT_TODO:
            return action.payload.todos;
            break;
        default:
            return state;
        // case ADD_TODO:
        //     return {...state, message:action.payload.message}
        // case DELETE_TODO:

        //     break;
        // case UPDATE_TODO:

        //     break;
        // case ADD_TODO:

        //     break;

        // default:
        //     break;
    }
}
export default todos;

