import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { fetchTodoMasterData } from '../Redux'
import axios from 'axios';
import SideNav from './SideNav'
import { Route, Redirect } from "react-router-dom";
import Home from './Home'
import ChildPage from './ChildPage'
function TodoPage({userData,fetchTodoMasterData}) {
    const[data,setData] = useState({todoBucket:""})
    console.log(userData.Uid)


    // useEffect(()=>{
    //     fetchTodoMasterData(userData.Uid)
    // },[])
    // const Uid_for_data = userData.Uid  

    // const onsubmit = (e)  => {
    //     const post = {
    //         "todo_master":data.todoBucket,
    //         "user_id":Uid_for_data
    //     }
    //     console.log("entered on submit ")
    //     posttoMaster(post)
    // }
    

    // const posttoMaster = (post) => {
    //         axios.post('http://127.0.0.1:5000/api/todomaster',post)
    //         .then(response =>{
    //             const users = response.data
    //             console.log("entered in  posttomaster ")
    //             console.log(users)
    //         } )
    //         .catch(error=>{
    //             const erroMsg = error.message
    //             console.log(erroMsg)
    //         })
    //     }
    // if(typeof userData.users.result === 'undefined' && userData.users !="" && userData.users !==null ){
    //        const modified_data = userData.users
    //        console.log(modified_data)
    //     }


    return (
        userData.loggedIn?(
            <div> 
            <SideNav/> 
          <div class="main"> 
         <ChildPage/>
         </div>
        </div>
    ): <Redirect to={{pathname: "/home" }}/>)
}

const mapStateToProps = state => {
    return{
        userData:state.todomaster
    }

}
const mapDispatchToProps = dispatch => {
    return {
        fetchTodoMasterData: (Uid)=>dispatch(fetchTodoMasterData(Uid))

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoPage);