import { combineReducers } from 'redux'
import user from './user.js';
import matchList from './match-list.js';
import chat from './chat.js';

export default combineReducers({
    user,
    matchList,
    chat
})