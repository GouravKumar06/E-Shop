import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles';
import {BsCartPlus} from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/wishlist';
import { backend_url } from '../../server';
import { addToCart } from '../../redux/actions/cart';
const Wishlist = ({setOpenWishlist}) => {

    const {wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) =>{
        dispatch(removeFromWishlist(data));
    }

    const addToCartHandler = (data) =>{
        setOpenWishlist(false);
        const newData = {...data, qty: 1};
        dispatch(addToCart(newData));
    }
  return (
    <div className='fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] '>
        <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
            <div>
                <div className='flex justify-end pt-5 w-full pr-5 '>
                    <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpenWishlist(false)}/>
                </div>

                <div className={`${styles.noramlFlex} p-4`}>
                    <AiOutlineHeart size={25} />
                    <h5 className='pl-2 text-[20px] font-[500]'>
                        {wishlist?.length} Items
                    </h5>
                </div>

                <br/>
                <div>
                    {
                        wishlist?.map((i,index) =>(
                            <CartSingle key={index} data={i} 
                                removeFromWishlistHandler={removeFromWishlistHandler}
                                addToCartHandler={addToCartHandler}
                            />
                        ))
                    }
                </div>
            </div>

        </div>
    </div>
  )
}

const CartSingle = ({data,removeFromWishlistHandler,addToCartHandler}) => {
    const [value,setValue] =useState(1);
    const totalPrice = data.discountPrice * value;

    return(
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross1 className='cursor-pointer'
                   onClick={() => removeFromWishlistHandler(data)}
                />
                <img src={`${backend_url}${data?.images[0]}`}alt='cartImage'
                className='w-[80px] h-[80px] ml-4 mr-2 rounded-[5px]'/>

                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discountPrice} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                        US${totalPrice}
                    </h4>
                </div>
                <div>
                    <BsCartPlus size={20} 
                        onClick={() => addToCartHandler(data)} 
                        className='cursor-pointer' title='Add To Cart'
                    />
                </div>
            </div>
        </div>
    )
}

export default Wishlist