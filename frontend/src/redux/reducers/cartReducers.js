import * as types from '../actionTypes'

const init ={
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] ,
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {},
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || 'PayPal'
}

export const cartReducer = (state = init, action) =>{
    switch(action.type){
        case types.CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(i => i.product._id === item.product._id)

            if (existItem){

                if (item.qty > 1 || item.qty < existItem.qty || item.qty === 1){
                    existItem.qty = item.qty
                } 

                return {...state, cartItems: state.cartItems.map( x => x.product._id === existItem.product._id ? existItem : x )}
            } else{
                return {...state, cartItems: [...state.cartItems, item]}
            }
        
        case types.CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(cart => cart.product._id !== action.payload.id)}

        case types.CART_SAVE_SHIPPING_INFO:
            return {...state, shippingInfo: action.payload.info}    

        case types.CART_SAVE_PAYMENT_METHOD_INFO:
            return {...state, paymentMethod: action.payload.method }

        case types.CART_REMOVE_ALL_ITEMS:
            return {...state, cartItems: []}    
        default:
            return state
    }
}