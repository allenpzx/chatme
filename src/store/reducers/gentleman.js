let initialState = [];

const gentleman = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GENTLEMAN_START':
            return action.payload
        case 'GET_GENTLEMAN_SUCCESS':
            return action.payload.data
        case 'GET_GENTLEMAN_ERROR':
            return action.payload
        default:
            return state
    }
}
export default gentleman