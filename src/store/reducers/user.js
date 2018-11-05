import {getRedirectPath} from '../../utils/getRedirectPath.js';

let initialState = {
    redirectTo: '',
    message: null,
    isAuth: false,
    id: null,
    avatar: null,
    account: null,
    gender: null,
    age: null,
    description: null,
    wanna: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_START':
            return {...state, message: action.payload.message}
        case 'GET_USER_SUCCESS':
            return {
                        ...state, 
                        isAuth: true, 
                        redirectTo: getRedirectPath(action.payload.data), 
                        message: '获取用户模型成功', 
                        ...action.payload.data
                    } 
        case 'GET_USER_ERROR':
            return {...state, isAuth: false, ...action.payload}


        case 'UPDATE_USER_START':
            return {...state, message: action.payload.message}
        case 'UPDATE_USER_SUCCESS':
            return {
                        ...state, 
                        isAuth: true, 
                        redirectTo: getRedirectPath(action.payload.data), 
                        message: '更新用户信息成功', 
                        ...action.payload.data
                    } 
        case 'UPDATE_USER_ERROR':
            return {...state, isAuth: false, ...action.payload}


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
                        ...action.payload.data
                    }    
        case 'LOGIN_ERROR':        
            return {...state, isAuth: false, message: action.payload.message}


        default:
            return state
    }
}

export default user