const initialState = {
    chatMessage: [],
    unread: 0
}

const chat = (state = initialState, action) => {
    switch(action.type){
        case "GET_MESSAGE_START": 
            return state
        case "GET_MESSAGE_SUCCESS": 
            console.log('get message success')
            return {...state, chatMessage: action.payload}

        case "LISTEN_MESSAGE":
            return {...state, chatMessage: [...state.chatMessage, action.payload]}

        default: 
            return state
    }
}
export default chat