import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiOutlineMessage,AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from '../../../server';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';


const ProductDetailsCard = ({setOpen,data}) => {

    const {cart} = useSelector((state)=>state.cart);
    const {wishlist} = useSelector((state)=>state.wishlist);
    const dispatch = useDispatch();

    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    // const [select,setSelect] = useState(false);

    const handleMessageSubmit = () =>{

    }

    const decrementCount = () =>{
        if(count > 1)
        {
            setCount(count - 1);
        }
    }

    const incrementCount = () =>{
        
        setCount(count + 1);
        
    }

    const addToCartHandler = (id) =>{
        const isItemExists = cart && cart.find((i) => i._id === id);
        if(isItemExists)
        {
            toast.error("Item already in cart!");
        }
        else{
            if(data.stock < count)
            {
                toast.error("Product out of stock");                
            }
            else{
                const cartData = { ...data,qty:count}
                dispatch(addToCart(cartData));
                toast.success("Item added to cart!");
            }
        }
    }

    useEffect(()=>{
        if(wishlist && wishlist.find((i) => i._id === data._id)){
            setClick(true);
        }
        else{
            setClick(false);
        }
    },[wishlist])

    const removeFromWishlistHandler = (data) =>{
        setClick(!click);
        dispatch(removeFromWishlist(data));
    }

    const addToWishlistHandler = (data) =>{
        setClick(!click);
        dispatch(addToWishlist(data));
    }

  return (
    <div className='bg-[#fff]'>
        {
            data ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                    <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
                        <RxCross1 size={30} className='absolute top-3 right-3 z-50'
                            onClick={() => setOpen(false)}
                        />

                        <div className='block w-full 800px:flex'>
                            <div className='w-full 800px:w-[50%]'>
                                <img src = {`${backend_url}${data?.images && data?.images[0]}`} alt='item' className='w-full mt-7'/>
                                <div className='flex'>
                                    <img src={`${backend_url}${data.shop.avatar}`} alt='avatar'
                                        className='w-[50px] h-[50px] rounded-full mr-2 mt-3 border-red-500'
                                    />
                                    <div>
                                        <Link to = {`/shop/preview/${data?.shop._id}`} className={`${styles.shop_name}`}> 
                                            <h5 className=' mt-3'>{data.shop.name}</h5>
                                        </Link>
                                        <h5 className='pb-3 text-[15px]'>
                                            ({data.shop.ratings}) Ratings
                                        </h5>
                                    </div>
                                </div>

                                <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                                    onClick={handleMessageSubmit}
                                >
                                    <span className='text-[#fff] flex items-center'>
                                        Send Message <AiOutlineMessage className='ml-1'/>
                                    </span>
                                </div>
                                <h5 className='text-[16px] text-[red] mt-5'>
                                    ({data.sold_out}) Sold out
                                </h5>
                            </div>

                            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                                <h1 className={`${styles.productTitle} text-[20px]`}>
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>

                                <div className='flex pt-3'>
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data.discountPrice}$
                                    </h4>
                                    <h3 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + "$" :null} </h3>
                                </div>

                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button onClick={decrementCount}
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        >
                                            -
                                        </button>
                                        <span className='bg-gray-200 text-gray-500 font-medium px-4 py-[9px]'>
                                            {count}
                                        </span>
                                        <button onClick={incrementCount}
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div>
                                        {
                                        click ? (
                                            <AiFillHeart
                                                size={30}
                                                className='cursor-pointer '
                                                onClick={() => removeFromWishlistHandler(data)}
                                                color='red'
                                                title='Remove from wishlist'
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className='cursor-pointer'
                                                onClick={() => addToWishlistHandler(data)}
                                                title='Add to wishlist'
                                            />
                                        )
                                    }
                                    </div>    
                                </div>

                                <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                    onClick={() => addToCartHandler(data?._id)}
                                >
                                    <span className='text-[#fff] flex items-center'>
                                        Add to Cart <AiOutlineShoppingCart className='ml-1'/>
                                    </span>
                                </div>

                            </div>    
                        </div>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ProductDetailsCard