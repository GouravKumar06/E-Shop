import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard'
import { backend_url } from '../../../server';
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/actions/cart';
import Ratings from '../../Products/Ratings';

const ProductCard = ({data}) => {

    const {wishlist} = useSelector((state)=>state.wishlist);
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    // const d = data.name;
    // const product_name = d.replace(/\s+/g, '-');

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

    const addToCartHandler = (id) =>{
        const isItemExists = cart && cart.find((i) => i._id === id);
        if(isItemExists)
        {
            toast.error("Item already in cart!");
        }
        else{
            if(data.stock < 1)
            {
                toast.error("Product out of stock");                
            }
            else{
                const cartData = { ...data,qty:1}
                dispatch(addToCart(cartData));
                toast.success("Item added to cart!");
            }
        }
    }

  return (
    <>
        <div className='h-[370px] w-full bg-white rounded-lg shadow-sm  relative cursor-pointer'>
            <div className='flex justify-end'>
                
            </div>

            <Link to={`/product/${data?._id}`}>
                <img src={`${backend_url}${data?.images && data?.images[0]}`} alt="" className='w-full h-[170px] object-fill' /> 
            </Link>

            <Link to = {`/shop/preview/${data?.shop._id}`} className={`${styles.shop_name}`}> 
                <h5 className='pl-3'>{data.shop.name}</h5>
            </Link>

            <Link to={`/product/${data?._id}`} >
                <h4 className='pb-3 font-[500] pl-3'>
                    {data.name.length > 40 ? data.name.slice(0,40) + "..." : data.name}
                </h4>

                <div className='flex pl-3'>
                    <Ratings rating={data?.ratings}/>
                </div>

                <div className='py-2 flex items-center justify-between'>
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice} pl-3`}>
                            {
                                data.originalPrice === 0 ? data.originalPrice : data.discountPrice
                            }
                            $
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {
                                // data.price ? data.price + "$" :null
                                data.originalPrice ? data.originalPrice + "$" :null
                            }
                        </h4>
                    </div>

                    <span className='font-[400] text-[17px] text-[#68d284] pr-3'>
                        {/* {data.total_sell} sold */}
                        {data?.sold_out} sold
                    </span>
                </div>
            </Link>

            <div>
                {
                    click ? (
                        <AiFillHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => removeFromWishlistHandler(data)}
                            color='red'
                            title='Remove from wishlist'
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => addToWishlistHandler(data)}
                            title='Add to wishlist'
                            color='red'
                        />
                    )
                }

                <AiOutlineEye
                    size={22}
                    className="cursor-pointer absolute right-2 top-14"
                    onClick={() => setOpen(!open)}
                    color="red"
                    title="Quick view"
                />

                <AiOutlineShoppingCart
                    size={25}
                    className="cursor-pointer absolute right-2 top-24"
                    onClick={() => addToCartHandler(data._id)}
                    color="red"
                    title="Add to cart"
                />
                {
                    open ? (
                        <ProductDetailsCard open={open} setOpen = {setOpen} data={data} />
                    ) : null
                }
            </div>

        </div>
    </>
  )
}

export default ProductCard;