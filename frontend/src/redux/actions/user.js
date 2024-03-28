import axios from 'axios';
import { server } from '../../server';

export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadUserRequest"
        });
        const {data} = await axios.get(`${server}/user/getuser`,{withCredentials:true});

        dispatch({
            type:"LoadUserSuccess",
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type:"LoadUserFail",
            payload:error.response.data.message
        })
    }
}


export const loadShop = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadShopRequest"
        });
        const {data} = await axios.get(`${server}/shop/getShop`,{withCredentials:true});

        dispatch({
            type:"LoadShopSuccess",
            payload: data.shop,
        })

    }catch(error){
        dispatch({
            type:"LoadShopFail",
            payload:error.response.data.message
        })
    }
}


//user update information
export const updateUserInformation = (email,password,phoneNumber,name) => async(dispatch) => {
    try{
        dispatch({
            type:"updateUserInfoRequest"
        });

        const {data} = await axios.put(`${server}/user/update-user-info`,{
            email,
            password,
            phoneNumber,
            name
            },{withCredentials:true}
        );

        dispatch({
            type:"updateUserInfoSuccess",
            payload: data.user
        })
    }
    catch(error)
    {
        dispatch({
            type:"updateUserInfoFail",
            payload:error.response.data.message
        })
    }
}  

//update user Address
export const updateUserAddress = (address1,address2,city,country,addressType,zipCode) => async(dispatch) => {
    try{
        dispatch({
            type:"updateUserAddressRequest"
        });

        const {data} =await axios.put(`${server}/user/update-user-addresses`,{
            country,
            city,
            address1,
            address2,
            addressType,
            zipCode
        },{withCredentials:true})

        dispatch({
            type:"updateUserAddressSuccess",
            payload: data.user
        })
    }
    catch(error)
    {
        dispatch({
            type:"updateUserAddressFail",
            payload:error.response.data.message
        })
    }
}


//delete user address
export const deleteUserAddress = (id) => async(dispatch) =>{
    try{
        dispatch({
            type:"deleteUserAddressRequest"
        });

        const {data} = await axios.delete(`${server}/user/delete-user-address/${id}`,{withCredentials:true});

        dispatch({
            type:"deleteUserAddressSuccess",
            payload: data.user
        })
    }
    catch(error)
    {
        dispatch({
            type:"deleteUserAddressFail",
            payload:error.response.data.message
        })
    }
}

