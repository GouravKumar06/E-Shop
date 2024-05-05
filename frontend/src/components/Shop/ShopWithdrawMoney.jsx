import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersShop } from '../../redux/actions/order';
import { getAllProductsShop } from '../../redux/actions/product';
import styles from '../../styles/styles';

const ShopWithdrawMoney = () => {

    const dispatch = useDispatch();
    const {shop} = useSelector((state) => state.shop)
    const {orders} = useSelector((state) => state.order);
    const [deliveredOrder, setDeliveredOrder] = useState(null);

    useEffect(() => {
        dispatch(getAllOrdersShop(shop._id))
        // dispatch(getAllProductsShop(shop._id))

        const orderData = orders && orders.filter((order) => order.status === "Delivered");
        setDeliveredOrder(orderData)

    },[dispatch,orders,shop._id]);

    const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

    const serviceCharge = totalEarningWithoutTax * 0.1;

    const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2); 

  return (
    <div className='w-full h-[90vh] p-8'>
        <div className='w-full bg-white h-full rounded flex items-center justify-center flex-col'>
            <h5 className='text-[20px] pb-3'>Available Balance: ${availableBalance}</h5>
            <div className={`${styles.button} text-white !h-[42px] !rounded`}>
                Withdraw
            </div>
        </div>
    </div>
  )
}

export default ShopWithdrawMoney