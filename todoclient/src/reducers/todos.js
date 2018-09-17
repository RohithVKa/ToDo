

const initialState = {
   todos:[]
}
const todos = (state = initialState, action) => {
    switch (action && action.type) {
      case "GOT_TODO":
        return action.payload.todos;
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

