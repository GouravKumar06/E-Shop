import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getAllOrdersShop } from '../../redux/actions/order';

const ShopAllOrders = () => {
    const {orders,isLoading} = useSelector((state) => state.order);
    const {shop} = useSelector((state) => state.shop);

    const dispatch = useDispatch();

    console.log(orders)

    useEffect(() => {
        dispatch(getAllOrdersShop(shop._id))
    },[dispatch])

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
                    <Link to={`/order/${params.id}`}>
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

export default ShopAllOrders