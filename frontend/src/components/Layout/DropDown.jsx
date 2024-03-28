import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles';

const DropDown = ({categoriesData,setDropDown}) => {
    const navigate = useNavigate();

    const submitHandle = (data) => {
        navigate(`/products?category=${data.title}`);
        setDropDown(false);
        window.location.reload();
    }
  return (
    <div className='absolute pb-4 w-[270px] bg-[#fff] z-30  shadow-sm rounded-b-md'>
        {
            categoriesData?.map( (data,index) => (
                <div 
                   key={index} 
                   className={`${styles.noramlFlex}`}
                   onClick={()=>submitHandle(data)}
                >
                    <img 
                        src={data.image_Url}
                        alt=''
                        style={{
                            width: '25px',
                            height: '25px',
                            objectFit: 'contain',
                            marginLeft: '10px',
                            userSelect: 'none',
                        }}
                    />
                    <h3 className='m-3 cursor-pointer select-none'>{data.title}</h3>
                </div>
            ))
        }
    </div>
  )
}

export default DropDown