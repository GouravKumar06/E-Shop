import React from 'react'
import DashboardHeader from '../../components/Shop/DashboardHeader'
import DashboardSideBar from '../../components/Shop/DashboardSideBar'
import CreateProduct from '../../components/Shop/CreateProduct'
const ShopCreateProductPage = () => {
  return (
     <div>
      <DashboardHeader/>
      <div className='flex items-center justify-between w-full'>
        <div className='800px:w-[330px] w-[80px]'>
          <DashboardSideBar active = {4}/>
        </div>
        <div className='w-full justify-center flex'>
            <CreateProduct/>
        </div>
      </div>
    </div>
  )
}

export default ShopCreateProductPage