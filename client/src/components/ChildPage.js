import React,{useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { fetchTodoMasterData,fetchTodoChildData } from '../Redux'
import ChildComplete from './ChildComplete'
function ChildPage({userData,fetchTodoChildData,fetchTodoMasterData}) {
    const[data,setData] = useState("")
    const[isEditMode,setisEditMode] = useState(false)
    const[datatwo,setDatatwo] = useState("")
    const[todoId,settodoId] = useState(0)
    // const [isactive,setisactive] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        const post = {
            "todo":data,
            "todo_id":userData.UidMaster
        }
        posttotodo(post)
    }
    const id_Data = {
        "id":userData.UidMaster
    }
    // const changeActiveState = () =>{
    //     return(
    //         setisactive(!isactive)
    //     )
    // }


    const onDelete = (index) => {
        const id_data = {
            "id":index
        }
        axios.post('http://127.0.0.1:5000/api/deleteitems',id_data)
        .then(response =>{
            const users = response.data
            console.log("entered on delete ")
            console.log(users)
    
        } ).then(()=>{
            fetchTodoChildData(id_Data)
        })
        .catch(error=>{
            const erroMsg = error.message
            console.log(erroMsg)
        })

        }
    
    const posttotodo = (post) => {
        console.log("entered posttotodooooooooooooooooooooooooooooo")
        axios.post('http://127.0.0.1:5000/api/todofinal',post)
        .then(response =>{
            const users = response.data
            console.log("entered in  posttotodo ")
            console.log(users)
    
        } ).then(()=>{
            fetchTodoChildData(id_Data)
        })
        .catch(error=>{
            const erroMsg = error.message
            console.log(erroMsg)
        })
    }
    const updateCall = (post) => {
           axios.put('http://127.0.0.1:5000/api/updatetodo',post)
           .then(response=>{
               const users = response.data
               console.log("entered upate call")
               console.log(users)
           }).then(()=>{
               fetchTodoChildData(id_Data)
           }).catch(error=>{
               const errorMsg = error.message
               console.log(errorMsg)
           }) 
    }

    const changeEditData = () => {
        const post = {
            "id":todoId,
            "todo":datatwo
        }
        console.log(isEditMode)
        setisEditMode(!isEditMode)
        if(isEditMode===true){
            console.log(post)
            updateCall(post)
        }
    }
 

    return (  
        userData.loadingChild ? (
      <h2>loading</h2>
          ):userData.childerror ?(
      <h2>{userData.childerror}</h2>
      ) : (
      <div class="container">
          <ul class="list-group">
            <li class="list-group-item">
                <h1>Todo Tasks</h1>
           </li>
           <li class="list-group-item">
           <input style={{width:"80%",float:"left"  }} onChange={(e)=>setData(e.target.value)}  class="list-group-item" placeholder="Todo Items like draft email, finish CSS styling,cooking etc" />
           <button  style={{width:"20%",height:50,float:"right"  }} onClick={(e)=>onSubmit(e)} type="button" class="btn btn-primary">Add</button>
           </li>

           {isEditMode===true ?(<li class="list-group-item">    <input style={{width:"80%",float:"left"  }} onChange={(e)=>setDatatwo(e.target.value)}  class="list-group-item" placeholder="edit here" />
           <button  style={{width:"20%",height:50,float:"right"  }} onClick={()=>changeEditData()} type="button" class="btn btn-primary">Add</button>
            </li>):null}


          {  userData && userData.todolist && ( Array.isArray(userData.todolist) ? ( userData.todolist.map( 
                  (user) => 
                  <li class="list-group-item" key={user.id} >                
                    <li class="list-group-item" style={{float:"left",width:"70%"}} key={user.id} > {user.task}</li> 
                   <button type="button" class="btn btn-danger" style={{float:"right",width:"10%"}} onClick={() =>{ onDelete(user.id)} }>Delete</button>
                   <button type="button" class="btn btn-warning" style={{float:"right",width:"10%"}} onClick = {()=> {changeEditData(); settodoId(user.id);} } >Edit</button>   
                    {/* <button type="button" class="btn btn-warning" style={{float:"right",width:"10%"}} onClick={()=>changeActiveState() } >complete </button> */}
                    <ChildComplete user={user} />
                 </li>    
              ) ) : (<li class="list-group-item">
              <h1>enter the todo tasks </h1>
             </li>) )
          }

          </ul>
      </div> )
    )
}

const mapStateToProps = state => {
    return{
        userData:state.todomaster
    }

}
const mapDispatchToProps = dispatch => {
    return {
        fetchTodoMasterData: (Uid)=>dispatch(fetchTodoMasterData(Uid)),
        fetchTodoChildData: (Uid)=>dispatch(fetchTodoChildData(Uid))

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChildPage);