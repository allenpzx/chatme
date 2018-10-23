const count = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_NUMBER':
            return state+=action.number
        case 'SUBTRACT_NUMBER':
            return state-=action.number
        default:
            return state
    }
}
export default count