import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader';
import DashboardSideBar from '../../components/Shop/DashboardSideBar';
import ShopInbox from '../../components/Shop/ShopInbox';

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {8}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopInbox/>  
        </div>
      </div>
    </div>
  )
}

export default ShopInboxPage