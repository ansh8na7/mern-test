import React, { useEffect, useState} from 'react';

import { useHistory } from 'react-router-dom';

const About = () => {
    const history = useHistory();
    const [userData, setuserData] = useState({});

    const callAboutPage = async ()=>{
        try{
            const res = await fetch("/server/about",{
                method:"get",
                headers:{
                    Accept:"application/json",
                    "content-type": "application/json"
                },
                credentials:"include"
            });

            console.log(res);
            const data = await res.json();
            console.log(data);
            if(res.status!==200){
                throw new Error(res.error);
            }
            setuserData(data);

        }catch(err){
            console.log(err);
            history.push("/login");
        }
    }

    useEffect(()=>{
        callAboutPage();
    },[]);


    return (
        <div className="about-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Name</h5>
                                <p className="card-text">{userData.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Phone</h5>
                                <p className="card-text"><a href={`tel:${userData.phone}`} style={{ color: "inherit", textDecoration: "none" }}>{userData.phone}</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Email</h5>
                                <p className="card-text"><a href={`mailto:${userData.email}`} style={{ color: "inherit", textDecoration: "none" }}>{userData.email}</a></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default About
