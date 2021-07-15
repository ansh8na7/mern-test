import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    const [user,setUser] = useState({email:"",pass:""});

    const handleChange = (e)=>{
        let name,value;
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {email,pass} = user;
        const res = await fetch("/server/login",{
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, pass })
        });
        const data = await res.json();
        if(res.status!==200 || !res){
            window.alert("invalid credentials");
            console.log("invalid credentials");
        }else{
            dispatch({type:"USER", payload:true});
            history.push("/");
        }
    }

    return (
        <div className="login-page">
            <div className="container" style={{width:"70vw"}}>
                <form method="POST">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="your email" value={user.email} onChange={handleChange} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" name="pass" id="pass" placeholder="enter password" className="form-control" value={user.pass} onChange={handleChange} autoComplete="off" />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
