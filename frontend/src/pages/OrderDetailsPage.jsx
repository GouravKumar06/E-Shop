import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer';
import UserOrderDetail from '../components/User/UserOrderDetail'

const OrderDetailsPage = () => {
  return (
    <div>
        <Header/>
        <UserOrderDetail/>
        <Footer/>
    </div>
  )
}

export default OrderDetailsPage