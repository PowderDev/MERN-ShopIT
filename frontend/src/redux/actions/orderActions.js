import * as types from '../actionTypes'
import axios from 'axios'


export const createOrder = ( info ) => async (dispatch) =>{
    try{
        dispatch({
            type: types.ORDER_CREATE_REQUEST
        })

        const { data } = await axios.post('/api/orders', info)

        dispatch({
            type: types.ORDER_CREATE_SUCCESS,
            payload: {
                order: data.createOrder
            }
        })


    } catch(err){
        dispatch({
            type: types.ORDER_CREATE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}


export const getOrderById = ( id ) => async (dispatch) =>{
    try{
        dispatch({
            type: types.ORDER_DETAILS_REQUEST
        })

        const { data } = await axios(`/api/orders/${id}`)

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: {
                order: data.order
            }
        })


    } catch(err){
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const orderPay = ( id ) => async (dispatch) =>{
    const { data } = await axios.put(`/api/orders/${id}/pay`)

    dispatch({
        type: types.CART_REMOVE_ALL_ITEMS
    })

    localStorage.setItem('cartItems', JSON.stringify([]))

    dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: {
                updatedDetails: data.updatedOrder
            }
        })

    
}

export const getMyOrders = ( id ) => async (dispatch) =>{
    try{
        dispatch({
            type: types.ORDER_MY_LIST_REQUEST
        })

        const { data } = await axios(`/api/orders/myorders/${id}`)


        dispatch({
            type: types.ORDER_MY_LIST_SUCCESS,
            payload: {
                orders: data
            }
        })


    } catch(err){
        dispatch({
            type: types.ORDER_MY_LIST_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const getAllOrders = () => async (dispatch) =>{
    try{
        dispatch({
            type: types.ORDER_LIST_REQUEST
        })

        const { data } = await axios(`/api/orders`)

        dispatch({
            type: types.ORDER_LIST_SUCCESS,
            payload: {
                orders: data
            }
        })


    } catch(err){
        dispatch({
            type: types.ORDER_LIST_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const updateOrdersToDelivered = ( id ) => async (dispatch) =>{
    try{
        await axios.put(`/api/orders/${id}/delivered`)

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: {
                success: true
            }
        })
    } catch(err){
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}


