import axios from "axios"
import { server } from "../../server"


export const getAllOrdersUser = (userId) => async (dispatch) => {
    try{
        dispatch({
            type:"getAllOrdersUserRequest"
        })

        const {data} = await  axios.get(`${server}/order/get-all-orders-user/${userId}`)

        dispatch({
            type:"getAllOrdersUserSuccess",
            payload:data.orders
        })
    }
    catch(error)
    {
        dispatch({
            type:"getAllOrdersUserFail",
            payload:error.response.data.message
        })
    }
}


export const getAllOrdersShop = (shopId) => async (dispatch) => {
    try{
        dispatch({
            type:"getAllOrdersUserRequest"
        })

        const {data} = await  axios.get(`${server}/order/get-all-orders-shop/${shopId}`)

        dispatch({
            type:"getAllOrdersUserSuccess",
            payload:data.orders
        })
    }
    catch(error)
    {
        dispatch({
            type:"getAllOrdersUserFail",
            payload:error.response.data.message
        })
    }
    
}