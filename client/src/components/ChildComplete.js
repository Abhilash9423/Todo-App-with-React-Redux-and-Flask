import React,{useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { fetchTodoMasterData,fetchTodoChildData } from '../Redux'
function ChildComplete(props) {
    const [isactive,setisactive] = useState(props.user.active)
    const[todoId,settodoId] = useState(props.user.id)   
    
    const id_Data = {
        "id":props.userData.UidMaster
    }
    console.log(isactive)
    const updateCall = (post) => {
            console.log(post)
            axios.put('http://127.0.0.1:5000/api/updatetodocomplete',post)
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
    //  const changeEditData = () => {
    //     const post = {
    //         "id":todoId,
    //         "todo":datatwo
    //     }
    //     console.log(isEditMode)
    //     setisEditMode(!isEditMode)
    //     if(isEditMode===true){
    //         console.log(post)
    //         updateCall(post)
    //     }
    // }
 

     const changeActiveState = () =>{
        setisactive(!isactive)
        const post = {
            "id":todoId,
            "todo":isactive
        }
        console.log(isactive)
        updateCall(post)
       }
   
    return (
        <div>     
          {isactive?<button type="button" class="btn btn-warning" style={{float:"right",width:"10%"}} onClick={()=>{changeActiveState(); settodoId(props.user.id) } } >Done </button> :<button type="button" class="btn btn-danger" style={{float:"right",width:"10%"}} onClick={()=>{changeActiveState();settodoId(props.user.id)} } >undone </button> }  
        </div>
    );
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


export default connect(mapStateToProps,mapDispatchToProps)(ChildComplete);