import React, { useEffect } from 'react'
import  ShopRegister  from '../components/Shop/ShopRegister'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ShopCreate = () => {
    const navigate = useNavigate();

    const {isSeller} = useSelector((state) => state.shop);


    useEffect(() => {
        if(isSeller === true)
        {
        navigate(`/dashboard`);
        }
    }, [isSeller, navigate]);
  return (
    <div>
        <ShopRegister/>
    </div>
  )
}

export default ShopCreate  