let initialState = [];

const ladies = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LADIES_START':
            return action.payload
        case 'GET_LADIES_SUCCESS':
            return action.payload.data
        case 'GET_LADIES_ERROR':
            return action.payload
        default:
            return state
    }
}
export default ladies