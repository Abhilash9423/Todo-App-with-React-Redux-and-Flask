import React,{useState} from 'react';
import axios from 'axios'
import FlashMessage from 'react-flash-message'
function RegisterPage(props) {
    const [data,setData] = useState({"email":"","username":"","password":""})
    const [register,setRegister] = useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(data)
        axios.post('http://127.0.0.1:5000/api/register',data)
        .then(function(response) {
            const result = response.data
            console.log(result)
          })
        .then(()=>{setRegister(true)})
          .catch(function (error) {
            console.log(error);
          });
    }




    return (
        <div class="container">
            <form onSubmit={onSubmit} >
                <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                            <label for="exampleInputEmail1">username</label>
                            <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.username} onChange={e=>setData({...data,username:e.target.value})}/>
                    </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <div>
                        </div>
                        {register &&  <div>
                        <FlashMessage duration={5000}>
                        <h1><strong>Registered Successfully, you can login now</strong></h1>
                        </FlashMessage>
                        </div>  }

            </form>
        </div>
    )
}

export default RegisterPage;