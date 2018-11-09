const initialState = {
    chatMessage: [],
    users:[],
    unread: 0
}

const chat = (state = initialState, action) => {
    switch(action.type){

        case "GET_MESSAGE_SUCCESS": 
            return {
                    ...state, 
                    chatMessage: action.payload.message, 
                    users: action.payload.users, 
                    unread: action.payload.message.filter(x=>!x.read && x.to===action.payload.userid).length
                }

        case "LISTEN_MESSAGE":
                const n = action.payload.data.to === action.payload.userid ? 1 : 0;
            return {
                    ...state, 
                    chatMessage: [...state.chatMessage, action.payload.data], 
                    unread: state.unread+n
                }

        default: 
            return state
    }
}
export default chat