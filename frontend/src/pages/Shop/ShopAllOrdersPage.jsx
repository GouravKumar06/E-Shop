import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
import ShopAllOrders from '../../components/Shop/ShopAllOrders'

const ShopAllOrdersPage = () => {
  return (
     <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {2}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllOrders/>  
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrdersPage