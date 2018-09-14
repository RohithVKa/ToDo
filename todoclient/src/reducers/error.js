

const initialState = {
    errors: undefined
}
const error = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return action.payload;
        default:
            return state;
    }
}
export default error;

