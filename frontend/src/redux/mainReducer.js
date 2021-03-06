import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer, topRatedProducts } from './reducers/productsReducer'
import { cartReducer } from './reducers/cartReducers'
import { userReducer, getAllUsers, getUserById, resetPassword } from './reducers/userReducer'
import { orderReducer, getOrderByIdReducer, myOrderListReducer, OrderListReducer, orderDeliveredReducer } from './reducers/orderReducer'

const mainReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    orderDetails: getOrderByIdReducer,
    myOrders: myOrderListReducer,
    usersList: getAllUsers,
    userById: getUserById,
    orderList: OrderListReducer,
    orderDelivered: orderDeliveredReducer,
    topRatedProducts: topRatedProducts,
    resetPassword: resetPassword
})

export default mainReducer