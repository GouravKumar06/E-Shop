import axios from "axios"
import { server } from "../../server"


export const createEvent = (newForm) => async (dispatch) => {
    try{
        dispatch({
            type:"LoadEventRequest"
        })

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        const {data} =await axios.post(`${server}/event/create-event`,newForm,config)

        dispatch({
            type:"LoadEventSuccess",
            payload:data.event
        })
    }
    catch(error){
        dispatch({
            type:"LoadEventFail",
            payload:error.resonse.data.message
        })
    }
}


export const getAllEventsShop = (id) => async (dispatch) => {
    try{
        dispatch({
            type:"getAllEventsShopRequest"
        })

        const {data} =await axios.get(`${server}/event/get-all-events-shop/${id}`)

        dispatch({
            type:"getAllEventsShopSuccess",
            payload:data.events
        })
    }
    catch(error){
        dispatch({
            type:"getAllEventsShopFail",
            payload:error.resonse.data.message
        })
    }    
}


export const deleteEvent = (id) => async (dispatch) => {
    try{
        dispatch({
            type:"deleteEventRequest"
        })

        const {data} =await axios.delete(`${server}/event/deleteShopEvent/${id}`,{withCredentials:true})

        dispatch({
            type:"deleteEventSuccess",
            payload:data.message
        })
    }
    catch(error){
        dispatch({
            type:"deleteEventFail",
            payload:error.resonse.data.message
        })
    }
}


export const getAllEvents = () => async (dispatch) => {
    try{
        dispatch({
            type:"getAllEventsRequest"
        })

        const {data} = await axios.get(`${server}/event/get-all-events`)

        dispatch({
            type:"getAllEventsSuccess",
            payload:data.allEvents
        })

    }
    catch(error)
    {
        dispatch({
            type:"getAllEventsFail",
            payload:error.resonse.data.message
        })
    }
}