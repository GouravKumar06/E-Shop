import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
import ShopAllCoupons from '../../components/Shop/ShopAllCoupons.jsx'
const ShopAllCouponsPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {9}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllCoupons/>  
        </div>
      </div>
    </div>
  )
}

export default ShopAllCouponsPage