import { combineReducers } from 'redux'
import user from './user.js';
import matchList from './match-list.js';

export default combineReducers({
    user,
    matchList
})