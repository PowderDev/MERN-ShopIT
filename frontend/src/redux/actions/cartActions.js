import * as types from '../actionTypes'
import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) =>{
    const res = await axios.get(`/api/products/${id}`)
    let product = res.data.product

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) =>{
    dispatch({
        type: types.CART_REMOVE_ITEM,
        payload: {
            id: id
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = ( info ) => (dispatch) =>{
    dispatch({
        type: types.CART_SAVE_SHIPPING_INFO,
        payload: {
            info
        }
    })

    localStorage.setItem('shippingInfo', JSON.stringify(info))
}

export const savePaymentMethod = ( method ) => (dispatch) =>{
    dispatch({
        type: types.CART_SAVE_PAYMENT_METHOD_INFO,
        payload: {
            method
        }
    })

    localStorage.setItem('paymentMethod', JSON.stringify(method))
}