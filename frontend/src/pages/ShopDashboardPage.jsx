import React from 'react';
import DashboardHeader from '../components/Shop/DashboardHeader';
import DashboardSideBar from '../components/Shop/DashboardSideBar';
import DashboardHero from '../components/Shop/DashboardHero';
const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-start justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {1}/>
        </div>
        <DashboardHero/>
      </div>
     
    </div>
  )
}

export default ShopDashboardPage