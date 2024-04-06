import React from 'react'
import ShopSettings from '../../components/Shop/ShopSettings'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex items-start justify-between w-full'>
          <div className='800px:w-[330px] w-[80px]'>
            <DashboardSideBar active = {11}/>
          </div>
          <ShopSettings/>
        </div>    
    </div>
  )
}

export default ShopSettingsPage