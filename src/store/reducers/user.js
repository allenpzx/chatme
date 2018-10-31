import {getRedirectPath} from '../../utils/getRedirectPath.js';

let initialState = {
    redirectTo: '',
    isAuth: false,
    account: null,
    password: null,
    message: null,
    gender: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_START':
            return {...state, message: action.payload.message}
        case 'GET_USER_SUCCESS':
            return {...state, isAuth: true, ...action.payload} 
        case 'GET_USER_ERROR':
            return {...state, isAuth: false, message: action.payload.message}

        case 'REGISTER_STAR':
            return {...state, message: action.payload.message}
        case 'REGISTER_SUCCESS':        
            return {
                        ...state, 
                        isAuth: true, 
                        redirectTo: getRedirectPath(action.payload.data), 
                        message: '注册成功', 
                        ...action.payload.data
                    }   
        case 'REGISTER_ERROR':        
            return {...state, isAuth: false, message: action.payload.message}     
            
        case 'LOGIN_STAR':
            return {...state, message: action.payload.message}
        case 'LOGIN_SUCCESS':        
            return {
                        ...state, 
                        isAuth: true, 
                        redirectTo: getRedirectPath(action.payload.data), 
                        message: '登录成功', 
                        ...action.payload
                    }    
        case 'LOGIN_ERROR':        
            return {...state, isAuth: false, message: action.payload.message}

        default:
            return state
    }
}

export default user