import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar';
import ShopAllEvents from '../../components/Shop/ShopAllEvents';
const ShopAllEventsPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {5}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllEvents/>  
        </div>
      </div>
    </div>
  )
}


export default ShopAllEventsPage