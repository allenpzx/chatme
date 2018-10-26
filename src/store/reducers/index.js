import { combineReducers } from 'redux'
import count from './count.js';
import Auth from './Auth.js';

export default combineReducers({
    count,
    Auth
})