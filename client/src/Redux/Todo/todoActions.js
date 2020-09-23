import {
    GET_TODO_MASTER,
    ADD_TODO_MASTER,
    DELETE_TODO_MASTER,
    FETCH_TODO_MASTER,
    FETCH_TODO_FAILURE,
    FETCH_TODO_SUCCESS,
    GET_UID,
    ADDING_DATA,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    FETCH_TODO_CHILD,
    FETCH_TODO_CHILD_FAILURE,
    FETCH_TODO_CHILD_SUCCESS,
    GET_TODO_MASTER_ID
} from './todoTypes'
import axios from 'axios'
import { compose } from 'redux'

export const fetchTodoMaster = () => {
    return{
        type: FETCH_TODO_MASTER
    }
}

export const fetchTodoSuccess= (users) =>{
    console.log(users + " heloooooooooooooooooooooooooooo")
    return{
        type: FETCH_TODO_SUCCESS,
        payload:users
    }
}
export const fetchTodoFailure = (error) => {
    return{
        type: FETCH_TODO_FAILURE,
        payload:error
    }
}
export const fetchTodoChild = () => {
    return {
        type:FETCH_TODO_CHILD
    }
}
export const fetchTodoChildSuccess= (todolist) =>{
    return{
        type:FETCH_TODO_CHILD_SUCCESS,
        payload:todolist
    }
}
export const fetchTodoChildFailure = () => {
    return{
        type:FETCH_TODO_CHILD_FAILURE
    }
}
export const todoID = (Uid) => {
    return{
        type:GET_UID,
        payload:Uid
    }
}
export const addingData = () => {
    return{
        type:ADDING_DATA
        
    }
}
export const userloggedIN = (logindetails) => {
    console.log("user entered actions page")
    return{
        
        type:USER_LOGGED_IN,
        payload:logindetails
    }
}
export const userloggedOut = () => {
    return{
        type:USER_LOGGED_OUT
    }
}
export const getTodoIDFromMaster = (UidMaster) => {
    return{
        type:GET_TODO_MASTER_ID,
        payload:UidMaster
    }
} 

export const fetchTodoMasterData = (Uid) => {
    return dispatch => {
        dispatch(fetchTodoMaster)
         axios.get(`http://127.0.0.1:5000/api/todomastergetbyid`)
        .then(response =>{
            const users = response.data
            console.log("in fetchtodomasterdata methodd")
            let Uid_from_back_end = Object.keys(users['arrays'][0])
            let Uid_value = parseInt(Uid_from_back_end, 10)
            const users2 = users['arrays'][0][Uid_value]
            dispatch(fetchTodoSuccess(users2))
        } )
        .catch(error=>{
            const erroMsg = error.message
            dispatch(fetchTodoChildFailure(erroMsg))
        })
    }
}


export const fetchTodoChildData = (Uid) => {
    console.log(Uid + "from chillllllllllllllllllllllllllllllllld Data ")
    return dispatch => {
        dispatch(fetchTodoChild)
         axios.post(`http://127.0.0.1:5000/api/todochilditemsbyid`,Uid)
        .then(response =>{
            const users = response.data
            console.log("in fetchTodoChildData methodd")
            console.log(users)
            console.log(users['arrays'][0])

            let Uid_from_back_end = Object.keys(users['arrays'][0])
            console.log(Uid_from_back_end)
            let Uid_value = parseInt(Uid_from_back_end, 10)
            console.log(Uid_value + "from child ")
            dispatch(getTodoIDFromMaster(Uid_value))
            const users2 = users['arrays'][0][Uid_value]
            dispatch(fetchTodoChildSuccess(users2))
        } )
        .catch(error=>{
            const erroMsg = error.message
            dispatch(fetchTodoFailure(erroMsg))
        })
    }
}