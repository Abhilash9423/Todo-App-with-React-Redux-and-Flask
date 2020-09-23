import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { fetchTodoMasterData,fetchTodoChildData } from '../Redux'
import axios from 'axios';

function SideNav({userData,fetchTodoMasterData,fetchTodoChildData}) {
    const[data,setData] = useState({todoBucket:""})
    console.log(userData.Uid + "userID from side nav")
    useEffect(()=>{
        fetchTodoMasterData(userData.Uid)

    },[])
    const Uid_for_data = userData.Uid  

    const onsubmit = (e)  => {
        const post = {
            "todo_master":data.todoBucket,
            "user_id":Uid_for_data
        }
        console.log("entered on submit ")
        posttoMaster(post)
    }
    

    const posttoMaster = (post) => {
            axios.post('http://127.0.0.1:5000/api/todomaster',post)
            .then(response =>{
                const users = response.data
                console.log("entered in  posttomaster ")
                console.log(users)
        
            } ).then(()=>{
                fetchTodoMasterData(userData.Uid)
            })
            .catch(error=>{
                const erroMsg = error.message
                console.log(erroMsg)
            })
        }
    // if(typeof userData.users.result === 'undefined' && userData.users !="" && userData.users !==null ){
    //        const modified_data = userData.users
    //        console.log(modified_data)
    //     }
    const onDelete = (index) => {
        const id_data = {
            "id":index
        }
        axios.post('http://127.0.0.1:5000/api/deleteMaster',id_data)
        .then(response =>{
            const users = response.data
            console.log("entered on delete ")
            console.log(users)
    
        } ).then(()=>{
            fetchTodoMasterData(userData.Uid)
        })
        .catch(error=>{
            const erroMsg = error.message
            console.log(erroMsg)
        })

        }
        
        const listHandler= (idd) =>{
            console.log("listhandlerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            console.log(idd + " from listHandler")
            const id_Data = {
                "id":idd
            }
            console.log(id_Data)
            fetchTodoChildData(id_Data)
        }


    // const delete_data = (id) =>{
    //     axios.post('http://127.0.0.1:5000/api/deleteMaster')
    // }

    return (  
          userData.loading ? (
        <h2>loading</h2>
            ):userData.error ?(
        <h2>{userData.error}</h2>
        ) : (
        <div class="sidenav">
            <ul>
              <li>
                 <input style={{height:30,width:100,fontSize:16}} required value={data.todoBucket} placeholder="Bucket Name" onChange={e=>setData({todoBucket:e.target.value})} />
             </li>
            <li>
                <button style={{height:30,fontSize:8 }}  onClick={onsubmit} type="button" class="btn btn-light">Add New Bucket</button>
           </li>
            {  userData && userData.users && userData.users.map( 
                    (user) =>                 
                     <li key={user.id} >
                    <button type="button" style={{color:"white"}} class="btn btn-link" onClick={()=>{listHandler(user.id)} } > {user.task} </button>
                   <svg width="1em" style={{padding:5}} height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg" 
                   onClick={() =>{ onDelete(user.id)} } >
                      <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                   <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                   </svg>
                     </li>                   
                ) 
            }
            </ul>
        </div>
    ) 
      
    // <div class="main"> 
    //     <h1>hello</h1>
    // </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(SideNav);