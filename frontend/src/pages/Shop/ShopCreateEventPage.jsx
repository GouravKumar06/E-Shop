import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
import CreateEvent from '../../components/Shop/CreateEvent'

const ShopCreateEventPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-center justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {6}/>
        </div>
        <div className='w-full justify-center flex'>
            <CreateEvent/>
        </div>
      </div>
    </div>
  )
}

export default ShopCreateEventPage