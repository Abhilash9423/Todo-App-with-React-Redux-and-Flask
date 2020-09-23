import React from 'react';
import {Link} from 'react-router-dom' 
import {connect} from 'react-redux';
import {userloggedOut} from '../Redux'
function NavBarComponent(props) {
    return (
        <div class="container-sm" >
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">TodoApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            { props.userData.loggedIn ? (    
                <>
                <Link to="/todo" >
                <li class="nav-link" >Todo</li>
                    </Link>
                <Link to="/home" >
                <li class="nav-link" onClick={()=>props.userloggedOut()}  >Logout</li>
                </Link> 
                </>
            ):(
                <>
           <Link to="/register" >    
            <li class="nav-link" >Register</li>
            </Link>
            <Link to="/login" >
            <li class="nav-link"  >Login</li>
            </Link>
            </>) }
            </div>

        </div>
        </nav>  
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
        userloggedOut: ()=>dispatch(userloggedOut())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(NavBarComponent);