import React,{useState,useEffect} from 'react';


const Home = () => {

    const [userName, setUserName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const userHomePage = async ()=>{
        try{
            const res = await fetch("/server/about",{
                method:"get",
                headers:{
                    "content-type": "application/json"
                }
            });
            const data = await res.json();
            setUserName(data.name);
            setLoggedIn(true);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        userHomePage();
    },[]);


    return (
        <div className="home-page">
            <div className="rect-left"></div>
            <div className="rect-right"></div>


            <div className="container home-contents">
                <p className="welcome-sign">welcome</p>
                {loggedIn?<h1 className="home-body">{userName}</h1>:null}
                <h4 className="home-msg">{loggedIn?"Let's learn MERN together!":"We are MERN Developers!"}</h4>
            </div>
        </div>
    )
}

export default Home
