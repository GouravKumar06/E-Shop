import React, { useEffect } from 'react';
import { useState } from 'react'
import { backend_url, server } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom';
import  {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { MdOutlineTrackChanges, MdTrackChanges } from 'react-icons/md';
import { deleteUserAddress, updateUserAddress, updateUserInformation } from '../../redux/actions/user';
import {toast} from 'react-toastify';
import axios from 'axios';
import {RxCross1} from "react-icons/rx";
import {Country,State,City} from 'country-state-city';
import { getAllOrdersUser } from '../../redux/actions/order';

const ProfileContent = ({active}) => {

    const dispatch = useDispatch();
    const {user,error} = useSelector((state) => state.user);
    const [name,setName] = useState(user && user.name);
    const [email,setEmail] = useState(user && user.email);
    const [phoneNumber,setPhoneNumber] = useState(user && user.phoneNumber);
    const [password,setPassword] = useState();
    const [avatar,setAvatar] = useState(null);

    useEffect(() => {
        if(error)
        {
            toast.error(error);
            dispatch({type:"clearErrors"});
        }
    },[error,dispatch,user]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(email,password,phoneNumber,name));
    }

    const handleImage = async(e) => {
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();

        formData.append("file", e.target.files[0]);

        await axios.put(`${server}/user/update-user-avatar`, formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        }).then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            toast.error(error);
        })
    }

  return (
    <div className='w-full'>

        {/* profile page */}
        {
            active === 1 && (
                <>
                    <div className='w-full flex justify-center'>
                        <div className='relative'>
                            <img src={`${backend_url}${user?.avatar}`} alt=''
                            className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                            />
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
                    <br/>
                    <div className='w-full px-5'>
                        <form onSubmit={handleSubmit} aria-required={true}>

                            <div className='w-full 800px:flex block pb-3'>
                                <div className='800px:w-[50%] w-[100%]'>
                                    <label className='block pb-2'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='800px:w-[50%] w-[100%]'>
                                    <label className='block pb-2'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='w-full 800px:flex block pb-3'>
                                <div className='800px:w-[50%] w-[100%]'>
                                    <label className='block pb-2'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='number'
                                        className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                
                                <div className='800px:w-[50%] w-[100%]'>
                                    <label className='block pb-2'>
                                        Enter your Password
                                    </label>
                                    <input
                                        type='password'
                                        className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>



                            <input
                                type='submit'
                                value='Update'
                                className={'w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer'}
                                required
                            />
                        </form>
                    </div>
                </>
            )
        }

        {/* orders page */}
        {
            active === 2 && (
                <div>
                    <AllOrders/>
                </div>
            )
        }

        {/* Refund Page */}
        {
            active === 3 && (
                <div>
                    <AllRefundOrders/>
                </div>
            )
        }

        {/* Track Orders Page */}
        {
            active === 5 && (
                <div>
                    <TrackOrder/>
                </div>
            )
        }

        {/* Change Password page */}
        {
            active === 6 && (
                <div>
                    <ChangePassword/>
                </div>
            )
        }

        {/* user Address */}
        {
            active === 7 && (
                <div>
                    <Address/>
                </div>
            )
        }


    </div>
  )
}

const AllOrders = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector((state)=> state.order);
    const {user} = useSelector((state)=> state.user);


    useEffect(()=>{
        dispatch(getAllOrdersUser(user._id));
    },[orders,user._id,dispatch]);


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // },

            // cellClassName: (params) => {
            //     return  params.status === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // }
        },

        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                <>
                    <Link to={`/user/order/${params.id}`}>
                    <Button>
                        <AiOutlineArrowRight size={20} />
                    </Button>
                    </Link>
                </>
                );
            },
        },
    ]

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
        });
    });
    return (
        <div className='pl-8 pt-1'>
           
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
           
        </div>
    )
}


