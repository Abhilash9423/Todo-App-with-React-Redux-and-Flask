import { combineReducers } from 'redux';
import todoReducer from './Todo/todoReducer';

const rootReducer = combineReducers({
    todomaster:todoReducer
})

export default rootReducer;