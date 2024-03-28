import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { createProduct } from '../../redux/actions/product';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const { shop } = useSelector((state) => state.shop);
    const { success,error } = useSelector((state) => state.product);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();

    useEffect(()=>{
        if(error)
        {
            toast.error(error);
        }
        if(success)
        {
            toast.success("Product created successfully");
            navigate("/dashboard-products");
            window.location.reload();
        }
    },[dispatch, error, success]);

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages( (prevImages) => [...prevImages, ...files]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();

        images.forEach((image)=>{
            newForm.append("images", image);
        })

        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", shop._id);
        dispatch(createProduct(newForm));
    }

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
        <h5 className='text-[30px] font-Poppins text-center'>
            Create Product
        </h5>
        {/* create Product form */}
        <form onSubmit={handleSubmit}>
            <br/>
            <div>
                <label className='pb-2'>
                    Name <span className='text-red-500'>*</span>
                </label>
                <input
                    type="text"
                    name='name'
                    value={name}
                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your product name...'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                    cols="30"
                    rows="8"
                    required
                    type="text"
                    name='description'
                    value={description}
                    className='mt-2 appearance-none block w-full pt-2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your description...'
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Category <span className='text-red-500'>*</span>
                </label>
                <select className='w-full h-[35px] mt-2 border rounded-[5px]'
                    onChange={(e) => setCategory(e.target.value)}
                    value = {category}
                >
                    <option value="" disabled>Choose a Category</option>
                    {
                        categoriesData?.map( (data) => (
                            <option value={data.title} key = {data.title}>
                                {data.title}
                            </option>
                        ))
                    }
                </select>
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Tags
                </label>
                <input
                    type="text"
                    name='tags'
                    value={tags}
                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your product tag...'
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Original Price
                </label>
                <input
                    type="number"
                    name='price'
                    value={originalPrice}
                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your product price...'
                    onChange={(e) => setOriginalPrice(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Price (With Discount) <span className='text-red-500'>*</span>
                </label>
                <input
                    type="number"
                    name='discountPrice'
                    value={discountPrice}
                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your product discount price...'
                    onChange={(e) => setDiscountPrice(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Product Stock <span className='text-red-500'>*</span>
                </label>
                <input
                    type="number"
                    name='stock'
                    value={stock}
                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter your product stock...'
                    onChange={(e) => setStock(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Upload Images <span className='text-red-500'>*</span>
                </label>
                <input
                    type="file"
                    name=''
                    id='upload'
                    multiple
                    className='hidden'
                    onChange={handleImageChange}
                />
                <div className='w-full flex items-center flex-wrap'>
                    <label htmlFor='upload'>
                        <AiOutlinePlusCircle
                            size={30}
                            className='mt-3'
                            color='#555'
                        />
                    </label>
                    {
                        images && images.map( (img) => (
                            <img
                                src={URL.createObjectURL(img)}
                                key = {img}
                                alt=''
                                className='w-[50px] h-[50px] rounded-full object-cover m-2'
                            />
                        ))
                    }
                </div>
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
  )
}

export default CreateProduct