const AllRefundOrders = () => {
    const orders = [
        {
            _id:"7463hvbfbhfbrtr28820221",
            orderItems:[
                {
                    name:"Iphone 14 pro max",
                },
            ],
            totalPrice:120,
            orderStatus:"Processing",
        }
    ]

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // },

            // cellClassName: (params) => {
            //     return  params.status === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // }
        },

        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                <>
                    <Link to={`/user/order/${params.id}`}>
                    <Button>
                        <AiOutlineArrowRight size={20} />
                    </Button>
                    </Link>
                </>
                );
            },
        },
    ]

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <div className='pl-8 pt-1'>
           
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
           
        </div>
    )

}

const TrackOrder = () =>{
    const dispatch = useDispatch();
    const {orders} = useSelector((state)=> state.order);
    const {user} = useSelector((state)=> state.user);


    useEffect(()=>{
        dispatch(getAllOrdersUser(user._id));
    },[orders,user._id,dispatch]);


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // },

            // cellClassName: (params) => {
            //     return  params.status === "Delivered"
            //     ? "greenColor"
            //     : "redColor";
            // }
        },

        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                <>
                    <Link to={`/user/track/order/${params.id}`}>
                    <Button>
                        <MdTrackChanges size={20} />
                    </Button>
                    </Link>
                </>
                );
            },
        },
    ]

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
        });
    });

    return (
        <div className='pl-8 pt-1'>
           
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
           
        </div>
    )
}

