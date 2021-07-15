import React, {useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
    const { state, dispatch } = useContext(UserContext)

    const history = useHistory();
    useEffect(() => {
        fetch("/server/logout",{
            method:"get",
            headers:{
                Accept:"application/json",
                "content-type": "application/json"
            },
            credentials:"include"
        }).then(res => {
            dispatch({ type: "USER", payload: false });
            history.push("/",{replace:true});
            if(res.status !== 200){
                throw new Error(res.error);
            }
        }).catch(err => console.log(err));
        

    }, []);
    return (
        <div>
            <h1>Logged out!</h1>
        </div>
    )
}

export default Logout
