import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        pass:""
    });

    let name,value;
    const handleChange = (e)=>{
        name = e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { name,email,phone,pass} = user;
        try{
            const res = await fetch("/server/register", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, pass})
            });
            const data = await res.json();
            if (res.status !== 201) {
                window.alert("invalid registration");
                console.log("invalid registration");
            } else {
                window.alert("registration success");
                console.log("registration success");
                history.push("/login");
            }


        }catch(err){
console.log(err);
        }

    }


    return (
        <>
        <div className="signup-page">
            <div className="container mt-5">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name: </label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} placeholder="your name" autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email: </label>
                        <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} placeholder="your email id" autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleChange} placeholder="your phone number" autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                            <input type="text" className="form-control" id="password" name="pass" value={user.pass} onChange={handleChange} placeholder="enter password" autoComplete="off" />
                    </div>

                    <button type="submit" className="btn btn-primary" name="signup" id="signup" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Signup
