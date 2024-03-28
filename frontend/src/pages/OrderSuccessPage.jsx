import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Lottie from 'react-lottie';
import animationData from '../Assests/animations/107043-success.json';
const OrderSuccessPage = () => {
  return (
    <div>
        <Header/>
        <Success/>
        <Footer/>
    </div>
  )
};


const Success = () => {

    const defaultOptions = {
        loop:false,
        autoplay:true,
        animationData:animationData,
        rendererSettings:{
            preserveAspectRatio:"xMidYMid slice"
        }
    }
    return (
        <div>
            <Lottie options={defaultOptions} height={300} width={300}/>
            <h5 className='text-center mb-14 text-[25px] text-[#000000a1]'>
                Your order is successfull 😍
            </h5>
        </div>
    )
}

export default OrderSuccessPage