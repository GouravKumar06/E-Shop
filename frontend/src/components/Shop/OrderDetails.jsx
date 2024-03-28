import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersShop } from '../../redux/actions/order'
import { backend_url, server } from '../../server'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrderDetails = () => {

    const {orders,isLoading} = useSelector(state=>state.order);
    const {shop} = useSelector(state=>state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status,setStatus] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getAllOrdersShop(shop._id))
    },[dispatch])

    const data = orders && orders.find(item=>item._id === id);

    const orderUpdateHandler = async(e)=>{
        e.preventDefault();
        await axios.put(`${server}/order/update-order-status/${id}`,{status},{
          withCredentials:true,  
        })
        .then((res)=>{
            toast.success("Order status updated successfully");
            navigate("/dashboard-orders");
        })   
        .catch((error)=>{
            console.log(error);
        })  
    } 

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className='w-full flex items-center justify-between'>
            <div className='flex items-center'>
                <BsFillBagFill size={30} color='crimson'/>
                <h1>Order Details</h1>
            </div>
            <Link to="/dashboard-orders">
                <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]   `}>
                    Order List
                </div>
            </Link>
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
                </div>
            ))
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
                        data?.paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid"
                    }
                </h4>
            </div>
        </div>
        <br/>
        <br/>
        <h4 className='text-[20px] pt-3 font-[600]'>
            Order Status:
        </h4>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} 
            className='mt-2 border h-[35px] rounded-[5px]'
        >
            {
                [
                    "Processing",
                    "Transferred to delivery partner",
                    "Delivered",
                    "Shipping",
                    "Received",
                    "On the way",
                ]
                .slice(
                    [
                        "Processing",
                        "Transferred to delivery partner",
                        "Delivered",
                        "Shipping",
                        "Received",
                        "On the way",
                    ].indexOf(data?.status)
                ).map((option,index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
        <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px] mt-5  `} onClick={orderUpdateHandler}>
            Update Status
        </div>
    </div>
  )
}

export default OrderDetails