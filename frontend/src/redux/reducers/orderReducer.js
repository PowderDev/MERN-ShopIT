import * as types from '../actionTypes'

const init = {
    order: {},
    loading: true,
    error: '',
    success: ''
}

export const orderReducer = (state = init, action) => {
    switch(action.type){
        case types.ORDER_CREATE_REQUEST:
            return {...state, loading: true}

        case types.ORDER_CREATE_SUCCESS:
            return {...state, loading: false, order: action.payload.order, success: 'Order was successfuly created', error: ''}

        case types.ORDER_CREATE_FAIL:
            return {...state, loading: false, error: action.payload.error}
        
        default:
            return state
    }
}

export const getOrderByIdReducer = (state = { orderDetails: {}, error: '', loading: true }, action) =>{
    switch(action.type){
        case types.ORDER_DETAILS_REQUEST:
            return {...state, loading: true}

        case types.ORDER_DETAILS_SUCCESS:
            return {...state, loading: false, orderDetails: action.payload.order, error: ''}

        case types.ORDER_DETAILS_FAIL:
            return {...state, loading: false, error: action.payload.error}

        case types.ORDER_PAY_SUCCESS:
            return { loading: false, orderDetails: action.payload.updatedDetails, error: ''}

        default: 
            return state
    }
}

export const myOrderListReducer = (state = { myOrders: [], myError: '', myLoading: true }, action) =>{
    switch(action.type){
        case types.ORDER_MY_LIST_REQUEST:
            return {...state, myLoading: true}

        case types.ORDER_MY_LIST_SUCCESS:
            return {...state, myLoading: false, myOrders: action.payload.orders, myError: ''}

        case types.ORDER_MY_LIST_FAIL:
            return {...state, myLoading: false, myError: action.payload.error}

        default: 
            return state
    }
}


export const OrderListReducer = (state = { orders: [], error: '', loading: true, success: false }, action) =>{
    switch(action.type){
        case types.ORDER_LIST_REQUEST:
            return {...state, loading: true}

        case types.ORDER_LIST_SUCCESS:
            return {...state, loading: false, orders: action.payload.orders, error: ''}

        case types.ORDER_LIST_FAIL:
            return {...state, loading: false, error: action.payload.error}



        default: 
            return state
    }
}

export const orderDeliveredReducer = (state = { success: false }, action) =>{
    switch(action.type){
        case types.ORDER_DELIVER_REQUEST:
            return {...state}

        case types.ORDER_DELIVER_SUCCESS:
            return {...state, success: true}

        case types.ORDER_DELIVER_FAIL:
            return {...state}

        default: 
            return state
    }
}



