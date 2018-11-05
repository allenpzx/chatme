import { combineReducers } from 'redux'
import user from './user.js';
import ladies from './ladies.js';
import gentleman from './gentleman.js';

export default combineReducers({
    user,
    ladies,
    gentleman
})