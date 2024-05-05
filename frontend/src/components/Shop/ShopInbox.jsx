import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import {TfiGallery} from 'react-icons/tfi';
import styles from '../../styles/styles';

const ShopInbox = () => {

    const {shop} = useSelector((state)=> state.shop);
    const [conversations,setConversions] = useState([]);

    const [open,setOpen] = useState(false);

    useEffect(() => {
        axios.get(`${server}/conversation/get-all-conversation-seller/${shop._id}`,{withCredentials:true})
        .then((res) => {
            setConversions(res.data.conversations)
        }).catch((error) => {
            console.log(error)
        })
    },[shop._id])
  return (
    <div className='w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded'>

        
        
        {
            !open && (
                <>
                    <h1 className='text-center text-[30px] py-3 font-Poppins'>All Messages</h1>
                    {/* all messages list */} 
                    {
                        conversations && conversations.map((item,index) => (
                            <MessageList data={item} key={index} index={index} open={open} setOpen={setOpen}/>
                        ))
                    }
                </>
            )
        }

        {
            open && (
                <Inbox setOpen={setOpen}/>
            )
        }
    </div>
  )
}

const MessageList = ({ data,index,setOpen }) =>{

    const navigate = useNavigate();
    const [active,setActive] = useState(0);

    const handleClick = (id) =>{
        navigate(`?${id}`)
        setOpen(true)
    }

    return(
        <div className={`w-full flex p-3 px-3 ${ active === index ? 'bg-[#81555523]' : "bg-transparent"}  cursor-pointer`}
            onClick={() => setActive(index) || handleClick(data._id)}
        >
            <div className='relative'>
                <img src="http://localhost:8000//ek%20Villan-1712381227317-779828061.png" alt='' className='w-[50px] h-[50px] rounded-full'/>
            
                <div className='w-[12px] h-[12px] rounded-full bg-green-400 absolute top-[2px] right-[2px] '/>    
            </div>    
            <div className='pl-3'>
                <h1 className='text-[18px] font-[500]'>John Doe</h1>
                <p className='text-[16px] text-[#000c] font-[400]'>You: Hey their product was good but...</p>
            </div>
        </div>
    )
}

const Inbox = ({ setOpen }) => {
    return (
        <div className='w-full min-h-full flex flex-col justify-between'>
            {/*message header  */}
            <div className='w-full flex p-3 items-center justify-between bg-slate-200'>
                <div className='flex'>
                    <img src="http://localhost:8000//ek%20Villan-1712381227317-779828061.png" alt='' className='w-[60px] h-[60px] rounded-full'/>
                    <div className='pl-3'>
                        <h1 className='text-[18px] font-[600]'>John Doe</h1>
                        <h1>Active now</h1>
                    </div>
                </div>
                
                <AiOutlineArrowRight className='cursor-pointer' size={20} onClick={() => setOpen(false)}/>
            </div>

            {/* message body */}
            <div className='px-3 h-[60vh] bg-slate-200 py-3 overflow-y-scroll'>
                <div className='flex w-full my-2'>
                    <img src="http://localhost:8000//ek%20Villan-1712381227317-779828061.png" alt='' className='w-[40px] h-[40px] rounded-full mr-3'/>
                    <div className='w-max p-2 rounded bg-slate-400 h-min'>
                        <p>Hello there kya kr h bhai </p>
                        
                    </div>
                </div>    

                <div className='flex w-full justify-end my-2'>
                    <div className='w-max p-2 rounded bg-slate-400 h-min'>
                        <p>Kuch nhi bhai timepass</p>
                        
                    </div>
                </div>
            </div>

            {/* send message input */}
            <form className='w-full p-3 relative mb-3 flex justify-between items-center' aria-required={true}>
                <div className='w-[3%]'>
                    <TfiGallery size={20} className='cursor-pointer'/> 
                </div>
                <div className='w-[97%]'>
                    <input type="text" required placeholder='Type your message here...' className={`${styles.input}`}/>
                    <input type="submit" value='Send' className='hidden ' id="send"/>
                    <label htmlFor='send'>
                        <AiOutlineSend size={20} className='absolute right-5 top-5 cursor-pointer'/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default ShopInbox