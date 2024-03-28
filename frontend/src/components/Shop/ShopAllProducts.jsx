import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';

const ShopAllProducts = () => {
    const {products,isLoading} = useSelector((state) => state.product);
    const {shop} = useSelector((state) => state.shop);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(shop._id))
    },[dispatch])

    const handleDelete = (id) =>{
        dispatch(deleteProduct(id));
        window.location.reload();
    }

    const columns = [
        {field:"id",headerName:"Product ID",minWidth:250,flex:0.7},
        {
            field:"name",
            headerName:"Name",
            minWidth:200,
            flex:1.4
        },
        {
            field:"price",
            headerName:"Price",
            minWidth:100,
            flex:0.6
        },
        {
            field:"Stock",
            headerName:"Stock",
            type:"number",
            minWidth:80,
            flex:0.5
        },
        {
            field:"sold",
            headerName:"Sold out",
            type:"number",
            minWidth:130,
            flex:0.6
        },
        {
            field:"Preview",
            flex:0.8,
            headerName:"Preview",
            minWidth:100,
            sortable:false,
            type:"number",
            renderCell:(params)=>{
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, '-');
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
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

    products && products.forEach((item) => {
        row.push({
            id:item._id,
            name:item.name,
            price:"US$" + item.discountPrice,
            Stock:item.stock,
            sold:10
        });
    })

  return (
    <>
        {
            isLoading ? (
                <Loader/>
            ) : (
                <div className='w-full mx-8 pt-1 mt-10 bg-white'>
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
    </>
  )
}

export default ShopAllProducts