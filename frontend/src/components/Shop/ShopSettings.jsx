import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../../styles/styles'
import axios from 'axios'
import { loadShop } from '../../redux/actions/user'
import { toast } from 'react-toastify'

const ShopSettings = () => {
    const {shop} = useSelector((state) => state.shop);
    const [avatar,setAvatar] = useState();
    const [name,setName] = useState(shop?.name);
    const [description,setDescription] = useState(shop?.description ? shop?.description : '');
    const [address, setAddress] = useState(shop?.address);
    const [phoneNumber, setPhoneNumber] = useState(shop?.phoneNumber);
    const [zipCode, setZipCode] = useState(shop?.zipCode);
    const dispatch = useDispatch();


    const handleImage = async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();

        formData.append("file", e.target.files[0]);


        await axios.put(`${server}/shop/update-shop-avatar`, formData, {
           headers: {
               "Content-Type": "multipart/form-data",
           },
           withCredentials: true,
        })
        .then((res) =>{
            dispatch(loadShop());
            toast.success("Image updated successfully");
        })
        .catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message);
        })
    }

    const updateHandler = async(e)=>{
        e.preventDefault();

        await axios.put(`${server}/shop/update-shop`,{
            name,
            description,
            address,
            phoneNumber,
            zipCode,
        },{withCredentials: true})
        .then((res) =>{
            toast.success("Shop info updated successfully");
            dispatch(loadShop());
        })
        .catch((error)=>{
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        })
    }

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
        <div className='w-full flex 800px:w-[80%] justify-center flex-col my-5'>
            <div className='w-full flex items-center justify-center'>
                <div className='relative'>
                    <img src={ `${backend_url}/${shop.avatar}`} alt="" className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'/>
                    <div className='w-[30px] h-[30px] rounded-full bg-[#E3E9EE] flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                        <input type='file' 
                            id='image' 
                            className='hidden'
                            onChange={(e)=>handleImage(e)}
                        />
                        <label htmlFor='image'>
                            <AiOutlineCamera/>
                        </label>    
                    </div>
                </div>
            </div>


            {/* SHOP INFO FORM */}
            <form aria-required={true}  className='flex flex-col items-center ' onSubmit={updateHandler} >

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <div className='w-full pl-[3%]'> 
                        <label className='block pb-2'>
                            Shop Name
                        </label>
                    </div>
                    <input
                        type='name'
                        placeholder={`${shop.name}`}
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <div className='w-full pl-[3%]'> 
                        <label className='block pb-2'>
                            Shop Description
                        </label>
                    </div>
                    <input
                        type='name'
                        placeholder={`${shop.description ? shop.description : 'Enter your shop description'}`}
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <div className='w-full pl-[3%]'> 
                        <label className='block pb-2'>
                            Shop Address
                        </label>
                    </div>
                    <input
                        type='name'
                        placeholder={`${shop.address}`}
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <div className='w-full pl-[3%]'> 
                        <label className='block pb-2'>
                            Shop Phone Number
                        </label>
                    </div>
                    <input
                        type='number'
                        placeholder={`${shop.phoneNumber}`}
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <div className='w-full pl-[3%]'> 
                        <label className='block pb-2'>
                            Shop Zip Code
                        </label>
                    </div>
                    <input
                        type='number'
                        placeholder={`${shop.zipCode}`}
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>

                <div className='800px:w-[50%] w-[100%] mt-5 flex items-center flex-col'>
                    <input
                        type='submit'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-pointer bg-[#f63b60]`}
                        required
                        readOnly
                        value="Update Shop"
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default ShopSettings