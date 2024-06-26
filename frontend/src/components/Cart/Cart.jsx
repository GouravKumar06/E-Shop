import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles';
import {IoBagHandleOutline} from 'react-icons/io5';
import {HiOutlineMinus, HiPlus} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { toast } from 'react-toastify';

const Cart = ({setOpenCart}) => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (data) =>{
        dispatch(removeFromCart(data));
    }

    const totalPrice = cart.reduce( 
        (acc,item) => acc + item.qty * item.discountPrice, 0 
    )

    const quantityChangeHandler = (data) =>{
        dispatch(addToCart(data));
    }

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] '>
        <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
            <div>
                <div className='flex justify-end pt-5 w-full pr-5 '>
                    <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpenCart(false)}/>
                </div>

                <div className={`${styles.noramlFlex} p-4`}>
                    <IoBagHandleOutline size={25} />
                    <h5 className='pl-2 text-[20px] font-[500]'>
                        {cart?.length} Items
                    </h5>
                </div>

                <br/>
                <div>
                    {
                        cart?.map((i,index) =>(
                            <CartSingle key={index} data={i} quantityChangeHandler = {quantityChangeHandler} removeFromCartHandler = {removeFromCartHandler} />
                        ))
                    }
                </div>
            </div>

            <div className='px-5 mb-3'>
                <Link to="/checkout">
                    <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                        <h1 className='text-[#fff] text-[18px] font-[600]'>
                            CheckOut Now (USD{totalPrice})
                        </h1>
                    </div>

                </Link>
            </div>
        </div>
    </div>
  )
}

const CartSingle = ({data,quantityChangeHandler,removeFromCartHandler}) => {
    const [value,setValue] =useState(data.qty);
    const totalPrice = data.discountPrice * value;

    const increment = (data) =>{
        if(data.stock < value)
        {
            toast.error("Product out of stock");
        }
        else{
            setValue(value + 1)
            const updateCartData = { ...data,qty:value + 1 }
            quantityChangeHandler(updateCartData)
        }
    }

    const decrement = (data) =>{
        setValue(value === 1 ? 1 : value - 1);
        const updateCartData = { ...data,qty: value === 1 ? 1 : value - 1 }
        quantityChangeHandler(updateCartData)
    }

    return(
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer `}
                        onClick={() => increment(data)}
                    >
                        <HiPlus  size={18} color="#fff"/>
                    </div>

                    <span className='pl-[10px]'>
                        {value}
                    </span>

                    <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex justify-center cursor-pointer items-center'
                        onClick={() => decrement(data)}
                    >
                        <HiOutlineMinus size={16} color='#7d879c'/> 
                    </div>
                </div>

                <img src={`${backend_url}${data.images[0]}`} alt='cartImage'
                className='w-[80px] h-[80px] ml-4 mr-2 !rounded-[5px]'/>

                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discountPrice} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1 className='cursor-pointer' size={15} onClick={() => removeFromCartHandler(data)}/>
            </div>
        </div>
    )
}

export default Cart