let initialState = {};

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            return {...state, data: action.payload}
        case 'GET_USER_ERROR':
            return {...state, data: action.payload}
        default:
            return state
    }
}
export default Auth