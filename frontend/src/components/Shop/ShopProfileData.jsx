import React, { useEffect, useState } from 'react'
import ProductCard from '../Route/ProductCard/ProductCard';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../redux/actions/product';


const ShopProfileData = ({isOwner}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAllProductsShop(id))
    }, [dispatch])

    const [active,setActive] = useState(1);

  return (
    <div className='w-full'>
        <div className='w-full flex items-center justify-between'>
            <div className='w-full flex'>
                <div className='flex items-center' 
                    onClick={() => setActive(1)}
                >
                    <h5 className={`text-[20px] font-[600] ${active === 1 ? 'text-red-500' : 'text-[#555]'} cursor-pointer pr-[20px]`}>
                        Shop Products
                    </h5>
                </div>
                <div className='flex items-center'
                    onClick={() => setActive(2)}
                >
                    <h5 className={`text-[20px] font-[600] ${active === 2 ? 'text-red-500' : 'text-[#555]'} cursor-pointer pr-[20px]`}>
                        Running Events
                    </h5>
                </div>
                <div className='flex items-center'
                    onClick={() => setActive(3)}
                >
                    <h5 className={`text-[20px] font-[600] ${active === 3 ? 'text-red-500' : 'text-[#555]'} cursor-pointer pr-[20px]`}>
                        Shop Reviews
                    </h5>
                </div>
            </div>

            <div>
                {
                    isOwner && (
                        <div>
                            <Link to="/dashboard">
                                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                                    <span className='text-[#fff]'>Go Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    )
                }
            </div>

        </div>

        <br/>

        {
            active === 1 && (
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0'>
                    {
                        products && products.map((data,index) => <ProductCard data={data} key={index} isShop={true}/>)
                    }
                </div>
            )
        }
      
    </div>
  )
}

export default ShopProfileData