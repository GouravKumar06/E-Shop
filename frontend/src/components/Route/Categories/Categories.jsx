import React from 'react'
import styles from '../../../styles/styles'
import { brandingData, categoriesData } from '../../../static/data'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className={`${styles.section} hidden sm:block`}>
            <div className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}>
                {
                    brandingData?.map((data,index) => (
                        <div className='flex items-center' key={index}>
                            {data.icon}
                            <div className='px-3'>
                                <h3 className='font-bold text-sm md:text-base'>
                                    {data.title}
                                </h3>
                                <p className='text-xs md:text-sm'>
                                    {data.Description}
                                </p>
                            </div>    
                        </div>    
                    ))
                }
            </div>
        </div>

        <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
            <div className='grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]'>
                {
                    categoriesData?.map( (data) => {
                        const handleSubmit = (data) => {
                            navigate(`/products?category=${data.title}`);
                        }
                        return (                            
                                <div className='w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden' 
                                    onClick={() => handleSubmit(data)} 
                                    key={data.id}
                                >
                                    <h5 className={`text-[18px] leading-[1.3]`}>{data.title}</h5>
                                    <img src={data.image_Url} alt='logo' className='w-[120px] object-cover'/>
                                </div>  
                             
                        )
                    })
                }   
               
            </div>
            
        </div>    
    </>
  )
}

export default Categories