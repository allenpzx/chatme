let initialState = [];

const matchList = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MATCH_LIST_START':
            return action.payload
        case 'GET_MATCH_LIST_SUCCESS':
            return action.payload.data
        case 'GET_MATCH_LIST_ERROR':
            return action.payload
        default:
            return state
    }
}
export default matchList