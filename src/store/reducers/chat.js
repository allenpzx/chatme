const initialState = {
    chatMessage: [],
    unread: 0
}

const chat = (state = initialState, action) => {
    switch(action.type){
        case "GET_MESSAGE_START": 
            return state
        case "GET_MESSAGE_SUCCESS": 
            return {...state, chatMessage: action.payload, unread: action.payload.filter(x=>!x.read).length}

        case "LISTEN_MESSAGE":
            return {...state, chatMessage: [...state.chatMessage, action.payload], unread: state.unread+1}

        default: 
            return state
    }
}
export default chat