const ChangePassword = () =>{
 
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const passwordChangeHandler = async(e) =>{
        e.preventDefault();
        await axios.put(`${server}/user/update-password`,{oldPassword,newPassword,confirmPassword},{
            withCredentials: true
        })
        .then((res)=>{
            toast.success(res.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        })
        .catch((error)=>{
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        })
    }
    return (
        <div className='w-full px-5'>
            <h1 className='block text-center text-[25px] font-[600] text-[#000000ba] pb-2'>
                Change Password
            </h1>
            <div className='w-full'>
                <form aria-required onSubmit={passwordChangeHandler} className='flex flex-col items-center'>

                    <div className='800px:w-[50%] w-[100%] mt-5'>
                        <label className='block pb-2'>
                            Enter your old password
                        </label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className='800px:w-[50%] w-[100%] mt-2'>
                        <label className='block pb-2'>
                            Enter your new password
                        </label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className='800px:w-[50%] w-[100%] mt-2'>
                        <label className='block pb-2'>
                            Enter your confirm password
                        </label>
                        <input
                            type='password'
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            type='submit'
                            value='Update'
                            className={'w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer'}
                            required
                        />
                    </div>
                    
                </form>    
            </div>    
            
        </div>
    )
}

const Address = () =>{
    const [open,setOpen] = useState(false);
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [zipCode,setZipCode] = useState();
    const [address1,setAddress1] = useState("");
    const [address2,setAddress2] = useState("");
    const [addressType,setAddressType] = useState("");

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
        {
            name:"Default",
        },
        {
            name:"Home"
        },
        {
            name:"Office"
        }
    ]
    
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(addressType === "" || country === "" || city === "")
        {
            toast.error("Please fill all fields");
        }
        else{
            dispatch(updateUserAddress(address1,address2,city,country,addressType,zipCode));
            setOpen(false);
            setCountry("");
            setCity("");
            setZipCode(null);
            setAddress1("");
            setAddress2("");
            setAddressType("");
        }
    }

    const handleDelete = (item) => {
        dispatch(deleteUserAddress(item._id));
        toast.success("Address deleted successfully");
    }

    return (
        <div className='w-full px-5'>
            {
                open && (
                    <div className='fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center'>
                        <div className='w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll'>
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1 
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={()=>setOpen(false)}
                                />
                            </div>
                            <h1 className='text-center text-[25px] font-Poppins'>
                                Add New Address
                            </h1>
                            <div className='w-full'>
                                <form aria-required onSubmit={handleSubmit} className='w-full'>
                                    <div className='w-full block p-4'>
                                        <div className='w-full pb-2'>
                                            <label className='block pb-2'>
                                                Country
                                            </label>
                                            <select name = "" id='' value={country} onChange={(e) => setCountry(e.target.value)}
                                                className='w-[95%] border rounded-[5px] h-[40px]'
                                            >
                                                <option value="" disabled className='block border pb-2'>
                                                    choose your country
                                                </option>
                                                {
                                                    Country && Country.getAllCountries().map((item) =>(
                                                        <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='w-full pb-2'>
                                            <label className='block pb-2'>
                                                Choose your city
                                            </label>
                                            <select name = "" id='' value={city} onChange={(e) => setCity(e.target.value)}
                                                className='w-[95%] border rounded-[5px] h-[40px]'
                                            >
                                                <option value="" disabled className='block border pb-2'>
                                                    choose your city
                                                </option>
                                                {
                                                    City && City.getCitiesOfCountry(country).map((item) =>(
                                                        <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='w-[95%] pb-2'>
                                            <label className='block pb-2'>
                                                Address 1
                                            </label>
                                            <input
                                                type='address'
                                                className={`${styles.input}`}
                                                required
                                                value = {address1}
                                                onChange={(e) => setAddress1(e.target.value)}
                                            />
                                        </div>

                                        <div className='w-[95%] pb-2'>
                                            <label className='block pb-2'>
                                                Address 2
                                            </label>
                                            <input
                                                type='addresss'
                                                className={`${styles.input}`}
                                                required
                                                value = {address2}
                                                onChange={(e) => setAddress2(e.target.value)}
                                            />
                                        </div>

                                        <div className='w-[95%] pb-2'>
                                            <label className='block pb-2'>
                                                Zip Code
                                            </label>
                                            <input
                                                type='number'
                                                className={`${styles.input}`}
                                                required
                                                value = {zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}
                                            />
                                        </div>

                                        <div className='w-full pb-2'>
                                            <label className='block pb-2'>
                                                Address Type
                                            </label>
                                            <select name = "" id='' value={addressType} onChange={(e) => setAddressType(e.target.value)}
                                                className='w-[95%] border rounded-[5px] h-[40px]'
                                            >
                                                <option value="" disabled className='block border pb-2'>
                                                    choose your Address Type
                                                </option>
                                                {
                                                    addressTypeData && addressTypeData.map((item) =>(
                                                        <option className='block pb-2' key={item.name} value={item.name}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='w-[95%] pb-2'>
                                            <input
                                                type='submit'
                                                className={`${styles.input} mt-5 cursor-pointer`}
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    My Addresses
                </h1>
                <div className={`${styles.button} !rounded-md`}
                    onClick={() => setOpen(true)}
                >
                    <span className='text-[#fff]'>
                        Add New
                    </span>
                </div>
            </div>
            <br/>
            {
                user && user.addresses.map((item,index) => (
                    <div key={index} className='w-full flex items-center justify-between bg-white shadow h-[70px] rounded-[4px] px-3 pr-10 mb-5'>
                        <div className='flex items-center'>
                            <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
                        </div>
                        <div className='pl-8 flex items-center'>
                            <h6 className='text-[15px] 800px:text-[unset]'>
                                {item.address1} {item.address2}
                            </h6>  
                        </div>
                        <div className='pl-8 flex items-center'>
                            <h6 className='text-[15px] 800px:text-[unset]'>
                                {user && user.phoneNumber}
                            </h6>  
                        </div>
                        <div className='min-w-[10%] flex items-center justify-between pl-8'>
                            <AiOutlineDelete size={20} className='cursor-pointer' onClick={()=> handleDelete(item)}/>
                        </div>
                    </div>
                ))
            }

            {
                user && user.addresses.length === 0 && (
                    <h5 className='text-center pt-9 text-[18px]'>
                        You have not created any address
                    </h5>
                )
            }
        </div>
    )
}

export default ProfileContent