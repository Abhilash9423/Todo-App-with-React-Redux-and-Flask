import React,{useState} from 'react';
import axios from 'axios'
import FlashMessage from 'react-flash-message'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { todoID, userloggedIN } from '../Redux'
import {Link} from 'react-router-dom' 

function Login(props) {
    const [data,setData] = useState({"email":"","password":""})
    const onSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/api/login',data)
        .then(function(response) {
            const result = response.data.result
            const email= result.email
            const password = result.password
            const u_id = result.id
            console.log(u_id)
            props.userloggedIN({"email":email,"password":password})
            props.todoID(u_id)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div class="container">
            <div>
            The user is <b>{props.userData.loggedIn ? 'currently' : 'not'}</b> logged in.
            </div>
            <form onSubmit={onSubmit} >
                <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
                    </div>
                    <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>
                        </div>
                        {/* <Link to={'/todo'} > */}
                        <button type="submit" class="btn btn-primary">Login</button>
                        {/* </Link> */}
                        {props.userData.loggedIn &&  <div>
                        <FlashMessage duration={10000}>
                        <h1><strong>Logged in Successfully</strong></h1>
                        </FlashMessage>
                        <Redirect to={{pathname: "/todo" }}/>
                        </div>  }
                    

            </form>
        </div>
    )
        
}
const mapStateToProps = state => {
    return{
        userData:state.todomaster
    }

}
const mapDispatchToProps = dispatch => {
    return {
        todoID: (u_id)=>dispatch(todoID(u_id)),
        userloggedIN: (logindetails)=>dispatch(userloggedIN(logindetails))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);