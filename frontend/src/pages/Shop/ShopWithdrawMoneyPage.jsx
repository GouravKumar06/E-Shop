import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
import ShopWithdrawMoney from '../../components/Shop/ShopWithdrawMoney'
const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {7}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopWithdrawMoney/>  
        </div>
      </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage