import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsFillBagFill } from 'react-icons/bs';
import styles from '../../styles/styles';
import { backend_url, server } from '../../server';
import { getAllOrdersUser } from '../../redux/actions/order';
import { RxCross1 } from 'react-icons/rx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserOrderDetailPage = () => {
  const {orders} = useSelector(state=>state.order);
    const {user} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const [status,setStatus] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getAllOrdersUser(user._id))
    },[dispatch])

    const data = orders && orders.find(item=>item._id === id);

    const reviewHandler = async(e)=>{
        await axios.put(`${server}/product/create-new-review`,{
            productId : selectedItem?._id,
            user,
            rating,
            comment,
            orderId : id
        },{withCredentials:true})
        .then((res)=>{
            toast.success(res.data.message);
            dispatch(getAllOrdersUser(user._id))
            setOpen(false);
            setRating(1);
            setComment("");
        })
        .catch((error)=>{
            toast.error(error)
        })
    }

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className='w-full flex items-center justify-between'>
            <div className='flex items-center'>
                <BsFillBagFill size={30} color='crimson'/>
                <h1>Order Details</h1>
            </div>
           
        </div>

        <div className='w-full flex items-center justify-between pt-6'>
            <h5>
                Order ID : <span>#{data?._id?.slice(0,8)}</span>
            </h5>
            <h5 className='text-[#00000084]'>
                Placed on: <span>{data?.createdAt?.slice(0,10)}</span>
            </h5>
        </div>
        <br/>
        <br/>
        {
            data && data?.cart.map((item,index) => (
                <div className='w-full flex items-start mb-5'>
                    <img src={`${backend_url}/${item.images[0]}`} alt=''
                        className='w-[80px] h-[80px] mr-2 object-cover rounded-[5px]'
                    />

                    <div className='w-full'>
                        <h5 className='text-[20px] pl-3'>{item.name}</h5>
                        <h5 className='text-[20px] pl-3 text-[#00000091]'>US${item.discountPrice} * {item.qty}</h5>
                    </div>
                    {
                        item.isReviewed ? (
                            null
                        ) : 
                        (
                            data?.status === "Delivered" && (
                                <div className={`${styles.button} text-[#fff]`}
                                    onClick={ () => setOpen(true) || setSelectedItem(item) }
                                >
                                    Write a Review 
                                </div>
                            )
                        )
                    }
                </div>
            ))
        }

        {
            open && (
                <div className='w-full h-screen bg-[#0005] fixed top-0 left-0 z-50 flex items-center justify-center'>
                    <div className='w-[50%] h-min p-3 shadow bg-white rounded-md'>
                        <div className='w-full flex justify-end p-3'>
                            <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)}/>
                        </div>
                        <h2 className='text-[25px] font-[500] font-Poppins text-center'>
                            Give a Review
                        </h2>
                        <br/>
                        <div className='w-full flex'>
                            <img src={`${backend_url}/${selectedItem?.images[0]}`} alt='' className='w-[80px] h-[80px]'/>
                            <div>
                                <div className='text-[20px] pl-3'>
                                    {selectedItem?.name}
                                </div>
                                <h4 className='pl-3 text-[20px]'>
                                    US${selectedItem?.discountPrice} x {selectedItem?.qty}
                                </h4>
                            </div>
                        </div>

                        <br/>

                        <h5 className='text-[20px] pl-3 font-[500]'>
                            Give a Rating <span className='text-red-500'>*</span>
                        </h5>
                        <div className='w-full flex ml-2 pt-1'>
                            {
                                [1,2,3,4,5].map((i) => (
                                    rating >= i ? (
                                        <AiFillStar
                                            key={i}
                                            onClick={() => setRating(i)}
                                            className='mr-1 cursor-pointer'
                                            size={30}
                                            color='rgba(246,186,0)'
                                        />
                                    ) : (
                                        <AiOutlineStar
                                            key={i}
                                            onClick={() => setRating(i)}
                                            className='mr-1 cursor-pointer'
                                            size={30}
                                            color='rgba(246,186,0)'
                                        />
                                    )
                                ))
                            }
                        </div>

                        <br/>

                        <div className='w-full ml-3'>
                            <label className='text-[20px] block font-[500]'>
                                Write a comment
                                <span className='ml-1 font-[400] text-[16px] text-[#00000052]'>
                                    (optional)
                                </span>
                            </label>
                            <textarea 
                                name="comment"
                                id=''
                                cols="20"
                                rows="5"
                                className='mt-2 w-[95%] border p-2 outline-none'
                                placeholder='How was your experience with this product?'
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div 
                            className={`${styles.button} text-[#fff] text-[20px] ml-3`}
                            onClick={rating > 1 ? reviewHandler : null}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            )
        }

        <div className='w-full border-t text-right'>
            <h5 className='text-[20px] pt-3'>
                Total Price : <strong>US${data?.totalPrice}</strong>
            </h5>
        </div>

        <br/>
        <br/>

        <div className='w-full 800px:flex items-center'>
            <div className='w-full 800px:w-[60%]'>
                <h4 className='text-[20px] pt-3 font-[600]'>Shipping Address:</h4>
                <h4>
                    {
                        data?.shippingAddress?.address1 + " " + data?.shippingAddress?.address2 
                    }
                </h4>
                <h4 className='text-[20px]'>{data?.shippingAddress?.country}</h4>
                <h4 className='text-[20px]'>{data?.shippingAddress?.city}</h4>
                <h4 className='text-[20px]'>{data?.user?.phoneNumber}</h4>
            </div>
            <div className='w-full 800px:w-[40%]'>
                <h4 className='text-[20px] pt-3'>Payment Info:</h4>
                <h4>
                    Status :{
                        data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"
                    }
                </h4>
            </div>
        </div>
         
        <br/>
        <Link to="/"> 
            <div className={`${styles.button} text-white`}>
                Send Message    
            </div> 
        </Link>

        
    </div>
  )
}

export default UserOrderDetailPage 