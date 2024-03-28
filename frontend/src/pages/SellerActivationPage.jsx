import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server.js';

const SellerActivationPage = () => {
    const {seller_token} = useParams();
    const [error,setError] = useState(false);

    useEffect( () =>{
        activationMail();        
    });


    const activationMail = async () => {
        try {
            if (seller_token) {
                console.log(seller_token);
                const res = await axios.post(`${server}/shop/activationShop`, { seller_token });
                console.log(res);
            }
        } catch (error) {
            console.log(error.response.data);
            setError(true);
        }
    };
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
                <p>Your  Shop has been created successfully</p>
            )
        }

    </div>
  )
}

export default SellerActivationPage