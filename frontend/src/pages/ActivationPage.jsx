import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server.js';

const ActivationPage = () => {
    const {token} = useParams();
    const [error,setError] = useState(false);

    useEffect( () =>{
        if(token)
        {  
            const activationMail = async()=>{
                try{
                    const res = await axios.post(`${server}/user/activation`,{token})
                    
                    console.log(res.data);
                }
                catch(error){
                    console.log(error.response.data);
                    setError(true);
                }
            }
            activationMail();
        }
    },[]);
  return (
    <div style={{
        width:"100%",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    }}>
        {
            error ? (
                <p>Your token is expired</p>
            ) :(
                <p>Your account has been created successfully</p>
            )
        }

    </div>
  )
}

export default ActivationPage