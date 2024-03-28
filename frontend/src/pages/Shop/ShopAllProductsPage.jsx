import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar';
import ShopAllProducts from '../../components/Shop/ShopAllProducts';

const ShopAllProductsPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {3}/>
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllProducts/>  
        </div>
      </div>
    </div>
  )
}

export default ShopAllProductsPage