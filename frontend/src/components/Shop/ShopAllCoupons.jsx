import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const ShopAllCoupons = () => {
    
    const [open,setOpen] = useState(false); 

    const [name,setName] = useState("");
    const [value,setValue] = useState(null);
    const [minAmount,setMinAmount] = useState(null);
    const [maxAmount,setMaxAmount] = useState(null);
    const [selectedProduct,setSelectedProduct] = useState();

    const [coupons,setCoupons] = useState([]);


    const {products,isLoading} = useSelector((state) => state.product);
    const {shop} = useSelector((state) => state.shop);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(shop._id))
        axios.get(`${server}/coupon/get-coupon/${shop._id}`,{withCredentials: true})
        .then((res) =>{
            setCoupons(res.data.couponCodes);
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
        })
    },[dispatch])

    const handleDelete = async(id) =>{
        axios.delete(`${server}/coupon//delete-coupon/${id}`,{withCredentials: true})
        .then((res) =>{
            toast.success("coupon deleted successfully");
            window.location.reload();
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
            window.location.reload();
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await axios.post(`${server}/coupon/create-coupon`,{
            name,
            value,
            minAmount,
            maxAmount,
            selectedProduct,
            shop,
            shopId:shop._id
        },{withCredentials: true})
        .then((res) =>{
            toast.success("Coupon created successfully");
            setOpen(false);
            window.location.reload();
        })
        .catch((err) =>{
            toast.error(err.response.data.message);
        })
    }

    const columns = [
        {field:"id",headerName:"Product ID",minWidth:250,flex:0.7},
        {
            field:"name",
            headerName:"Name",
            minWidth:250,
            flex:1.4
        },
        {
            field:"discount",
            headerName:"Discount",
            minWidth:150,
            flex:0.6
        },
        {
            field:"Delete",
            flex:0.8,
            headerName:"Delete",
            minWidth:120,
            sortable:false,
            type:"number",
            renderCell:(params)=>{
               
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                )
            }
        }
    ];

    const row = [];

    coupons && coupons.forEach((item) => {
        row.push({
            id:item._id,
            name:item.name,
            discount:item.value + "%",
        });
    })

  return (
    <>
        {
            isLoading ? (
                <Loader/>
            ) : (
                <div className='w-full mx-8 pt-1 mt-10 bg-white'>
                    <div className='w-full flex justify-end'>
                        <div className = {`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                            onClick={() => setOpen(true)}
                        >
                            <span className='text-[#fff]'>Create Coupon Code</span>
                        </div>
                    </div>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />   

                    {
                        open && (
                            <div className='fixed top-0 left-0 w-full h-screen z-[2000] bg-[#00000062] flex items-center justify-center'>
                                <div className='w-[90%] 800px:w-[40%] h-[96vh] bg-white rounded-md shadow p-4'>
                                    <div className='w-full flex justify-end'>
                                        <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)}/>
                                    </div>
                                    <h5 className='text-[30px] font-Poppins text-center'>Create Coupon Code</h5>
                                    <form onSubmit={handleSubmit} aria-required={true} >
                                        <br/>
                                        <div>
                                            <label className='pb-2'>
                                                Name <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name='name'
                                                required
                                                value={name}
                                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                placeholder='Enter your coupon name...'
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <br/>
                                        <div>
                                            <label className='pb-2'>
                                                Discount Percentage <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name='value'
                                                value={value}
                                                required
                                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                placeholder='Enter your discount percentage...'
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <br/>
                                        <div>
                                            <label className='pb-2'>
                                                Min Amount 
                                            </label>
                                            <input
                                                type="number"
                                                name='minAmount'
                                                value={minAmount}
                                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                placeholder='Enter your code min amount...'
                                                onChange={(e) => setMinAmount(e.target.value)}
                                            />
                                        </div>
                                        <br/>
                                        <div>
                                            <label className='pb-2'>
                                                Max Amount 
                                            </label>
                                            <input
                                                type="number"
                                                name='maxAmount'
                                                value={maxAmount}
                                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                                placeholder='Enter your code min amount...'
                                                onChange={(e) => setMaxAmount(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className='pb-2'>
                                                Selected Product <span className='text-red-500'>*</span>
                                            </label>
                                            <select className='w-full h-[35px] mt-2 border rounded-[5px]'
                                                onChange={(e) => setSelectedProduct(e.target.value)}
                                                value = {selectedProduct}
                                            >
                                                <option value="" disabled>Choose a Product</option>
                                                {
                                                    products?.map( (data) => (
                                                        <option value={data.name} key = {data.name}>
                                                            {data.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <br/>
                                        <div>
                                            <input
                                                type='submit'
                                                value='Create'
                                                className='mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }  
                </div>
            )
        }
    </>
  )
}

export default ShopAllCoupons