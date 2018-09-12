const initialState = {
    email: undefined,
    token: undefined
}

const user = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_IN:
      case SIGN_UP:
        return { ...state, email: action.payload.email, token: action.payload.token }
      default:
        return state;
    }
}

export default user;

