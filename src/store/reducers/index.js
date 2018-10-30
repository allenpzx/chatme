import { combineReducers } from 'redux'
import count from './count.js';
import user from './user.js';

export default combineReducers({
    count,
    user,
})