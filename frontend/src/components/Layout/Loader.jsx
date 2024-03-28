import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../Assests/animations/Animation - 1705508396380.json';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Lottie options={defaultOptions} height={300} width={300}/>
        </div>
    )
}

export default Loader;