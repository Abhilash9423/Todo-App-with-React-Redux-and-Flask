import {
    GET_TODO_MASTER,
    ADD_TODO_MASTER,
    DELETE_TODO_MASTER,
    FETCH_TODO_MASTER,
    FETCH_TODO_FAILURE,
    FETCH_TODO_SUCCESS,
    GET_UID,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    FETCH_TODO_CHILD,
    FETCH_TODO_CHILD_FAILURE,
    FETCH_TODO_CHILD_SUCCESS,
    GET_TODO_MASTER_ID
} from './todoTypes'

const initialState = {
    loading:false,
    users:[],
    error:'',
    Uid:0,
    email:"",
    password:"",
    loggedIn:false,
    secondRender:false,
    todolist:[],
    loadingChild:false,
    childerror:"",
    UidMaster:0

}

const todoReducer = (state=initialState,action) =>{
    switch(action.type){
        case FETCH_TODO_MASTER:
            return{
                ...state,
                loading:true
            }
        case FETCH_TODO_SUCCESS:
            return{
            ...state,
                loading:false,
                users:action.payload,
                error:'',
                secondRender:true
            }
        case FETCH_TODO_FAILURE:
            return{
                ...state,
                loading:false,
                users:[],
                error:action.payload,
            }
        case FETCH_TODO_CHILD:
            return{
                ...state,
                loadingChild:true
            }
        case FETCH_TODO_CHILD_SUCCESS:
            return{
                ...state,
                loadingChild:false,
                todolist:action.payload,
                childerror:''
            }
        case FETCH_TODO_CHILD_FAILURE:
            return{
                ...state,
                loadingChild:false,
                todolist:[],
                childerror:action.payload
            }
        case GET_UID:
            return{
                ...state,
                loading:false,
                user:[],
                error:"",
                Uid:action.payload
            }
        case USER_LOGGED_IN:
            console.log("user entererd reducer page")
            return{
                ...state,
                email:action.payload.email,
                password:action.payload.password,
                loggedIn:true

            }
        case USER_LOGGED_OUT:
            return{
                ...state,
                email:"",
                password:"",
                loggedIn:false
                
            }
        case GET_TODO_MASTER_ID:
            return{
                ...state,
                UidMaster:action.payload
            }
        default:
            return{
                state
            }
    }

}

export default todoReducer;