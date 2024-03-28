import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllOrdersUser } from '../../redux/actions/order'

const TrackOrder = () => {
    const {user} = useSelector((state) => state.user)
    const {orders} = useSelector((state) => state.order)
    const dispatch = useDispatch()

    const {id} = useParams()

    useEffect(() => {
        dispatch(getAllOrdersUser(user._id))
    },[dispatch])

    const data = orders && orders.find((item) => item._id === id)
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
        <>
            {
                data && data?.status === "Processing" ? (
                    
                        <h1 className='text-[20px]'>Your Order is Processing in shop</h1>
                ) : (
                    data?.status === "Transferred to delivery partner" ? (
                        <h1 className='text-[20px]'>Your Order is Transferred to delivery partner</h1>
                    ) : (
                        data?.status === 'Shipping' ? (
                            <h1 className='text-[20px]'>Your Order is Shipping</h1>
                        ) : (
                            data?.status === "Received" ? (
                                <h1 className='text-[20px]'>Your Order is in your city.Our Delivery man will deliver it today</h1>
                            ) : (
                                data?.status === "On the way" ? (
                                    <h1 className='text-[20px]'>our Delivery man is on the way</h1>
                                ) : (
                                    data?.status === "Delivered" ? (
                                        <h1 className='text-[20px]'>Your Order is Delivered</h1>
                                    ) : (
                                        null
                                    )
                                )
                            )
                        )
                    )
                )
            }
        </>
    </div>
  )
}

export default TrackOrder